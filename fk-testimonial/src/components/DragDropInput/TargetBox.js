import React, { useRef } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd'
import { TargetBoxStyled } from './style';

export const TargetBox = (props) => {
    const { onDrop, handleFileChange } = props

    const fileUploadRef = useRef();

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop(item) {
                if (onDrop) {
                    onDrop(item)
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [props]
    )

    const isActive = canDrop && isOver

    const handleFileClick = () => {
        fileUploadRef.current.click()
    }

    return (
        <TargetBoxStyled className="fk-file-upload-wrapper" onClick={handleFileClick} ref={drop}>
            {isActive ? <div className="fk-drag-area">Release to drop</div> : "Drag and drop your file"}

            <span>OR</span>
            <span>Click Here</span>
            <input type="file" onChange={handleFileChange} className="fk-file-upload" ref={fileUploadRef} />
        </TargetBoxStyled>
    );
};
