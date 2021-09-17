import React, { useRef, useEffect, useState } from 'react'
import { fabric } from 'fabric'
import axios from 'axios'

import corner from '../../assets/images/corner.png'
import deleteIcon from '../../assets/images/delete.png'
import rotate from '../../assets/images/rotate.png'
import scale from '../../assets/images/scale.png'
import { AddBgAndStickersStyled } from "./style"

import { filters } from '../../assets'
import { Loader } from '../LoaderOverlay/Loader'

const toDataURLPromise = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
    )

export const toDataURL = (url, callback) => {
  const xhRequest = new XMLHttpRequest()
  xhRequest.onload = () => {
    const reader = new FileReader()
    reader.onloadend = () => {
      callback(reader.result)
    }
    reader.readAsDataURL(xhRequest.response)
  }
  xhRequest.open('GET', url)
  xhRequest.responseType = 'blob'
  xhRequest.send()
}

function loadImage(data) {
  const new_blob = new Blob([data], { type: 'image/png' })
  const url = URL.createObjectURL(new_blob)
  const img = document.createElement('img')
  img.crossOrigin = 'Anonymous'
  img.src = url
  return new Promise((res, rej) => {
    img.onload = () => res(img)
    img.onerror = rej
  })
}

export const getError = (error) => {
  const decodedString = String.fromCharCode.apply(
    null,
    new Uint8Array(error.response.data)
  )
  const obj = JSON.parse(decodedString)
  return obj.errors.map((e) => e.title).join()
}

export const getBackgroundThirdParty = async (fg) => {
  const imageBlob = await fetch(fg.src).then((res) => res.blob())
  // console.log('imageBlob', imageBlob);
  const formData = new FormData()
  formData.append('image_file', imageBlob)
  formData.append('size', 'auto')
  return axios({
    data: formData,
    url: 'https://api.remove.bg/v1.0/removebg',
    method: 'POST',
    headers: {
      'X-Api-Key': 'Z6gXjpYCRj5GPfqCeDpyqXn7',
    },
    responseType: 'arraybuffer',
  })
    .then((resp) => {
      // console.log('resp', resp);
      return loadImage(resp.data)
    })
    .then((img) => {
      // console.log('img', img);
      return { url: img.src }
    })
    .catch((err) => ({ error: getError(err) }))
}

