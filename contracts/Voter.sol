//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Voter {
    string private party;
    uint private inc=0;
    uint private bjp=0;
    uint private cpi=0;
    uint private cpm=0;
    uint private ncp=0;
    uint private bsp=0;
    uint private aitc=0;
    uint private aap=0;
    uint private zero=0;
    constructor(string memory _voting) {
        console.log("Deploying a Voter with greeting:", _voting);
    }

    function show() public view returns (string memory) {
        return party;
    }

    function tv() public view returns (uint,uint,uint,uint,uint,uint,uint,uint) {
        return (inc,bjp,cpi,cpm,ncp,bsp,aitc,aap);
    }

    function winner() public view returns (string memory partyName,uint totalVotes) {
        uint[] memory data = new uint[](9);
        data[0] = zero;
        data[1] = inc;
        data[2] = bjp;
        data[3] = cpi;
        data[4] = cpm;
        data[5] = ncp;
        data[6] = bsp;
        data[7] = aitc;
        data[8] = aap;

        uint maxIndex = getMax(data);
        if (maxIndex == 0) {
            return ("Contestants Draw",data[0]);
        } else if (maxIndex == 1) {
            return ("Indian National Congress",data[1]);
        } else if (maxIndex == 2) {
            return ("Bhartiye Janta Party",data[2]);
        } else if (maxIndex == 3) {
            return ("Communist Party of India",data[3]);
        } else if (maxIndex == 4) {
            return ("Communist Party of India (Marxist)",data[4]);
        } else if (maxIndex == 5) {
            return ("Nationalist Congress Party",data[5]);
        } else if (maxIndex == 6) {
            return ("Bahujan Samaj Party",data[6]);
        } else if (maxIndex == 7) {
            return ("All India Trinamool Congress",data[7]);
        }else if (maxIndex == 8) {
            return ("Aam Admi Party",data[8]);
        }
    }
    function getMax(uint[] memory values) internal pure returns (uint) {
        uint maxVal = 0;
        uint maxIndex = 0;

        for (uint i = 0; i < values.length; i++) {
                if (values[i] > maxVal ) {
                maxVal = values[i];
                maxIndex = i;
            }
        }
        for (uint i = 0; i < values.length; i++) {
                if (values[i] == maxVal) {
                    if (maxIndex != i) {
                        maxIndex = 0;
                }
            }
        }
        return (maxIndex);
    }


    function vote(uint _vote) public {
        if (_vote==1) {
            party="Voted Indian National Congress";
            inc++;
        }
        else if(_vote==2) {
            party="Voted Bhartiye Janta Party";
            bjp++;
        }
        else if(_vote==3) {
            party="Voted Communist Party of India (CPI)";
            cpi++;
        }
        else if(_vote==4) {
            party="Voted Communist Party of India (Marxist) (CPM)";
            cpm++;
        }
        else if(_vote==5) {
            party="Voted Nationalist Congress Party (NCP)";
            ncp++;
        }
        else if(_vote==6) {
            party="Voted Bahujan Samaj Party (BSP)";
            bsp++;
        }
        else if(_vote==7) {
            party="Voted All India Trinamool Congress (AITC)";
            aitc++;
        }
        else if(_vote==8) {
            party="Aam Admi Party (AAP)";
            aap++;
        }
        else{
            party="Error Occured";
        }
        }

    function reset() public {
            party="Please vote";
            bjp=0;
            inc=0;
            cpi=0;
            cpm=0;
            ncp=0;
            bsp=0;
            aitc=0;
            aap=0;
        }
}
