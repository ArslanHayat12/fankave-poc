import React, { forwardRef } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import { InputBox, TextArea, TagInput } from '../FormFields'
import { REQUIRED_EMAIL, REQUIRED_USERNAME, REQUIRED_NAME } from './constants'
import { StoryFormStyled } from './style'

const getInitialValues = (values) => {
  const { name, email, username, story, hashtags } = values

  return {
    ...(name ? { name: '' } : {}),
    ...(email ? { email: '' } : {}),
    ...(username ? { username: '' } : {}),
    ...(story ? { story: '' } : {}),
    ...(hashtags ? { hashtags: [] } : {}),
  }
}

const getValidationSchema = (
  { name, email, username, story, hashtags },
  { storyLimit, hashtagsLimit }
) => {
  return yup.object().shape({
    ...(typeof name !== 'undefined'
      ? { name: yup.string().required(REQUIRED_NAME) }
      : {}),
    ...(typeof email !== 'undefined'
      ? {
          email: yup
            .string()
            .email('Invalid email format')
            .required(REQUIRED_EMAIL),
        }
      : {}),
    ...(typeof username !== 'undefined'
      ? { username: yup.string().required(REQUIRED_USERNAME) }
      : {}),
    ...(typeof story !== 'undefined'
      ? {
          story: yup
            .string()
            .max(storyLimit, `Story is allowed Max ${storyLimit} letters`),
        }
      : {}),
    ...(typeof hashtags !== 'undefined'
      ? {
          hashtags: yup
            .array()
            .max(hashtagsLimit, `Max ${hashtagsLimit} Hashtags are allowed`),
        }
      : {}),
  })
}

export const StoryForm = forwardRef((props, ref) => {
  const {
    formMeta: {
      user: { enabled: userEnabled = false, name, username, email },
      hashtags: {
        enabled: hashtagsEnabled = false,
        limit: hashtagsLimit,
        options,
      },
      text: { enabled: textEnabled = false, limit: storyLimit, placeholder },
    },
    onSubmit = () => {},
  } = props
  const initialValues = getInitialValues({
    ...(userEnabled ? { name, username, email } : {}),
    story: textEnabled,
    hashtags: hashtagsEnabled,
  })
  const storyValidationSchema = getValidationSchema(initialValues, {
    storyLimit,
    hashtagsLimit,
  })
  return (
    <Formik
      initialValues={initialValues}
      innerRef={ref}
      validateOnChange
      validationSchema={storyValidationSchema}
      onSubmit={({ name, username, email, story, hashtags }, formHelpers) => {
        formHelpers.validateForm().then(() => {
          const formData = new FormData()
          formData.append('story', story)
          formData.append('hashtags', JSON.stringify(hashtags))
          formData.append(
            'author',
            JSON.stringify({
              ...(typeof name !== 'undefined' ? { name } : {}),
              ...(typeof email !== 'undefined' ? { email } : {}),
              ...(typeof username !== 'undefined' ? { username } : {}),
            })
          )
          onSubmit(formData)
        })
      }}
    >
      {() => {
        return (
          <StoryFormStyled className="fk-story-form-wrapper">
            {userEnabled && (
              <div className="fk-user-form">
                {name && (
                  <InputBox
                    name="name"
                    className="fk-name"
                    id="fk-name"
                    placeholder="Enter Full Name"
                    color="primary"
                    type="text"
                  />
                )}
                {username && (
                  <InputBox
                    name="username"
                    className="fk-username"
                    id="fk-username"
                    placeholder="Enter Username"
                    type="text"
                  />
                )}
                {email && (
                  <InputBox
                    name="email"
                    className="fk-email"
                    id="fk-email"
                    placeholder="Enter Email"
                    type="text"
                  />
                )}
              </div>
            )}
            <div className="fk-story-form">
              {textEnabled && (
                <TextArea
                  name="story"
                  className="fk-story"
                  id="fk-story"
                  placeholder={placeholder}
                  rows={4}
                  maxLength={storyLimit}
                />
              )}
            </div>
            {hashtagsEnabled && (
              <TagInput
                name="hashtags"
                className="fk-hashtags"
                id="fk-hashtags"
                sugesstions={options}
                limit={hashtagsLimit}
              />
            )}
          </StoryFormStyled>
        )
      }}
    </Formik>
  )
})
