pragma solidity ^0.4.6;

contract Voting {

  mapping (bytes32 => uint8) public votesReceived;

  bytes32[] public candidateList;
  bytes32[] public voterList;

  // Initialize all the participants
  function Voting(bytes32[] candidateNames, bytes32[] voterNames) {
    candidateList = candidateNames;
    voterList = voterNames;
  }

  function totalVotesFor(bytes32 candidate) returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  function voteForCandidate(bytes32 candidate, bytes32 voter) {
    require(validCandidate(candidate));
    require(validVoter(voter));

    votesReceived[candidate] += 1;
  }

  function validCandidate(bytes32 candidate) returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function validVoter(bytes32 voter) returns (bool) {
    for(uint i = 0; i < voterList.length; i++) {
      if (voterList[i] == voter) {
        return true;
      }
    }
    return false;
  }
}
