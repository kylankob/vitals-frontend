import { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import Vitals from "../../abis/Vitals.json";
import { getValFromLS, setValToLS } from "../../utils";
import Msg from "../../components/Msg";
import Submit from "../../components/Submit";
import { Form, FormMsgSubmit } from "../../styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCheck,
  faChevronCircleRight,
  faCheckCircle,
  faCircleNotch,
} from "@fortawesome/pro-light-svg-icons";

//const client = create("/ip4/127.0.0.1/tcp/5001");
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const vitalsAddress = "0xA51F488caffa8415486dBCc5937a79515F319bc6"; // ropsten

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

const Blockchain = () => {
  const [data, setData] = useState({});
  const [result1, setResult1] = useState({});
  const [result2, setResult2] = useState(2);
  const [msg, setMsg] = useState({});
  const [loading, setLoading] = useState(true);

  const formElement = useRef(null);

  useEffect(() => {
    //console.log(client);
    if (client) {
      setLoading(false);

      const patient = JSON.parse(getValFromLS("patient", true));
      const vitals = JSON.parse(getValFromLS("vitals", true));
      setData({ ...patient, ...vitals });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({
      type: "working",
      text: "",
    });

    const added = await client.add(JSON.stringify(data));
    //console.log(added);
    //http://127.0.0.1:8080/ipfs/QmQGsc4o8uffrUsKLB7zX5uJd2HNyojKk6N58CabBs7Dqi
    //const file = await client.get(added.path);

    setResult1({
      added: true,
      path: added.path,
    });

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(vitalsAddress, Vitals.abi, signer);
      const transaction = await contract.set(added.path);
      await transaction.wait();
      setResult2({
        added: 1,
      });

      //setValToLS("vitals", null, true)
    }

    /*
    {
	"added": true,
	"path": "QmQGsc4o8uffrUsKLB7zX5uJd2HNyojKk6N58CabBs7Dqi",
	"cid": {
		"code": 112,
		"version": 0,
		"hash": {
			"0": 18,
			"1": 32,
			"2": 28,
			"3": 191,
			"4": 161,
			"5": 203,
			"6": 47,
			"7": 173,
			"8": 103,
			"9": 1,
			"10": 192,
			"11": 82,
			"12": 81,
			"13": 81,
			"14": 18,
			"15": 160,
			"16": 53,
			"17": 6,
			"18": 37,
			"19": 191,
			"20": 215,
			"21": 185,
			"22": 201,
			"23": 216,
			"24": 48,
			"25": 91,
			"26": 12,
			"27": 229,
			"28": 231,
			"29": 22,
			"30": 222,
			"31": 209,
			"32": 67,
			"33": 9
		}
	},
	"size": 222
}
    */
  };

  return (
    <S.Container>
      {loading ? (
        <div>Connecting to IPFS...</div>
      ) : result1.added ? (
        <Fragment>
          <S.Status>
            <FontAwesomeIcon icon={faCheckCircle} size="lg" />
            <span>File added to IPFS.</span>
          </S.Status>

          <p>
            <code>{JSON.stringify(result1)}</code>
          </p>

          <p>
            {/* http://127.0.0.1:8080/ipfs */}
            <a
              href={`https://ipfs.infura.io/ipfs/${result1.path}`}
              target="_blank"
              rel="noreferrer"
            >
              {result1.path}
            </a>
          </p>

          {result2.added === 1 ? (
            <S.Status>
              <FontAwesomeIcon icon={faCheckCircle} size="lg" />
              <span>File hash added to the blockchain.</span>
            </S.Status>
          ) : result2.added === 2 ? (
            <S.Status className="working">
              <FontAwesomeIcon icon={faCircleNotch} size="lg" />
              <span>Waiting on transaction confirmaton...</span>
            </S.Status>
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          <S.Status>
            <FontAwesomeIcon icon={faFileCheck} size="lg" />
            <span>Connected to IPFS, ready to publish to the blockchain.</span>
          </S.Status>

          <S.Table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {data.name}
                  <br />
                  {data.birthday}
                  <br />
                  {data.sex}
                  <br />
                  {data.race}
                </td>
                <td>
                  {data.temperature}
                  <br />
                  {data.heartrate}
                  <br />
                  {data.pulse}
                  <br />
                  {data.bloodpressure}
                  <br />
                  {data.respiratoryrate}
                  <br />
                  {data.oxygensaturation}
                  <br />
                  {data.ph}
                </td>
              </tr>
            </tbody>
          </S.Table>

          <S.Form
            method="post"
            action="/"
            onSubmit={(e) => handleSubmit(e)}
            ref={formElement}
          >
            <S.FormMsgSubmit>
              {msg.type && <Msg data={msg} />}
              {msg.type !== "working" && (
                <Submit name="Save to Blockchain" icon={faChevronCircleRight} />
              )}
            </S.FormMsgSubmit>
          </S.Form>
        </Fragment>
      )}
    </S.Container>
  );
};

export default Blockchain;

let S = {};
S.Container = styled.div`
  margin-top: 15px;
`;

S.Table = styled.table`
  margin-top: 25px;
  margin-bottom: 20px;
  width: 100%;
  border-collapse: collapse;

  & th,
  & td {
    padding: 5px 7.5px;
    border: 1px solid var(--border);
    font-size: 0.9rem;
  }

  & th {
    background-color: var(--grey);
    font-size: 1rem;
    width: 50%;
  }

  & td {
    vertical-align: top;
  }
`;

S.Status = styled.div`
  display: flex:
  align-items: center;
  color: var(--success);

  &.working {
    color: var(--working);
  }

  & > span {
    padding-left: 7.5px;
  }
`;

S.Form = Form;
S.FormMsgSubmit = FormMsgSubmit;
