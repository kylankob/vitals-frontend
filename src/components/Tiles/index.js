import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartRate, faSyringe } from "@fortawesome/pro-light-svg-icons";

let S = {};
S.Container = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;

  @media only screen and (max-width: 649px) {
    grid-template-columns: 1fr;
  }

  & button {
    border-radius: 0;
    background-color: #fff;
    color: var(--primarycolor);
  }

  & button:hover {
    color: var(--secondarycolor);
  }

  & button.selected {
    border-color: var(--secondarycolor);
    background-color: var(--secondarycolor);
    color: #fff;
  }

  & button > div {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > span {
      padding-top: 20px;
      font-size: 1.25rem;
    }
  }
`;

const Tiles = ({ form, update }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(form);
  }, [form]);

  const handleClick = (form) => {
    setSelected(form);
    update(form);
  };

  return (
    <S.Container>
      <button
        type="button"
        onClick={() => handleClick("vitals")}
        className={selected === "vitals" ? "selected" : ""}
      >
        <div>
          <FontAwesomeIcon icon={faHeartRate} size="2x" />
          <span>Add Vitals</span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => handleClick("vaccines")}
        className={selected === "vaccines" ? "selected" : ""}
      >
        <div>
          <FontAwesomeIcon icon={faSyringe} size="2x" />
          <span>Add Vaccines</span>
        </div>
      </button>
    </S.Container>
  );
};

export default Tiles;
