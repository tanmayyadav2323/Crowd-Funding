import React, { useContext, createContext, Children } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { CreateCampaign } from "../pages";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x903Cad74C9aA994D93d080232AaC622cAc2E1a78');

    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {

            const data = await createCampaign({
                args: [address, form.title, // title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), // deadline,
                    form.image]
            });
            // const data = await contract.call(
            //     createCampaign,
            //     [
            //         address, // owner
            //         form.title, // title
            //         form.description, // description
            //         form.target,
            //         new Date(form.deadline).getTime(), // deadline,
            //         form.image
            //     ]);

            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
    }
    return (
        <StateContext.Provider
            value={
                {
                    address,
                    contract,
                    connect,
                    createCampaign: publishCampaign
                }
            }
        >
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);