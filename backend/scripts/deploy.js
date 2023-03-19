const { ethers } = require("hardhat");

const main = async () => {
  const transactionsFactory = await ethers.getContractFactory("Transactions");
  const transactions = await transactionsFactory.deploy();
  await transactions.deployed();

  console.log(">> Contract Address : ", transactions.address);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    process.exit(1);
    console.log(error);
  });
