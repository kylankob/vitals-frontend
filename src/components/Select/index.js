import React, { useEffect } from "react";
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

  & label.none {
    display: block;
    height: 5px;
  }
`;

S.SelectContainer = styled.div`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 4.5px 7.5px 2.5px 7.5px;
  box-shadow: var(--boxshadow);
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  display: grid;
  grid-template-areas: "select";
  align-items: center;

  & select {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    background: none;
    background-color: transparent;
    border: none;
    padding: 1.5px 1em 3.5px 0;
    height: 29px;
    margin: 0;
    font-family: inherit;
    font-size: 16px;
    line-height: inherit;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    grid-area: select;
  }

  &::after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: #292b2e;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  &:after {
    grid-area: select;
    justify-self: end;
  }

  &:focus-within {
    border-color: var(--secondarycolor);
  }

  &.error {
    border-color: var(--error);
  }
`;

const Select = ({
  name,
  label,
  reqd,
  autocomplete = name,
  data,
  update,
  errors,
  visible = true,
  value = "",
}) => {
  useEffect(() => {
    if (value) {
      update(name, `${value}`);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <S.Container className={visible ? `` : `invisible`}>
      {label ? (
        <label htmlFor={name}>
          {`${label}`} {reqd ? <span className="error">*</span> : null}
        </label>
      ) : (
        <label className="none" />
      )}
      <S.SelectContainer className={isFieldError(errors, name) ? `error` : ``}>
        <select
          name={name}
          id={name}
          autoComplete={autocomplete}
          onChange={(e) => update(name, e.target.value)}
          defaultValue={value}
        >
          {data.map((item, index) => {
            return (
              <option
                value={item.id ? `${item.id}:${item.value}` : `${item.value}`}
                key={index}
                disabled={
                  item.disabled !== undefined && item.disabled ? true : false
                }
              >
                {item.name}
              </option>
            );
          })}
        </select>
      </S.SelectContainer>
    </S.Container>
  );
};
export default Select;
