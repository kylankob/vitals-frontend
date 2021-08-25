import React from "react";
import styled from "styled-components";
import { isFieldError } from "../../utils";

let S = {};
S.Container = styled.div`
  &.invisible {
    visibility: hidden;
  }

  & label {
  }

  & label span.error {
    color: var(--error);
  }

  & input {
    margin: 0;
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 5.5px 7.5px;
    box-shadow: var(--boxshadow);
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    font-family: inherit;
    font-size: 16px;
    line-height: 25px;
    font-weight: 500;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &:focus {
      border-color: var(--primarycolor);
    }

    &.error {
      border-color: var(--error);
    }
  }
`;

const Input = ({
  type = "text",
  name,
  label,
  reqd,
  autocomplete = name,
  update,
  errors,
  visible = true,
  value = "",
  maxlength = "255",
}) => {
  return (
    <S.Container className={visible ? `` : `invisible`}>
      <label htmlFor={name}>
        {`${label}`} {reqd ? <span className="error">*</span> : null}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete={autocomplete}
        onChange={(e) => update(name, e.target.value)}
        className={isFieldError(errors, name) ? `error` : ``}
        defaultValue={value}
        maxLength={maxlength}
      />
    </S.Container>
  );
};
export default Input;
