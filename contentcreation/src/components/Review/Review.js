import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import axios from 'axios'

import { Loader } from '../LoaderOverlay/Loader'
import { ReviewStyled } from './style'

import { StaticAssets } from '../../assets'

const getSession = () => {
  const id = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const tokenSecret = localStorage.getItem('tokenSecret')
  return { id, tokenSecret, token }
}

let platform = ''
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
  const baseUrl = window.location.origin.toString()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const theme = useContext(ThemeContext)
  const { origin: remote = 'https://dev.api.fankave.com' } = theme

  const origin = 'https://api.fankave.com/sharesocial'
  const { thumbUrl } = meta
  const {
    enableDownload,
    sharing: {
      enabled: sharingEnabled,
      twitter: { enabled: twitterEnabled, icon: twitterIcon },
      linkedIn: { enabled: linkedInEnabled, icon: linkedInIcon },
      slack: { enabled: slackEnabled, icon: slackIcon },
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

  const openTwitterSignInTab = () => {
    setErrorMessage('')
    platform = 'twitter'
    window.open(origin + `/twitter/login?url=${baseUrl}`, '_blank')
  }

  const openLinkedInSignInTab = () => {
    setErrorMessage('')
    platform = 'linkedIn'
    window.open(origin + `/linkedin/login?url=${baseUrl}`, '_blank')
  }

  const openSlackSignInTab = () => {
    setErrorMessage('')
    platform = 'slack'
    window.open(origin + `/slack/login?url=${baseUrl}`, '_blank')
  }

  const generateRequestData = (type, platform) => {
    axios({
      url: src, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const formData = new FormData()
      formData.append('type', type)
      formData.append('media', new Blob([response.data]))
      formData.append('tweetMessage', '')
      if (platform === 'linkedIn') {
        return shareOnLinkedIn(formData)
      }
      if (platform === 'twitter') {
        return shareOnTwitter(formData)
      }
      if (platform === 'slack') {
        shareOnSlack(formData)
      }
    })
  }

  const shareOnLinkedIn = (formData) => {
    setErrorMessage('')
    setMessage('')
    setLoading(true)

    const { token = '', tokenSecret = '', id = '' } = getSession()
    axios({
      method: 'post',
      url: origin + '/share-on-linkedin',
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
    platform = ''
  }

  const shareOnTwitter = (formData) => {
    setErrorMessage('')
    setMessage('')
    setLoading(true)
    const { token = '', tokenSecret = '', id = '' } = getSession()
    axios({
      method: 'post',
      url: origin + '/tweet',
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
    platform = ''
  }

  const shareOnSlack = (formData) => {}

  const handleSessionChange = (event) => {
    const { token, tokenSecret, id } = getSession()
    if (
      event.key === 'tokenSecret' &&
      typeof event.newValue === 'string' &&
      typeof token === 'string' &&
      typeof tokenSecret === 'string' &&
      typeof id === 'string' &&
      token
    ) {
      src && generateRequestData(type, platform)
    }
    event.preventDefault()
  }

  useEffect(() => {
    window.addEventListener('storage', handleSessionChange)
    return () => {
      window.removeEventListener('storage', handleSessionChange)
    }
  }, [])
  return (
    <ReviewStyled className="fk-review" id="fk-review">
      <div className="fk-message">
        <p className="fk-message-text">Thank you</p>
      </div>
      {sharingEnabled && (
        <div className="fk-share-area">
          {twitterEnabled && type !== 'audio' && (
            <div
              className="fk-share-button fk-twitter-share"
              style={{ backgroundImage: `url(${twitterIcon})` }}
              onClick={() => openTwitterSignInTab()}
            />
          )}
          {linkedInEnabled && type !== 'audio' && (
            <div
              className="fk-share-button fk-linkedIn-share"
              style={{ backgroundImage: `url(${linkedInIcon})` }}
              onClick={() => openLinkedInSignInTab()}
            />
          )}
          {slackEnabled && (
            <div
              className="fk-share-button fk-slack-share"
              style={{ backgroundImage: `url(${slackIcon})` }}
              onClick={() => openSlackSignInTab()}
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
