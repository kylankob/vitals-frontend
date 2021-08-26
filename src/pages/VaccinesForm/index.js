import { useState, useRef } from "react";
import { monthsSelect, daysSelect, setValToLS } from "../../utils";
import Input from "../../components/Input";
import Select from "../../components/Select";
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

const VaccinesForm = ({ update }) => {
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

    if (!names.vaccine) {
      setErrors(["vaccine"]);
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

    if (!names.manufacturer) {
      setErrors(["manufacturer"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.lot) {
      setErrors(["lot"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    if (!names.provider) {
      setErrors(["provider"]);
      setMsg({
        type: "error",
        text: "Please make an entry in all required fields (*).",
      });
      return false;
    }

    const vaccine = {
      vaccine: names.vaccine,
      date: `${names.mm}/${names.dd}/${names.yyyy}`,
      pulse: names.pulse,
      manufacturer: names.manufacturer,
      lot: names.lot,
      provider: names.provider,
    };

    setValToLS("vaccine", JSON.stringify(vaccine), true);

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
        <Select
          name="vaccine"
          label="Vaccine Type"
          reqd={true}
          autocomplete="vaccine"
          data={[
            {
              value: "",
              name: "--",
            },
            {
              value: "First Dose",
              name: "First Dose",
            },
            {
              value: "Second Dose",
              name: "Second Dose",
            },
            {
              value: "Booster Shot",
              name: "Booster Shot",
            },
          ]}
          update={handleUpdate}
          errors={errors}
          value={names.sex}
        />
      </S.FormRow2>

      <S.FormRow3 className="birthday">
        <Select
          name="mm"
          label="Vaccine Date Month"
          reqd={true}
          autocomplete="bday-month"
          data={monthsSelect()}
          update={handleUpdate}
          errors={errors}
        />

        <Select
          name="dd"
          label="Vaccine Date Day"
          reqd={true}
          autocomplete="bday-day"
          data={daysSelect()}
          update={handleUpdate}
          errors={errors}
        />

        <Input
          name="yyyy"
          label="Vaccine Date Year"
          reqd={true}
          autocomplete="bday-year"
          update={handleUpdate}
          errors={errors}
        />
      </S.FormRow3>

      <S.FormRow2>
        <Input
          name="manufacturer"
          label="Product / Manufacturer"
          reqd={true}
          autocomplete="manufacturer"
          update={handleUpdate}
          errors={errors}
        />

        <Input
          name="lot"
          label="Lot Number"
          reqd={true}
          autocomplete="lot"
          update={handleUpdate}
          errors={errors}
        />
      </S.FormRow2>

      <S.FormRow1>
        <Input
          name="provider"
          label="Administered By"
          reqd={true}
          autocomplete="provider"
          update={handleUpdate}
          errors={errors}
        />
      </S.FormRow1>

      <S.FormMsgSubmit>
        {msg.type && <Msg data={msg} />}
        {msg.type !== "working" && (
          <Submit name="Continue to Blockchain" icon={faChevronCircleRight} />
        )}
      </S.FormMsgSubmit>
    </S.Form>
  );
};

export default VaccinesForm;
