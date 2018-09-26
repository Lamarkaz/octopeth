
# Smart Contract Documentation


## [Octopeth.sol:Octopeth](../contracts/Octopeth.sol)
`Solidity version 0.4.25+commit.59dbf8f1`


 ##### function review `0x150ad280` 
  nonpayable 


 Type | Name |
--- | --- |
| uint256 | id |
| bool | approved |
___
 ##### function getDApp `0x36b1f6a3` 
 constant view 


 Type | Name |
--- | --- |
| uint256 | id |
___
 ##### function publish `0x3ad8173a` 
  nonpayable 


 Type | Name |
--- | --- |
| string | title |
| string | url |
| string | contact |
| string | logo |
| string | desc |
| uint8 | cat |
___
 ##### function preCensorship `0x3b6df722` 
 constant view 


___
 ##### function remove `0x4cc82215` 
  nonpayable 


 Type | Name |
--- | --- |
| uint256 | id |
___
 ##### function renounceOwnership `0x715018a6` 
  nonpayable 
Allows the current owner to relinquish control of the contract.

___
 ##### function update `0x770112f3` 
  nonpayable 


 Type | Name |
--- | --- |
| uint256 | id |
| string | title |
| string | url |
| string | contact |
| string | logo |
| string | desc |
| uint8 | cat |
___
 ##### function config `0x79502c55` 
 constant view 


___
 ##### function preCensor `0x8a7f800c` 
  nonpayable 


 Type | Name |
--- | --- |
| bool | value |
___
 ##### function updateConfig `0x8cc6acce` 
  nonpayable 


 Type | Name |
--- | --- |
| bytes | value |
___
 ##### function owner `0x8da5cb5b` 
 constant view 


___
 ##### function numdApps `0xbf734098` 
 constant view 


___
 ##### function transferOwnership `0xf2fde38b` 
  nonpayable 
Allows the current owner to transfer control of the contract to a newOwner.

 Type | Name |
--- | --- |
| address | _newOwner |
___
 ##### event Publish `0xab15b2ca965edf28e0e013c51df4b680f1db8646d1d1227c286d6d8cedda3231` 
   


 Type | Name |
--- | --- |
| uint256 | id |
| address | owner |
| string | title |
| string | url |
| string | contact |
| string | logo |
| string | desc |
| uint8 | cat |
___
 ##### event Review `0xdfde343ba101c766111b5537105cbee33124b6bc71880b3e267bca45dc809ed8` 
   


 Type | Name |
--- | --- |
| uint256 | id |
| bool | approved |
___
 ##### event Remove `0x476e4aa4bb19dbdea8700b4db99d81ad2fefcf51924ba5d493b7be6393f82201` 
   


 Type | Name |
--- | --- |
| uint256 | id |
___
 ##### event PreCensor `0x9f90b16ecbeaa03697f7ad37bc569e43325c68bc6942130f1153018f17a7f35e` 
   


 Type | Name |
--- | --- |
| bool | value |
___
 ##### event Config `0xfa604b9f72cfe31dc76d72c3ca4f78daeb444286f7b9e1db3eeda406629fabcd` 
   


 Type | Name |
--- | --- |
| bytes | value |
___
 ##### event OwnershipRenounced `0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820` 
   


 Type | Name |
--- | --- |
| address | previousOwner |
___
 ##### event OwnershipTransferred `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0` 
   


 Type | Name |
--- | --- |
| address | previousOwner |
| address | newOwner |
___


## [Ownable.sol:Ownable](../contracts/Ownable.sol)
`Solidity version 0.4.25+commit.59dbf8f1`
Ownable

 ##### function renounceOwnership `0x715018a6` 
  nonpayable 
Allows the current owner to relinquish control of the contract.

___
 ##### function owner `0x8da5cb5b` 
 constant view 


___
 ##### function transferOwnership `0xf2fde38b` 
  nonpayable 
Allows the current owner to transfer control of the contract to a newOwner.

 Type | Name |
--- | --- |
| address | _newOwner |
___
 ##### constructor  `` 
  nonpayable 


___
 ##### event OwnershipRenounced `0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820` 
   


 Type | Name |
--- | --- |
| address | previousOwner |
___
 ##### event OwnershipTransferred `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0` 
   


 Type | Name |
--- | --- |
| address | previousOwner |
| address | newOwner |
___

---