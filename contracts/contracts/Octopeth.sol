pragma solidity ^0.4.24;

import "./Ownable.sol";

contract Octopeth is Ownable {

  bool public preCensorship;
  bytes public config;
  uint public numdApps;

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

  event Publish(uint indexed id, address owner, string title, string url, string contact, string logo, string desc, categories cat);
  event Review(uint indexed id, bool approved);
  event Remove(uint indexed id);
  event PreCensor(bool value);
  event Config(bytes value);

  mapping (uint => dApp) dApps;

  modifier ifDAppValid(uint id) {
    require(id <= numdApps && id > 0);
    _;
  }

  function publish(string title, string url, string contact, string logo, string desc, categories cat) public {
    dApp memory newdApp = dApp(msg.sender, title, url, logo, desc, contact, cat, !(preCensorship));
    numdApps++;
    dApps[numdApps] = newdApp;
    emit Publish(numdApps, msg.sender, title, url, contact, logo, desc, cat);
  }

  function update(uint id, string title, string url, string contact, string logo, string desc, categories cat) public ifDAppValid(id) {
    require(dApps[id].owner == msg.sender);
    dApp storage app = dApps[id];
    app.title = title;
    app.url = url;
    app.contact = contact;
    app.logo = logo;
    app.desc = desc;
    app.cat = cat;
  }

  function review(uint id, bool approved) public onlyOwner ifDAppValid(id) {
    dApps[id].approved = approved;
    emit Review(id, approved);
  }

  function remove(uint id) public ifDAppValid(id) {
    require(dApps[id].owner == msg.sender);
    dApps[id].approved = false;
    emit Remove(id);
  }

  function preCensor(bool value) public onlyOwner {
    preCensorship = value;
    emit PreCensor(value);
  }

  function updateConfig(bytes value) public onlyOwner {
    config = value;
    emit Config(value);
  }

  function getDApp(uint id) view public ifDAppValid(id) returns (address owner, string title, string url, string contact, string logo, string desc, categories cat, bool approved) {
    dApp storage app = dApps[id];
    owner = app.owner;
    title = app.title;
    url = app.url;
    contact = app.contact;
    logo = app.logo;
    desc = app.desc;
    cat = app.cat;
    approved = app.approved;
  }

}
