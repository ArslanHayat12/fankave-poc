import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Container } from "../DragDropInput/Container";

export const UploadFile = ({handleImageUpload, setImage}) => {
  return (
    <div className="fk-image-upload-wrapper">
      <DndProvider backend={HTML5Backend}>
        <Container
          handleFileChange={handleImageUpload}
          setDroppedFiles={setImage}
        />
      </DndProvider>
    </div>
  );
};
