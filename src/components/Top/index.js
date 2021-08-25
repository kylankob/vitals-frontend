import styled from "styled-components";
import { today } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/pro-light-svg-icons";

let S = {};
S.Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 65px;
  background-color: var(--primarycolor);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

S.Logo = styled.div`
  & > span {
    padding-left: 10px;
    font-size: 1.5rem;
  }
`;

S.Data = styled.div`
  & > span {
    font-size: 0.95rem;
  }
`;

const Top = () => {
  return (
    <S.Container>
      <S.Logo>
        <FontAwesomeIcon icon={faHeartbeat} size="2x" />
        <span>Vitals</span>
      </S.Logo>

      <S.Data>
        <span>{today()}</span>
      </S.Data>
    </S.Container>
  );
};

export default Top;
