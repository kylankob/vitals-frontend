import { useState, useRef } from "react";
import { setValToLS } from "../../utils";
import Input from "../../components/Input";
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

let S = {};
S.Form = Form;
S.FormRow1 = FormRow1;
S.FormRow2 = FormRow2;
S.FormRow3 = FormRow3;
S.FormMsgSubmit = FormMsgSubmit;

const VitalsForm = ({ update }) => {
  const [names, setNames] = useState({});
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState({});
  //const [loading, setLoading] = useState(true);

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

    if (!names.temperature) {
      setErrors(["temperature"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.heartrate) {
      setErrors(["heartrate"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.pulse) {
      setErrors(["pulse"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.bloodpressure) {
      setErrors(["bloodpressure"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.respiratoryrate) {
      setErrors(["respiratoryrate"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.oxygensaturation) {
      setErrors(["oxygensaturation"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.ph) {
      setErrors(["ph"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    const vitals = {
      temperature: names.temperature,
      heartrate: names.heartrate,
      pulse: names.pulse,
      bloodpressure: names.bloodpressure,
      respiratoryrate: names.respiratoryrate,
      oxygensaturation: names.oxygensaturation,
      ph: names.ph,
    };

    setValToLS("vitals", JSON.stringify(vitals), true);

    update(2);
  };

  return (
    <S.Form
      method="post"
      action="/"
      onSubmit={(e) => handleSubmit(e)}
      ref={formElement}
      style={{ marginTop: "25px" }}
    >
      <S.FormRow2>
        <Input
          name="temperature"
          label="Temperature"
          reqd={true}
          autocomplete="temperature"
          update={handleUpdate}
          errors={errors}
        />
      </S.FormRow2>

      <S.FormRow2>
        <Input
          name="heartrate"
          label="Heart Rate"
          reqd={true}
          autocomplete="heartrate"
          update={handleUpdate}
          errors={errors}
        />
        <Input
          name="pulse"
          label="Pulse"
          reqd={true}
          autocomplete="pulse"
          update={handleUpdate}
          errors={errors}
        />
      </S.FormRow2>

      <S.FormRow2>
        <Input
          name="bloodpressure"
          label="Blood Pressure"
          reqd={true}
          autocomplete="bloodpressure"
          update={handleUpdate}
          errors={errors}
        />
        <Input
          name="respiratoryrate"
          label="Respiratory Rate"
          reqd={true}
          autocomplete="respiratoryrate"
          update={handleUpdate}
          errors={errors}
        />
      </S.FormRow2>

      <S.FormRow2>
        <Input
          name="oxygensaturation"
          label="Oxygen Saturation"
          reqd={true}
          autocomplete="oxygensaturation"
          update={handleUpdate}
          errors={errors}
        />
        <Input
          name="ph"
          label="pH"
          reqd={true}
          autocomplete="ph"
          update={handleUpdate}
          errors={errors}
        />
      </S.FormRow2>

      <S.FormMsgSubmit>
        {msg.type && <Msg data={msg} />}
        {msg.type !== "working" && (
          <Submit name="Continue to Blockchain" icon={faChevronCircleRight} />
        )}
      </S.FormMsgSubmit>
    </S.Form>
  );
};

export default VitalsForm;
