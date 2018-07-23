var privKeys = require("../../secrets"); // Off-repo file containing private keys
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id,
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(privKeys.ropsten[0], "https://ropsten.infura.io/")
      },
      network_id: 3
    }
  }
};
