import { useState, useRef, Fragment } from "react";
import styled from "styled-components";
import {
  monthsSelect,
  daysSelect,
  setValToLS,
  getValFromLS,
} from "../../utils";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import Msg from "../../components/Msg";
import Submit from "../../components/Submit";
import {
  Form,
  FormRow1,
  FormRow2,
  FormRow3,
  FormMsgSubmit,
} from "../../styled";
import { faChevronCircleRight } from "@fortawesome/pro-light-svg-icons";

function getName() {
  const obj = JSON.parse(getValFromLS("patient", true));
  return obj.name;
}

const Welcome = ({ status, update }) => {
  const [names, setNames] = useState({});
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState({});
  const [loading, setLoading] = useState(false);

  const formElement = useRef(null);

  const handleUpdate = (name, value) => {
    setNames((names) => ({ ...names, [name]: value ? value : "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMsg({
      type: "working",
      text: "",
    });

    if (!names.name) {
      setErrors(["name"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.mm || !names.dd || !names.yyyy) {
      let array = [];
      if (!names.mm) {
        array.push("mm");
      }
      if (!names.dd) {
        array.push("dd");
      }
      if (!names.yyyy) {
        array.push("yyyy");
      }
      setErrors(array);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.sex) {
      setErrors(["sex"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.race) {
      setErrors(["race"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    const patient = {
      name: names.name,
      birthday: `${names.mm}/${names.dd}/${names.yyyy}`,
      sex: names.sex,
      race: names.race,
    };

    setValToLS("patient", JSON.stringify(patient), true);
    if (names.remember) {
      setValToLS("patient", JSON.stringify(patient));
    }

    update(3);
  };

  const handleSignout = () => {
    setValToLS("patient", null, true);
    setValToLS("patient", null);
    update(4);
  };

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : status === 3 || status === 2 || status === 1 ? (
        <S.SignedIn>
          <span>Patient: {getName()}</span>
          <button type="button" onClick={() => handleSignout()}>
            Sign Out
          </button>
        </S.SignedIn>
      ) : (
        <S.Form
          method="post"
          action="/"
          onSubmit={(e) => handleSubmit(e)}
          ref={formElement}
        >
          <S.FormRow2>
            <Input
              name="name"
              label="Patient Name"
              reqd={true}
              autocomplete="name"
              update={handleUpdate}
              errors={errors}
            />

            <S.FormRow3 className="birthday">
              <Select
                name="mm"
                label="Birthday Month"
                reqd={true}
                autocomplete="bday-month"
                data={monthsSelect()}
                update={handleUpdate}
                errors={errors}
              />

              <Select
                name="dd"
                label="Birthday Day"
                reqd={true}
                autocomplete="bday-day"
                data={daysSelect()}
                update={handleUpdate}
                errors={errors}
              />

              <Input
                name="yyyy"
                label="Birthday Year"
                reqd={true}
                autocomplete="bday-year"
                update={handleUpdate}
                errors={errors}
              />
            </S.FormRow3>
          </S.FormRow2>

          <S.FormRow2>
            <Select
              name="sex"
              label="Sex"
              reqd={true}
              autocomplete="sex"
              data={[
                {
                  value: "",
                  name: "--",
                },
                {
                  value: "Male",
                  name: "Male",
                },
                {
                  value: "Female",
                  name: "Female",
                },
              ]}
              update={handleUpdate}
              errors={errors}
              value={names.sex}
            />

            <Select
              name="race"
              label="Race / Ethnicity"
              reqd={true}
              autocomplete="none"
              data={[
                { value: "", name: "--" },
                { value: "Asian", name: "Asian" },
                {
                  value: "Black or African American",
                  name: "Black or African American",
                },
                { value: "Hispanic or Latino", name: "Hispanic or Latino" },
                {
                  value: "Native Hawaiian or Other Pacific Islander",
                  name: "Native Hawaiian or Other Pacific Islander",
                },
                { value: "White", name: "White" },
                { value: "Not Specified", name: "Not Specified" },
                { value: "Two or More Races", name: "Two or More Races" },
                {
                  value: "I choose not to answer",
                  name: "I choose not to answer",
                },
              ]}
              update={handleUpdate}
              errors={errors}
              value={names.race}
            />
          </S.FormRow2>

          <S.FormRow1>
            <Checkbox
              name="remember"
              label="Check to remember me on this device for future updates"
              reqd={false}
              autocomplete="off"
              update={handleUpdate}
              errors={errors}
            />
          </S.FormRow1>

          <S.FormMsgSubmit>
            {msg.type && <Msg data={msg} />}
            {msg.type !== "working" && (
              <Submit name="Continue" icon={faChevronCircleRight} />
            )}
          </S.FormMsgSubmit>
        </S.Form>
      )}
    </Fragment>
  );
};

export default Welcome;

let S = {};
S.Form = Form;
S.FormRow1 = FormRow1;
S.FormRow2 = FormRow2;
S.FormRow3 = FormRow3;
S.FormMsgSubmit = FormMsgSubmit;

S.SignedIn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & button {
    width: 100px;
    border: 1px solid var(--border);
    background-color: #fff;
    color: #888;
    font-size: 0.9rem;
    padding: 6.5px 5px 7.5px 5px;

    &:hover {
      color: var(--secondarycolor);
      border-color: var(--secondarycolor);
    }
  }
`;