export const StickerSelect = (props) => {
  const {
    stickers = filters.stickers,
    backgrounds = filters.backgrounds,
    videoConstraints,
  } = props

  const canvasConstraints = videoConstraints

  const fabricCanvas = useRef(null)
  const photoCanvas = useRef(null)
  const backgroundCache = useRef(null)

  // const [originalImage, setOriginalImage] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(-1)
  // eslint-disable-next-line
  const [objectCount, setObjectCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState("stickers")

  const setBackground = (photoImage, width, height, options) => {
    // console.log('setBackground', photoImage._element.currentSrc)
    // console.log('setBackground');
    const bgImage = photoImage.set({
      left: 0,
      top: 0,
      ...options,
    })
    fabricCanvas.current.setBackgroundImage(bgImage)
    fabricCanvas.current.renderAll()
  }

  const loadUserImage = (canvas) => {
    // console.log('loadUserImage');
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    // image.src = canvas.toDataURL('image/jpeg', 1.0);
    image.src = props.photo
    return image // returns a new Image Object
  }

  const getImage = (image) => {
    // console.log('getImage')
    const rotateImg = document.createElement('img')
    rotateImg.crossOrigin = 'Anonymous'
    rotateImg.src = image
    return rotateImg // returns a html image element
  }

  const setOverLay = (imgURL, render) => {
    // console.log('setOverLay')
    fabricCanvas.current.setOverlayImage(imgURL, () => {
      // render first time capture photo after background change
      // before it was just used for capture photo after set background and overlay
      if (render) {
        fabricCanvas.current.renderAll()
      }
    })
  }

  const setBackgroundFromURL = (dataUrl, stickers) => {
    // console.log('setBackgroundFromURL', dataUrl);
    // console.log('setBackgroundFromURL')
    const jeeFaceFilterCanvas = document.getElementById('imageCanvas')
    const canvasWidth = jeeFaceFilterCanvas.width
    const canvasHeight = jeeFaceFilterCanvas.height
    fabric.Image.fromURL(
      dataUrl,
      (photoImage) => {
        const scaleX = canvasWidth / photoImage.width
        const scaleY = canvasHeight / photoImage.height
        setBackground(
          photoImage,
          photoCanvas.current.width,
          photoCanvas.current.height,
          { scaleX, scaleY }
        )
        if (stickers) {
          // console.log('adding stickers', stickers)
          stickers.map((sticker) => fabricCanvas.current.add(sticker))
          fabricCanvas.current.renderAll()
        }
      },
      { crossOrigin: 'Anonymous' }
    )
  }

  const getObjects = (count) => {
    // console.log('getObjects');
    const objects = fabricCanvas.current?.getObjects() || []
    // console.log('objects', objects);
    if (count) return objects.length
    return objects
  }

  const getSetObjects = () => {
    // console.log('getSetObjects');
    const stickers = getObjects()
    removeAllSticker()
    const photo = fabricCanvas.current.toDataURL('image/jpeg', 1.0)
    // setOverLay(0);
    fabricCanvas.current.overlayImage = null
    fabricCanvas.current.renderAll()

    // added timeout for set background for might be remove overlay take time;
    // console.log('setTimeout 3000')
    setTimeout(() => {
      setBackgroundFromURL(photo, stickers)
    }, 100)
  }

  const deleteObject = () => {
    // console.log('deleteObject');
    const activeObject = fabricCanvas.current.getActiveObject()
    if (activeObject) {
      fabricCanvas.current.remove(activeObject)
    }
    setObjectCount(getObjects(true))
  }

  function renderIcon(icon) {
    // console.log('renderIcon');
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      const size = 40
      ctx.save()
      ctx.translate(left, top)
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
      ctx.drawImage(icon, -size / 2, -size / 2, size, size)
      ctx.restore()
    }
  }

  const initFabricCanvas = (imgURL, width, height, fg) => {
    // console.log('initFabricCanvas');
    // console.log('params', imgURL, width, height, fg);
    const fabricElement = document.getElementById('fabricCanvas')
    // console.log('fabricElement', fabricElement);
    const cssWidth = fabricElement.style.width
    const cssHeight = fabricElement.style.height
    fabricCanvas.current = new fabric.Canvas('fabricCanvas', {
      enableRetinaScaling: false,
    })
    fabricCanvas.current.setWidth(width)
    fabricCanvas.current.setHeight(height)
    fabricCanvas.current.setDimensions(
      { width: cssWidth, height: cssHeight },
      { cssOnly: true }
    )
    const controlsUtils = fabric.controlsUtils
    const scaleStyleHandler = controlsUtils.scaleCursorStyleHandler,
      scalingEqually = controlsUtils.scalingEqually,
      objectControls = fabric.Object.prototype.controls

    objectControls.tl = new fabric.Control({
      x: -0.56,
      y: -0.56,
      actionHandler: deleteObject,
      cursorStyle: 'pointer',
      render: renderIcon(getImage(deleteIcon)),
      cornerSize: 30,
      sizeX: 40,
      sizeY: 40,
      mouseUpHandler: deleteObject,
    })

    objectControls.tr = new fabric.Control({
      x: 0.57,
      y: -0.57,
      withConnection: false,
      actionName: 'rotate',
      cursorStyle: 'pointer',
      render: renderIcon(getImage(rotate)),
      cornerSize: 24,
      actionHandler: controlsUtils.rotationWithSnapping,
    })

    objectControls.br = new fabric.Control({
      x: 0.57,
      y: 0.57,
      cursorStyleHandler: scaleStyleHandler,
      actionHandler: scalingEqually,
      render: renderIcon(getImage(scale)),
      cornerSize: 24,
    })

    objectControls.bl = new fabric.Control({
      x: -0.57,
      y: 0.57,
      cursorStyleHandler: scaleStyleHandler,
      actionHandler: scalingEqually,
      render: renderIcon(getImage(corner)),
      cornerSize: 24,
    })
    setBackgroundFromURL(imgURL)
  }

  const loadOnFabricCanvas = (image) => {
    // console.log('loadOnFabricCanvas', image, image.width, image.height);
    image.addEventListener(
      'load',
      () => {
        // console.log('image onload width and height', image.width, image.height, image)
        photoCanvas.current = document.createElement('canvas')
        photoCanvas.current.width =
          videoConstraints.width || canvasConstraints.width
        photoCanvas.current.height =
          videoConstraints.height || canvasConstraints.height

        const ctx = photoCanvas.current.getContext('2d')
        // ctx.translate(image.width, 0);
        ctx.drawImage(
          image,
          0,
          0,
          photoCanvas.current.width,
          photoCanvas.current.height
        ) //, 0, 0, 320, 480);
        ctx.scale(2, 2)
        // ctx.drawImage(image, 0, 0, 320, 480, 0, 0, 100, 100);
        // console.log('dataurl', photoCanvas.current.toDataURL());
        initFabricCanvas(
          photoCanvas.current.toDataURL(),
          photoCanvas.current.width,
          photoCanvas.current.height
          // 320,
          // 480
        )
      },
      false
    )
  }

  const showPhoto = () => {
    // console.log('showPhoto');
    const canvas = document.getElementById('imageCanvas')
    canvas.style.display = 'none'
    const image = loadUserImage(canvas)
    loadOnFabricCanvas(image)
    const fabCanvas = document.getElementById('fabricCanvas')
    fabCanvas.style.display = 'block'
  }

  const removeAllSticker = () => {
    // console.log('removeAllSticker');
    fabricCanvas.current.remove(...fabricCanvas.current.getObjects())
    setObjectCount(getObjects(true))
  }

  const addSticker = (selectedSticker, options = {}) => {
    fabric.Image.fromURL(selectedSticker, (sticker) => {
      sticker
        .set({
          left: Math.floor(Math.random() * 200),
          top: Math.floor(Math.random() * 100),
          angle: 0,
          cornerColor: '#E6F7E2',
          strokeWidth: 12,
          cornerSize: 23,
          cornerStrokeColor: '#E6F7E2',
          cornerStyle: 'rect',
          cornerWidth: 10,
          borderScaleFactor: 8,
          borderColor: '#E6F7E2',
          touchCornerSize: 40,
          borderDashArray: [10],
          ...options,
        })
        .setControlsVisibility({
          bl: true,
          br: true,
          tl: true,
          tr: true,
          mb: false,
          ml: false,
          mr: false,
          mt: false,
          mtr: false,
        })
        .scale(1)
        .setCoords()
      sticker.scaleToHeight(200)
      sticker.scaleToWidth(200)
      fabricCanvas.current.add(sticker)
      setObjectCount(getObjects(true))
      if (getObjects(true) > 0) {
        setTimeout(() => {
          getSetObjects()
        }, 300)
      }
    })
  }

  const handleStickerAdd = async (index) => {
    if (index === -1) return removeAllSticker()
    const resolvedStickers = await Promise.all(
      stickers.map((e) => toDataURLPromise(e))
    )
    addSticker(resolvedStickers[index])
  }

  const handleChangeBackground = async (index) => {
    if (index === currentBackground) return
    if (index === -1) {
    } else {
    }
    setLoading(true)
    setCurrentBackground(index)
    if (index < 0) {
      setBackgroundFromURL(photoCanvas.current.toDataURL())
      setLoading(false)
      return
    }

    try {
      // setPhotoInformation({ loading: true });
      // console.log('handleChangeBackground try')
      toDataURL(backgrounds[index], async (dataUrl) => {
        // console.log('handleChangeBackground toDataUrl callback');
        const fg = loadUserImage(fabricCanvas.current)
        // const fgFile = dataURLtoFile(fg.src, 'fg.png');
        let error
        if (!backgroundCache.current) {
          const { url, error: bgError } = await getBackgroundThirdParty(fg)
          backgroundCache.current = url
          error = bgError
          // setApiCall({status: true, data: url});
        }
        if (!error) {
          setBackgroundFromURL(dataUrl)
          setOverLay(backgroundCache.current, true)
          if (getObjects(true) > 0) {
            setTimeout(() => {
              getSetObjects()
            }, 200)
          }
        }
        setLoading(false)
        // setPhotoInformation({ loading: false });
      })
    } catch (e) {
      console.log('e', e)
      // setPhotoInformation({ loading: false });
    }
  }

  useEffect(() => {
    showPhoto()
  }, [])

  useEffect(() => {
    // Used for removing sticker controls before performing a canvasToDataUrl
    if (props.hideControls) {
      getSetObjects()
    }
    // eslint-disable-next-line
  }, [props.hideControls])

  console.log("loading: ", loading)
  return (
    <AddBgAndStickersStyled className="fk-sticker-container">
      <div className={`spinner ${loading ? 'show' : 'hide'}`}></div>
      <div
        className="fk-canvas-container"
        style={{ height: props.videoConstraints.height }}
      >
        <canvas
          width={videoConstraints.width || canvasConstraints.width}
          height={videoConstraints.height || canvasConstraints.height}
          className="fk-fabric"
          id="fabricCanvas"
        />
        <canvas
          width={videoConstraints.width || canvasConstraints.width}
          height={videoConstraints.height || canvasConstraints.height}
          className="canvas"
          id="imageCanvas"
        />
      </div>

      <div className="fk-tabs-wrapper">
        <span className={`fk-tab ${currentTab === "stickers" ? "fk-active" : ""}`} onClick={() => setCurrentTab("stickers")}>Add Stickers</span>
        <span className={`fk-tab ${currentTab === "backgrounds" ? "fk-active" : ""}`} onClick={() => setCurrentTab("backgrounds")}>Add Background</span>
      </div>

      {
        currentTab === "stickers" && (
          <div className="select-sticker-container">
            {/* <div className="heading">Add Stickers</div> */}
            <div className="fk-stickers-preview">
              <div className="sticker clear" onClick={() => removeAllSticker()}>
                <i className="icon-fk icon-fk-cancel-circle"></i>
                Clear All
              </div>
              {stickers.map((sticker, index) => (
                <div
                  className="fk-sticker"
                  key={sticker}
                  onClick={() => handleStickerAdd(index)}
                  style={{ backgroundImage: `url(${sticker})` }}
                ></div>
              ))}
            </div>
          </div>
        )
      }

      {
        currentTab === "backgrounds" && (
          <div className="fk-select-bg-container">
            {/* <div className="heading">Add Background</div> */}
            <div className="fk-bgs-preview">
              <div className="fk-bg clear" onClick={() => handleChangeBackground(-1)}>
                <i className="icon-fk icon-fk-cancel-circle"></i>
                Clear
              </div>
              {backgrounds.map((bg, index) => (
                <div
                  className="fk-bg"
                  key={bg}
                  onClick={() => handleChangeBackground(index)}
                  style={{ backgroundImage: `url(${bg})` }}
                ></div>
              ))}
            </div>

            {
              loading && (
                <Loader />
              )
            }
          </div>
        )
      }
    </AddBgAndStickersStyled>
  )
}
