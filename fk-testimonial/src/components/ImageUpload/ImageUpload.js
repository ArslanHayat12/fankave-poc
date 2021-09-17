import React, { useState, useReducer, useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Container } from "../DragDropInput/Container";
import { ImageProcessor } from "../ImageProcessor/ImageProcessor";

import { Preview } from "../Preview/Preview";
import { UploadFile } from "./UploadFile";

const initialState = {
  approvedImage: null,
  rawImage: null,
  processedImage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_raw":
      return {
        ...state,
        rawImage: action.payload,
      };

    case "set_processed":
      return {
        ...state,
        processedImage: action.payload,
      };

    case "approve_image":
      return {
        ...state,
        approvedImage: action.payload,
      };
    case "reset":
      return {
        approvedImage: null,
        rawImage: null,
        processedImage: null,
      };
    default:
      return state;
  }
};

export const ImageUpload = () => {
  const theme = useContext(ThemeContext);
  const {
    widgets: { imageUpload, form, sharing, enableDownload, processing },
  } = theme;
  const { post, pre } = processing;
  const [image, setImage] = useState(null);

  const [{ rawImage, processedImage, approvedImage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleReUploadImage = () => {
    dispatch({
      type: "reset",
    });
  };

  const handleBackToProcessing = () => {
    dispatch({
      type: "reset",
    });
    dispatch({
      type: "set_raw",
      payload: image,
    });
  };

  const handleContinueRawImage = (src) => {
    console.log("asdas", src);
    dispatch({
      type: "set_processed",
      payload: src,
    });
  };

  const handleApprove = (src) => {
    console.log("src: ", src);
    dispatch({
      type: "approve_image",
      payload: src,
    });
  };

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      console.log("img: ", img);

      setImage(URL.createObjectURL(img));
      dispatch({
        type: "set_raw",
        payload: URL.createObjectURL(img),
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: "set_raw",
      payload: image,
    });
    if (!post.enabled) {
      dispatch({
        type: "set_processed",
        payload: src,
      });
    }
  }, [image]);

  return (
    <>
      <h2 className="fk-heading">{imageUpload.label}</h2>
      {processedImage ? (
        <>
          <Preview
            src={processedImage}
            formMeta={form}
            meta={{ videoConstraints: { width: 300, height: 500 } }}
            type="image"
            onApprove={handleApprove}
            onReProcess={handleBackToProcessing}
          />
        </>
      ) : rawImage ? (
        <ImageProcessor
          image={rawImage}
          videoConstraints={{ width: 300, height: 500 }}
          onContinue={handleContinueRawImage}
          onReTake={handleReUploadImage}
        />
      ) : (
        <UploadFile handleImageUpload={handleImageUpload} setImage={setImage} />
      )}
    </>
  );
};
