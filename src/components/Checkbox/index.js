import { useState } from "react";
import styled from "styled-components";
import { isFieldError } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/pro-light-svg-icons";

let S = {};
S.CheckboxContainer = styled.div`
  width: 100%;
  margin-top: 15px;

  & button {
    font-size: 15px;
    cursor: pointer;
    outline: none;
    background: none;
    border: none;
    text-align: left;
    color: #000;
    padding: 0;
    font-weight: normal;

    &:hover,
    &:focus,
    &:active {
      color: #000;
    }

    & > div {
      display: flex;
      align-items: center;

      & > span {
        padding-left: 7.5px;
      }
    }
  }
`;

const Checkbox = ({ name, label, reqd, update, errors }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = (name) => {
    setChecked(!checked);
    update(name, !checked);
  };

  return (
    <div>
      <S.CheckboxContainer
        className={isFieldError(errors, name) ? `error` : ``}
      >
        <button type="button" onClick={(e) => handleClick(name)}>
          <div>
            <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} />
            <span>
              {" "}
              {`${label}`} {reqd ? <span className="error">*</span> : null}
            </span>
          </div>
        </button>
      </S.CheckboxContainer>
    </div>
  );
};
export default Checkbox;
