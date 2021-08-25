import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faTimes,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/pro-light-svg-icons";

let S = {};
S.Container = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;

  &.inline {
    flex-direction: row;
    font-size: 1rem;
  }

  &.working {
    color: var(--working);
  }

  &.success {
    color: var(--success);
  }

  &.notice {
    color: var(--notice);
  }

  &.error {
    color: var(--error);
  }

  & > span {
    padding-top: 7.5px;
  }

  &.inline > span {
    padding-top: 0;
    padding-left: 7.5px;
  }
`;

const Alert = ({ data }) => {
  return (
    <S.Container
      className={data.inline ? `${data.type} inline` : `${data.type}`}
    >
      {data.type === "working" ? (
        <FontAwesomeIcon icon={faCircleNotch} size="lg" spin />
      ) : data.type === "success" ? (
        <FontAwesomeIcon icon={faCheck} size="lg" />
      ) : data.type === "notice" ? (
        <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faTimes} size="lg" />
      )}
      {data.text && <span>{data.text}</span>}
    </S.Container>
  );
};

export default Alert;
