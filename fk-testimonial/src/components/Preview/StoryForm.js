import React, { forwardRef } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'

import { InputBox, TextArea, TagInput } from '../FormFields'

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
  } = props
  const initialValues = getInitialValues({
    ...(userEnabled ? { name, username, email } : {}),
    story: textEnabled,
    hashtags: hashtagsEnabled,
  })
  return (
    <Formik
      initialValues={initialValues}
      innerRef={ref}
      //   validateOnChange={false}
      //   validationSchema={ScheduleValidationSchema()}
      //   onSubmit={handleSaveEdit}
    >
      {() => (
        <Form className="fk-story-form">
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
        </Form>
      )}
    </Formik>
  )
})
