import React from 'react'

const Header = (props) => {
  const { logo, heading } = props
  return (
    <section className="fk-header">
      {logo && (
        <div className="fk-logo">
          <img className="fk-logo-image" src={logo} alt="logo" />
        </div>
      )}
      {heading && (
        <div className="fk-heading">
          <p className="fk-heading-text">{heading}</p>
        </div>
      )}
    </section>
  )
}

export default Header
