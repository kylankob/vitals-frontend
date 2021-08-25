const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const Vitals = await hre.ethers.getContractFactory("Vitals");
  const vitals = await Vitals.deploy();

  await vitals.deployed();
  console.log("Sample Contract address:", vitals.address);

  saveFrontendFiles(vitals);
}

function saveFrontendFiles(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/abis";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Vitals: contract.address }, undefined, 2)
  );

  const VitalsArtifact = artifacts.readArtifactSync("Vitals");

  fs.writeFileSync(
    contractsDir + "/Vitals.json",
    JSON.stringify(VitalsArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
