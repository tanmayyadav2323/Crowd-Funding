import React from 'react'
import { tagType, thirdweb } from '../assets'
import { daysLeft } from '../utils'

const FundCard = (
    owner, title, description, target, deadline, amountCollected, image, handleClick
) => {
    const remainingDays = daysLeft(deadline);

    return (
        <div className='sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer' onClick={handleClick}>
            <img src={image} alt='Fund' className='w-full h-[158px] object-cover rounded-[15px]' />
            <div className='flex flex-col p-4'>
                <div>
                    <img src={tagType} alt='tag' className='w-[17px] h-[17px] object-contain' />
                    <p className='ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]'>Category</p>
                </div>
            </div>
        </div>
    )
}

export default FundCard