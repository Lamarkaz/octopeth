pragma solidity ^0.4.21;

import "./Ownable.sol";

contract Octopeth is Ownable {

  struct dApp {
    address owner;
    string title;
    string url;
    string logo;
    bool approved;
  }

  event Publish(address owner, string title, string url, string logo);
  event Approve(address owner, string title, string url, string logo);

  mapping (string => dApp) dApps;

  function publish(string title, string url, string logo) public {
    require(dApps[title].owner == address(0) || dApps[title].owner == msg.sender);
    dApp memory newdApp = dApp(msg.sender, title, url, logo, false);
    dApps[title] = newdApp;
    emit Publish(msg.sender, title, url, logo);
  }

  function approve(string title) public onlyOwner {
    dApp storage thisdApp = dApps[title];
    dApps[title].approved = true;
    emit Approve(msg.sender, thisdApp.title, thisdApp.url, thisdApp.logo);
  }
}
