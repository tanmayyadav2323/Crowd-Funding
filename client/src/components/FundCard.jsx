import React from 'react'
import { tagType, thirdweb } from '../assets'
import { daysLeft } from '../utils'
import { motion } from "framer-motion"

{/* <div className="flex flex-row items-center mb-[18px]">
                    <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain" />
                    <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
                </div> */}

const FundCard = ({ key, owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
    const remainingDays = daysLeft(deadline);

    return (
        <motion.div
            whileHover={{ scale: 1.08 }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="sm:max-w-[450px] w-full rounded-[15px] bg-gray-800 cursor-pointer mt-[50px]" onClick={handleClick}>
                <img src={image} alt="fund" className="w-full h-[300px] object-cover rounded-[15px]" />
                <div className="h-[300px] px-4 pb-[10px]">
                    <h3 className="pt-4 font-epilogue font-semibold text-[22px] text-white overflow-hidden overflow-ellipsis ">
                        {title}
                    </h3>
                    <p className="h-[200px] py-[10px] font-epilogue font-normal italic text-gray-400 text-[18px] leading-normal text-overflow: clip overflow-hidden">
                        {description}
                    </p>
                </div>
                <div className="flex justify-around items-center py-[10px]">
                    <div className="flex flex-col bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg p-4">
                        <h4 className="font-epilogue font-semibold text-[18px] leading-[22px]">{amountCollected}</h4>
                        <p className="mt-1 font-epilogue font-normal text-[14px] leading-[18px]">Donations in Sepola</p>
                    </div>
                    <div className="flex flex-col bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-4">
                        <h4 className="font-epilogue font-semibold text-[18px] leading-[22px]">10</h4>
                        <p className="mt-1 font-epilogue font-normal text-[14px] leading-[18px]">People Donated</p>
                    </div>
                    <div className="flex flex-col bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-4">
                        <h4 className="font-epilogue font-semibold text-[18px] leading-[22px]">{remainingDays < 0 ? 0 : remainingDays}</h4>
                        <p className="mt-1 font-epilogue font-normal text-[14px] leading-[18px]">Days Left</p>
                    </div>
                </div>



            </div>
        </motion.div>

    )
}

{/* <div className='flex justify-between flex-wrap pt-[15px] gap-2'>
<div flex flex-col>
    <h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>{amountCollected}</h4>
    <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm: max-w-[120px] truncate'>Raised of {target}</p>
</div>
<div flex flex-col>
    <h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>{remainingDays < 0 ? 0 : remainingDays}</h4>
    <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm: max-w-[120px] truncate'>Days Left</p>
</div>
</div> */}

export default FundCard