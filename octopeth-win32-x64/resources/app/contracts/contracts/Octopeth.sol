pragma solidity ^0.4.21;

import "./Ownable.sol";

contract Octopeth is Ownable {

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
  event Approve(address owner, string title, string url, string contact, string logo, string desc, bytes32 hash, categories cat);
  event Remove(string indexed title);

  mapping (string => dApp) dApps;

  function publish(string title, string url, string contact, string logo, string desc, bytes32 hash, categories cat) public {
    require(dApps[title].owner == address(0) || dApps[title].owner == msg.sender);
    dApp memory newdApp = dApp(msg.sender, title, url, logo, desc, contact, hash, cat, false);
    dApps[title] = newdApp;
    emit Publish(msg.sender, title, url, contact, logo, desc, hash, cat);
  }

  function approve(string title) public onlyOwner {
    dApp storage thisdApp = dApps[title];
    dApps[title].approved = true;
    emit Approve(thisdApp.owner, thisdApp.title, thisdApp.url, thisdApp.contact, thisdApp.logo, thisdApp.desc, thisdApp.hash, thisdApp.cat);
  }

  function remove(string title) public onlyOwner {
    dApps[title].approved = false;
    emit Remove(title);
  }
}
