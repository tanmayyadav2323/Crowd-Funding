import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import FundCard from './FundCard'


const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();
    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, {
            state: campaign
        });
    }

    return (
        <div>
            {/* <h1 className='font-epilogue font-semibold text-[40px] text-white text-left'>
                {title}
            </h1> */}
            <div className='flex flex-wrap mt-[20px] gap-[26px]'>
                {
                    isLoading && (
                        <div className="fixed inset-0 z-10 h-screen bg-gray-900 flex items-center justify-center">
                            <div className="rounded-md p-4 bg-gray-800">
                                <div className="w-16 h-16 bg-white animate-pulse rounded-full mx-auto mb-4"></div>
                                <p className="text-center text-white">Transaction is in progress</p>
                                <p className="text-center font-bold text-white">Please wait...</p>
                            </div>
                        </div>

                    )
                }
                {
                    !isLoading && campaigns.length === 0 && (
                        <div className="flex flex-col justify-around items-center h-full w-full">
                            <p className="text-white font-epilogue font-semibold text-2xl animate-fade-in">
                                No campaigns yet!
                            </p>
                        </div>

                    )
                }
                {!isLoading && campaigns.length > 0 && campaigns.map((campaign, i) => (
                    <FundCard
                        key={i}
                        {...campaign}
                        handleClick={() => handleNavigate(campaign)}
                    />
                ))}
            </div>
        </div>
    )
}

export default DisplayCampaigns