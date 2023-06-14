import React, { useContext, createContext, Children } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { CreateCampaign } from "../pages";

const StateContext = createContext();

export const StateContextProvider = ({ childre }) => {
    const { contract } = useContract('0x903Cad74C9aA994D93d080232AaC622cAc2E1a78');

    const { mutateAsync: createCampaign } = useContractWrite(contract, 'Create Campaign');
    const address = useAddress();
    const connect = useMetamask();

    const publicCampaign = async (form) => {
        try {
            const data = await CreateCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ]);

            console.log("contract call success", data);
        }
        catch {
            console.log("contract call failure", error);
        }
    }

    return (
        <StateContext.Provider
            value={
                {
                    address,
                    contract,
                    createCampaign: publicCampaign
                }
            }
        >
            {Children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);