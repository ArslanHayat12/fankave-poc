import React, { useCallback, useState, useContext } from "react";
import { PencilIcon } from "../../assets";
import { getQueryStringValue } from "../../utils/";
import {
  SET_CLIENT_NAME,
  SET_CLIENT_EMAIL,
  SET_CLIENT_COMPANY,
} from "../../constants";
import { TestimonialContext } from "../../context/TestimonialContext";
import "./style.css";

const ClientDetails = () => {
  const {
    state: { clientName, clientEmail, clientCompany },
    dispatch,
  } = useContext(TestimonialContext);

  const name = getQueryStringValue("name");
  const email = getQueryStringValue("email");
  const companyName = getQueryStringValue("company");

  const [nameEdit, setNameEdit] = useState(true);
  const [emailEdit, setEmailEdit] = useState(true);
  const [companyEdit, setCompanyEdit] = useState(true);

  const handleNameChange = useCallback((e) => {
    if (e.key === "Enter") {
      setNameEdit(false);
    }
  }, []);

  const handleEmailChange = useCallback((e) => {
    if (e.key === "Enter") {
      setEmailEdit(false);
    }
  }, []);

  const handleCompanyChange = useCallback((e) => {
    if (e.key === "Enter") {
      setCompanyEdit(false);
    }
  }, []);

  return (
    <article className="client-details-wrapper">
      {!name ? (
        nameEdit ? (
          <input
            type="text"
            className="input-name"
            id="name"
            placeholder="Name"
            value={clientName}
            onChange={(e) =>
              dispatch({
                type: SET_CLIENT_NAME,
                payload: e.target.value,
              })
            }
            onKeyPress={handleNameChange}
            onBlur={clientName ? () => setNameEdit(false) : undefined}
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
            className="input-email"
            id="email"
            placeholder="Email Address"
            value={clientEmail}
            onChange={(e) =>
              dispatch({
                type: SET_CLIENT_EMAIL,
                payload: e.target.value,
              })
            }
            onKeyPress={handleEmailChange}
            onBlur={clientEmail ? () => setEmailEdit(false) : undefined}
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
            className="input-company"
            id="company"
            placeholder="Company Name"
            value={clientCompany}
            onChange={(e) =>
              dispatch({
                type: SET_CLIENT_COMPANY,
                payload: e.target.value,
              })
            }
            onKeyPress={handleCompanyChange}
            onBlur={clientCompany ? () => setCompanyEdit(false) : undefined}
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
  );
};

export default ClientDetails;
