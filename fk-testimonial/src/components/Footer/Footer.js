import React from 'react'

const Footer = (props) => {
  const { logo } = props
  return (
    <section className="fk-footer">
      {logo && (
        <div className="fk-logo">
          <img className="fk-logo-image" src={logo} alt="logo" />
        </div>
      )}
    </section>
  )
}

export default Footer
