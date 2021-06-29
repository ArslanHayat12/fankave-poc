import React, { useCallback, useState } from "react"
import { PencilIcon } from "../../assets"
import { getQueryStringValue } from "../../utils/"
import "./style.css"

const ClientDetails = () => {
	const name = getQueryStringValue("name")
	const email = getQueryStringValue("email")
	const companyName = getQueryStringValue("company")

	const [nameEdit, setNameEdit] = useState(true)
  const [emailEdit, setEmailEdit] = useState(true)
  const [companyEdit, setCompanyEdit] = useState(true)
	const [clientName, setClientName] = useState("")
	const [clientEmail, setClientEmail] = useState("")
	const [clientCompany, setClientCompany] = useState("")

  const handleNameChange = useCallback(e => {
    if (e.key === 'Enter') {
      setNameEdit(false)
    }
  }, [])

  const handleEmailChange = useCallback(e => {
    if (e.key === 'Enter') {
      setEmailEdit(false)
    }
  }, [])

  const handleCompanyChange = useCallback(e => {
    if (e.key === 'Enter') {
      setCompanyEdit(false)
    }
  }, [])

	return (
		<article className="client-details-wrapper">
			{!name ? (
				nameEdit ? (
					<input
						type="text"
						class="input"
						id="name"
						placeholder="Name"
						value={clientName}
            onChange={(e) => setClientName(e.target.value)}
						onKeyPress={handleNameChange}
					/>
				) : (
					<article className="client-name-wrapper">
						<h3 className="client-name">{clientName}</h3>
						<span onClick={() => setNameEdit(!nameEdit)}>
							<PencilIcon />
						</span>
					</article>
				)
			) : (
				<article className="client-name-wrapper">
					<h3 className="client-name">{name}</h3>
				</article>
			)}
      {!email ? (
				emailEdit ? (
					<input
						type="text"
						class="input"
						id="email"
						placeholder="Email Address"
						value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
						onKeyPress={handleEmailChange}
					/>
				) : (
					<article className="client-email-company-wrapper">
						<p className="client-details">{clientEmail}</p>
						<span onClick={() => setEmailEdit(!emailEdit)}>
							<PencilIcon />
						</span>
					</article>
				)
			) : (
					<p className="client-details">{email}</p>
			)}
      {!companyName ? (
				companyEdit ? (
					<input
						type="text"
						class="input"
						id="company"
						placeholder="Company Name"
						value={clientCompany}
						onChange={(e) => setClientCompany(e.target.value)}
            onKeyPress={handleCompanyChange}
					/>
				) : (
					<article className="client-email-company-wrapper">
						<p className="client-details">{clientCompany}</p>
						<span onClick={() => setCompanyEdit(!companyEdit)}>
							<PencilIcon />
						</span>
					</article>
				)
			) : (
        <p className="client-details">{companyName}</p>
			)}
		</article>
	)
}

export default ClientDetails
