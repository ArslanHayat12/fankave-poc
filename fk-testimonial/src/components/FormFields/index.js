import React, { useState } from 'react'
import { useField } from 'formik'

export const InputBox = (props) => {
  const [field, meta] = useField(props)
  return (
    <input
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      placeholder={props.placeholder}
      style={{}}
      {...props}
      className={`fk-input ${props.className} ${
        Boolean(meta.touched && meta.error) ? 'fk-error' : ''
      }`}
    />
  )
}

export const TextArea = (props) => {
  const [field, meta] = useField(props)

  return (
    <textarea
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      placeholder={props.placeholder}
      {...props}
      className={`fk-input ${props.className} ${
        Boolean(meta.touched && meta.error) ? 'fk-error' : ''
      }`}
    />
  )
}

export const TagInput = (props) => {
  const [field, meta, { setValue, setTouched }] = useField(props)
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
        className={`fk-input fk-tags-input ${
          Boolean(meta.touched && meta.error) ? 'fk-error' : ''
        }`}
        onBlur={() => setTouched(true)}
        onKeyUp={(event) =>
          event.key === 'Enter' || event.key === ' ' ? addTagData(event) : null
        }
        placeholder="Press enter to add a tag"
      />
    </div>
  )
}
