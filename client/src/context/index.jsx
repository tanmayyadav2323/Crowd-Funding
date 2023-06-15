import React, { useContext, createContext, Children } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { CreateCampaign } from "../pages";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x903Cad74C9aA994D93d080232AaC622cAc2E1a78');

    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const { mutateAsync: donateCampaign } = useContractWrite(contract, "donateCampaign")
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

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');
        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))
        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }

    const callDonate = async (_id, amount) => {
        try {
            const data = await donateCampaign({ args: [_id] }, { value: ethers.utils.parseUnits("0.1") });
            return data;
        } catch (err) {
            console.error("contract call failure", err);
        }
    }


    const donate = async (pId, amount) => {
        const data = await contract.call('donateCampaign', [
            pId
        ],
            {
                value: ethers.utils.parseEther(amount),
            },);
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    }


    return (
        <StateContext.Provider
            value={
                {
                    address,
                    contract,
                    connect,
                    createCampaign: publishCampaign,
                    getCampaigns: getCampaigns,
                    getUserCampaigns,
                    donate,
                    getDonations,
                    callDonate
                }
            }
        >
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);