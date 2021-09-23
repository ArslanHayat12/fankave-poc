import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Loader } from '../LoaderOverlay/Loader'
import { ReviewStyled } from './style'

import { StaticAssets } from '../../assets'

const origin = 'https://api.fankave.com/sharesocial'
export const Review = ({
  src,
  type,
  meta = {},
  options = {
    enableDownload: false,
    sharing: {
      enabled: false,
      twitter: false,
      linkedIn: false,
    },
  },
}) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [sessionId, setSessionId] = useState('')
  const { thumbUrl } = meta
  const {
    enableDownload,
    sharing: {
      enabled: sharingEnabled,
      twitter: { enabled: twitterEnabled, icon: twitterIcon },
      linkedIn: { enabled: linkedInEnabled, icon: linkedInIcon },
    },
  } = options

  const handleDownload = () => {
    axios({
      url: src, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `download.${
          type === 'audio' ? 'mp3' : type === 'image' ? 'jpg' : 'mp4'
        }`
      ) //or any other extension
      link.click()
    })
  }

  const openTwitterSiginInTab = () => {
    window.open(origin + `/twitter/login/` + sessionId, '_blank')
    setErrorMessage('')
    src && generateRequestData(type, 'twitter')
  }

  const openLinkedInSiginInTab = (type) => {
    window.open(origin + `/linkedin/login/` + sessionId, '_blank')
    setErrorMessage('')
    src && generateRequestData(type, 'linkedIn')
  }

  const generateRequestData = (type, platform) => {
    axios({
      url: src, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const formData = new FormData()
      formData.append('media', new Blob([response.data]))
      formData.append('type', type)
      formData.append('tweetMessage', '')
      platform === 'linkedIn'
        ? shareOnLinkedIn(formData)
        : shareOnTwitter(formData)
    })
  }

  const shareOnLinkedIn = (formData) => {
    setErrorMessage('')
    setMessage('')
    setLoading(true)
    axios({
      url: origin + '/get-linkedin-token/' + sessionId, //your url
      method: 'GET',
      responseType: 'json', // important
    })
      .then((response) => {
        const { token, tokenSecret, id } = response?.data
        axios({
          method: 'post',
          url: origin + '/share-on-linkedin/' + sessionId,
          data: formData,
          headers: {
            Authorization: token,
            tokenSecret: tokenSecret,
            id: id,
          },
        })
          .then(() => {
            setLoading(false)
            return setMessage('Posted On Linkedin')
          })
          .catch((err) => {
            setLoading(false)
            return setErrorMessage('Request failed with error code ' + err)
          })
      })
      .catch(() => {
        setLoading(false)
        setErrorMessage('Tried With Invalid Token')
      })
  }

  const shareOnTwitter = (formData) => {
    setErrorMessage('')
    setMessage('')
    setLoading(true)
    axios({
      url: origin + '/get-token/' + sessionId, //your url
      method: 'GET',
      responseType: 'json', // important
    })
      .then((response) => {
        const { token, tokenSecret, id } = response?.data
        axios({
          method: 'post',
          url: origin + '/tweet/' + sessionId,
          data: formData,
          headers: {
            Authorization: token,
            tokenSecret: tokenSecret,
            id: id,
          },
        })
          .then(() => {
            setLoading(false)
            return setMessage('Posted On Twitter')
          })
          .catch((err) => {
            setLoading(false)
            return setErrorMessage('Request failed with error code ' + err)
          })
      })
      .catch(() => {
        setLoading(false)
        setErrorMessage('Tried With Invalid Token')
      })
  }

  useEffect(() => {
    axios({
      url: origin + '/user/session', //your url
      method: 'GET',
      responseType: 'json', // important
    }).then((response) => setSessionId(response?.data?.sessionId))
  }, [])

  return (
    <ReviewStyled className="fk-review" id="fk-review">
      <div className="fk-message">
        <p className="fk-message-text">Thank you</p>
      </div>
      {sharingEnabled && type !== 'audio' && (
        <div className="fk-share-area">
          {twitterEnabled && (
            <div
              className="fk-share-button fk-twitter-share"
              style={{ backgroundImage: `url(${twitterIcon})` }}
              onClick={() => openTwitterSiginInTab()}
            />
          )}
          {linkedInEnabled && type !== 'video' && (
            <div
              className="fk-share-button fk-linkedIn-share"
              style={{ backgroundImage: `url(${linkedInIcon})` }}
              onClick={() => openLinkedInSiginInTab()}
            />
          )}
        </div>
      )}
      {message && <p className="fk-share-message">{message}</p>}
      {errorMessage && <p className="fk-share-error">{errorMessage}</p>}
      {enableDownload && (
        <div className="fk-download-area">
          <div className="fk-download-preview">
            <img
              className="fk-download-preview-image"
              src={
                type === 'audio'
                  ? StaticAssets.AudioIcon
                  : type === 'image'
                  ? src
                  : thumbUrl
              }
              alt="media-icon"
            />
          </div>

          <button
            className="fk-filled-button fk-download-button"
            id="fk-download-button"
            onClick={() => handleDownload()}
          >
            Download
          </button>
        </div>
      )}
      {loading && <Loader />}
    </ReviewStyled>
  )
}
