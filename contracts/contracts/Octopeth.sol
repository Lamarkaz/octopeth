pragma solidity ^0.4.24;

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
    categories cat;
    bool approved;
  }

  enum categories {OTHER, GAMING, ENTERTAINMENT, FINANCE, SOCIAL, EXCHANGE, GAMBLING, TOKENS, SHARING, GOVERNANCE}

  event Publish(address owner, string title, string url, string contact, string logo, string desc, categories cat);
  event Review(address owner, string title, string url, string contact, string logo, string desc, categories cat);
  event Remove(string indexed title);
  event PreCensor(bool value);
  event Config(bytes value);

  mapping (bytes32 => dApp) dApps;

  function publish(string title, string url, string contact, string logo, string desc, categories cat) public {
    require(dApps[keccak256(bytes(title))].owner == address(0) || dApps[keccak256(bytes(title))].owner == msg.sender);
    dApp memory newdApp = dApp(msg.sender, title, url, logo, desc, contact, cat, !(preCensorship));
    dApps[keccak256(bytes(title))] = newdApp;
    emit Publish(msg.sender, title, url, contact, logo, desc, cat);
  }

  function review(string title, bool value) public onlyOwner {
    dApp storage thisdApp = dApps[keccak256(bytes(title))];
    thisdApp.approved = value;
    emit Review(thisdApp.owner, thisdApp.title, thisdApp.url, thisdApp.contact, thisdApp.logo, thisdApp.desc, thisdApp.cat);
  }

  function remove(string title) public onlyOwner {
    dApps[keccak256(bytes(title))].approved = false;
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

  function getDApp(string apptitle) view public returns (string title, string url, string contact, string logo, string desc, categories cat) {
    dApp storage app = dApps[keccak256(bytes(apptitle))];
    title = app.title;
    url = app.url;
    contact = app.contact;
    logo = app.contact;
    desc = app.desc;
    cat = app.cat;
  }

}
