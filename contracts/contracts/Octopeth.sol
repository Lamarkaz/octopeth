pragma solidity ^0.4.21;

contract Octopeth {

  struct dApp {
    address owner;
    string title;
    string url;
    string logo;
  }

  mapping (string => dApp) dApps;
  mapping (string => dApp) urls;

  function publish(string title, string url, string logo) public {
    require(dApps[title].owner == address(0) || dApps[title].owner == msg.sender);
    require(urls[url].owner == address(0) || (urls[url].owner == msg.sender));
    dApp memory newdApp = dApp(msg.sender, title, url, logo);
    dApps[title] = newdApp;
    urls[url] = newdApp;
  }
}
