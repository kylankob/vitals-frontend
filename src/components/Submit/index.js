import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let S = {};
S.Container = styled.div`
  margin-bottom: 5px;

  & button {
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;

      & > span {
        padding-right: 7.5px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding-top: 0;
      }
    }
  }
`;

const Submit = ({ name, icon }) => {
  return (
    <S.Container>
      <button type="submit">
        <div>
          <span>{name}</span>
          {icon && <FontAwesomeIcon icon={icon} size="lg" />}
        </div>
      </button>
    </S.Container>
  );
};
export default Submit;
