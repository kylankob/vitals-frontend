import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import Vitals from "../../abis/Vitals.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCircleNotch } from "@fortawesome/pro-light-svg-icons";

const vitalsAddress = "0xA51F488caffa8415486dBCc5937a79515F319bc6"; // ropsten

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

const Me = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    const init = async () => {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      if (address) {
        const contract = new ethers.Contract(
          vitalsAddress,
          Vitals.abi,
          provider
        );
        const result = await contract.records(address);
        let newRecords = records;
        newRecords.push(result);
        setRecords([...newRecords]);
      }
      setLoading(false);
    };

    init();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <S.Status className="working">
          <FontAwesomeIcon icon={faCircleNotch} size="lg" />
          <span>Connecting to Blockchain...</span>
        </S.Status>
      ) : records.length > 0 ? (
        <S.Ul>
          {records.map((item, index) => {
            return (
              <li key={index}>
                <a
                  href={`https://ipfs.infura.io/ipfs/${item}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </S.Ul>
      ) : (
        <S.Status>
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
          <span>No records found for that wallet address.</span>
        </S.Status>
      )}
    </Fragment>
  );
};

export default Me;

let S = {};
S.Ul = styled.ul`
  margin: 0;
  padding: 0;
  margin-left: 25px;
  font-size: 0.9rem;
`;

S.Status = styled.div`
  display: flex:
  align-items: center;
  color: var(--error);

  &.working {
    color: var(--working);
  }

  & > span {
    padding-left: 7.5px;
  }
`;
