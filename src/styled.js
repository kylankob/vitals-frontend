import styled from "styled-components";

export const Form = styled.form`
  width: 100%;

  & label {
    font-size: 15px;
    font-weight: normal;
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-bottom: 5px;
  }

  & > div {
    margin-top: 15px;
  }

  & > div:first-child {
    margin-top: 0;
  }
`;

export const FormRow1 = styled.div`
  width: 100%;
`;

export const FormRow2 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;

  @media only screen and (max-width: 999px) {
    grid-template-columns: 1fr;
  }

  &.first-smaller {
    grid-template-columns: 0.4fr 1fr;

    @media only screen and (max-width: 999px) {
      grid-template-columns: 1fr;
    }
  }

  & div.empty {
    display: none;
  }
`;

export const FormRow3 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;

  @media only screen and (max-width: 649px) {
    grid-template-columns: 1fr;
  }

  &.birthday {
    @media only screen and (max-width: 649px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &.birthday div:last-child {
    @media only screen and (max-width: 649px) {
      grid-column: 1 / span 2;
    }
  }

  & div.empty {
    display: none;
  }
`;

export const FormMsgSubmit = styled.div`
  padding-top: 7.5px;
  width: 100%;
`;
