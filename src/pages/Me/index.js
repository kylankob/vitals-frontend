import { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ethers } from "ethers";
import Vitals from "../../abis/Vitals.json";
import { CONTRACT_ADDRESS, CHAIN_ID, setValToLS } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCircleNotch } from "@fortawesome/pro-light-svg-icons";

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

const Me = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    const init = async () => {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();

      if (chainId === CHAIN_ID) {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        if (address) {
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            Vitals.abi,
            provider
          );
          const result = await contract.get(address);

          setRecords([...result]);
        }
      } else {
        setError(true);
      }
      setLoading(false);
    };

    init();
  }, []);

  const handleRedirect = () => {
    setValToLS("vitals", null, true);
    setValToLS("vaccine", null, true);
    history.push("/");
  };

  return (
    <Fragment>
      {loading ? (
        <S.Status className="working">
          <FontAwesomeIcon icon={faCircleNotch} size="lg" />
          <span>Connecting to Blockchain...</span>
        </S.Status>
      ) : error ? (
        <S.Status className="error">
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
          <span>
            Must be on Ropsten testnet to interact with this smart contract.
          </span>
        </S.Status>
      ) : records.length > 0 ? (
        <Fragment>
          <S.Hdg>
            <span>My Added Records</span>
            <button type="button" onClick={() => handleRedirect()}>
              Add New Record
            </button>
          </S.Hdg>
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
        </Fragment>
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
S.Hdg = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & button {
    width: 150px;
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

S.Ul = styled.ul`
  margin: 0;
  padding: 0;
  margin-left: 30px;
  font-size: 0.9rem;

  & > li {
    margin: 0;
    padding: 0;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  & > li:first-child {
    padding-top: 0;
  }

  & > li:last-child {
    padding-bottom: 0;
  }
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
