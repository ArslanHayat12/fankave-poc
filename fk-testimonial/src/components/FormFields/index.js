import React, { useState } from 'react'
import { useField } from 'formik'

export const InputBox = (props) => {
  const [field] = useField(props)

  return (
    <input
      className={`fk-input ${props.className}`}
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      placeholder={props.placeholder}
      {...props}
    />
  )
}

export const TextArea = (props) => {
  const [field] = useField(props)

  return (
    <textarea
      className={`fk-input ${props.className}`}
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      placeholder={props.placeholder}
      {...props}
    />
  )
}

export const TagInput = (props) => {
  const [field, { error }, { setValue, setError, setTouched }] = useField(props)
  const removeTagData = (indexToRemove) => {
    setValue([
      ...(field.value || []).filter((_, index) => index !== indexToRemove),
    ])
  }
  const addTagData = (event) => {
    if (event.target.value !== '' && field?.value?.length < props.limit) {
      setValue([...(field.value || []), event.target.value])
      event.target.value = ''
    }
  }
  return (
    <div className={`fk-tag-input ${props.className}`} id={props.id}>
      <ul className="fk-tags">
        {(field.value || []).map((tag, index) => (
          <li key={index} className="fk-tag">
            <span className="fk-tag-title">{tag}</span>
            <span
              className="fk-tag-close-icon"
              onClick={() => removeTagData(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        disabled={field?.value?.length === props.limit}
        type="text"
        className="fk-input fk-tags-input"
        onKeyUp={(event) =>
          event.key === 'Enter' || event.key === ' ' ? addTagData(event) : null
        }
        placeholder="Press enter to add a tag"
      />
    </div>
  )
}
