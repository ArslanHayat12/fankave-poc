import React, { useRef, useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import axios from 'axios'

import { CustomAudioPlayer } from "../CustomAudioPlayer/CustomAudioPlayer";
import { StoryForm } from './StoryForm'
import { PreviewStyled } from './style'
import { Loader } from '../LoaderOverlay/Loader'

export const Preview = ({
  src,
  type,
  meta = { vodeoContraints: "" },
  formMeta,
  onApprove = () => {},
  onReProcess = () => {},
}) => {
  const [loading, setLoading] = useState(false)
  const theme = useContext(ThemeContext)
  const { topic = 'testimonialmvp' } = theme
  const { thumb, videoConstraints } = meta
  const formRef = useRef(null)
  const handleApprove = () => {
    if (formRef.current) {
      formRef.current.submitForm()
    }
  }

  const handleSubmit = async (formData) => {
    setLoading(true)
    formData.append('type', type)
    let thumbSrc = null
    const srcBlob = await axios({
      url: src, //your url
      method: 'GET',
      responseType: 'blob', // important
    })
    if (type === 'video') {
      thumbSrc = await axios({
        url: thumb, //your url
        method: 'GET',
        responseType: 'blob', // important
      })
    }
    formData.append('media', new Blob([srcBlob.data]))
    if (type !== 'audio') {
      formData.append(
        'thumb',
        type === 'video' && thumbSrc
          ? new Blob([thumbSrc.data])
          : new Blob([srcBlob.data])
      )
      formData.append('width', videoConstraints.width)
      formData.append('height', videoConstraints.height)
    }
    if (type === 'video') {
      formData.append(
        'isIOS',
        !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
      )
    }
    return axios({
      url: `https://dev.api.fankave.com/cmsx/stories/${topic}/publish`, //your url
      method: 'POST',
      data: formData,
    })
      .then(() => {
        setLoading(false)
        onApprove(src)
      })
      .catch(() => setLoading(false))
  }
  return (
    <PreviewStyled className="fk-image-preview-wrapper">
      <div className="image-container">
        {type === "image" ? (
          <img src={src} alt="processed-image" />
        ) : type === "video" ? (
          <video
            width={videoConstraints.width}
            height={videoConstraints.height}
            controls
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <CustomAudioPlayer
            ref={meta.audioRef}
            streamUrl={meta.url}
            urlDuration={meta.duration}
          />
        )}
      </div>
      <StoryForm formMeta={formMeta} ref={formRef} onSubmit={handleSubmit} />
      <div className="actions">
        <button className="fk-filled-button" onClick={() => onReProcess()}>
          Back
        </button>
        <button className="fk-filled-button" onClick={() => handleApprove()}>
          Continue
        </button>
      </div>
      {loading && <Loader />}
    </PreviewStyled>
  );
};
