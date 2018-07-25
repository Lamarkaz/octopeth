pragma solidity ^0.4.21;

import "./Ownable.sol";

contract Octopeth is Ownable {

  bool public preCensorship;
  bytes public config;

  struct dApp {
    address owner;
    string title;
    string url;
    string logo;
    string desc;
    string contact;
    bytes32 hash;
    categories cat;
    bool approved;
  }

  enum categories {OTHER, GAMING, ENTERTAINMENT, FINANCE, SOCIAL, EXCHANGE, GAMBLING, TOKENS, SHARING, GOVERNANCE}

  event Publish(address owner, string title, string url, string contact, string logo, string desc, bytes32 hash, categories cat);
  event Review(address owner, string title, string url, string contact, string logo, string desc, bytes32 hash, categories cat);
  event Remove(string indexed title);
  event PreCensor(bool value);
  event Config(bytes value);

  mapping (string => dApp) dApps;

  function publish(string title, string url, string contact, string logo, string desc, bytes32 hash, categories cat) public {
    require(dApps[title].owner == address(0) || dApps[title].owner == msg.sender);
    dApp memory newdApp = dApp(msg.sender, title, url, logo, desc, contact, hash, cat, !(preCensorship));
    dApps[title] = newdApp;
    emit Publish(msg.sender, title, url, contact, logo, desc, hash, cat);
  }

  function review(string title, bool value) public onlyOwner {
    dApp storage thisdApp = dApps[title];
    dApps[title].approved = value;
    emit Review(thisdApp.owner, thisdApp.title, thisdApp.url, thisdApp.contact, thisdApp.logo, thisdApp.desc, thisdApp.hash, thisdApp.cat);
  }

  function remove(string title) public onlyOwner {
    dApps[title].approved = false;
    emit Remove(title);
  }

  function preCensor(bool value) public onlyOwner {
    preCensorship = value;
    emit PreCensor(value);
  }

  function updateConfig(bytes value) public onlyOwner {
    config = value;
    emit Config(value);
  }
}
