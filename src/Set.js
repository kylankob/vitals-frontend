import { useState, useEffect, Fragment } from "react";
import { getValFromLS, setValToLS } from "./utils";
import Tiles from "./components/Tiles";
import Alert from "./components/Alert";
import Welcome from "./pages/Welcome";
import VitalsForm from "./pages/VitalsForm";
import VaccinesForm from "./pages/VaccinesForm";
import Blockchain from "./pages/Blockchain";

const App = () => {
  const [status, setStatus] = useState(4);
  const [form, setForm] = useState("");

  /*
    0 - error
    1 - written to blockchain
    2 - vitals or vaccines submitted successfully
    3 - patient entered
    4 - welcome
  */

  useEffect(() => {
    if (getValFromLS("patient", true)) {
      //handleStatus(3);
      handleStatus(2);
    } else if (getValFromLS("patient")) {
      const patient = getValFromLS("patient");
      setValToLS("patient", patient, true);
      handleStatus(3);
    }
  }, []);

  const handleStatus = (status) => {
    setStatus(status);
    if (status === 1 || status === 2 || status === 3 || status === 4) {
      setForm("");
    }
  };

  return (
    <Fragment>
      <Welcome status={status} update={handleStatus} />
      {(status === 1 || status === 3) && <Tiles form={form} update={setForm} />}
      {form === "vitals" ? (
        <VitalsForm update={handleStatus} />
      ) : form === "vaccines" ? (
        <VaccinesForm update={handleStatus} />
      ) : null}
      {status === 2 && <Blockchain />}

      {status === 1 && (
        <Alert
          data={{
            type: "success",
            text: "Your data has been saved to the blockchain, thank you!",
          }}
        />
      )}
    </Fragment>
  );
};

export default App;
