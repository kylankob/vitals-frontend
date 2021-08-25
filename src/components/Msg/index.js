import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faTimes,
  faCheck,
} from "@fortawesome/pro-light-svg-icons";

let S = {};
S.Container = styled.div`
  margin-top: 7.5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &.working {
    color: var(--working);
  }

  &.error {
    color: var(--error);
  }

  &.success {
    color: var(--success);
  }

  & > span {
    padding-top: 7.5px;
    padding-bottom: 15px;
  }
`;

const Msg = ({ data }) => {
  return (
    <S.Container className={data.type}>
      {data.type === "working" ? (
        <FontAwesomeIcon icon={faCircleNotch} size="lg" spin />
      ) : data.type === "success" ? (
        <FontAwesomeIcon icon={faCheck} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faTimes} size="lg" />
      )}
      {data.text && <span>{data.text}</span>}
    </S.Container>
  );
};

export default Msg;
