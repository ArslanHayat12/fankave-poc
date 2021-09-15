import React from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd'

export const TargetBox = (props) => {
  const { onDrop } = props
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

  return (
    <div className="fk-image-upload-container" ref={drop}>
      {isActive ? 'Release to drop' : 'Drag file here'}
    </div>
  )
}
