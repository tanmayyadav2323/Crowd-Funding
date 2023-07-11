import React from 'react'

import { loader } from '../assets';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
      <div className="bg-white rounded-md p-4">
        <div className="w-16 h-16 bg-gray-900 animate-spin rounded-full mx-auto mb-4"></div>
        <p className="text-center">Transaction is in progress</p>
        <p className="text-center font-bold">Please wait...</p>
        <p className="text-center">Progress: {progress}%</p>
      </div>
    </div>
  )
}

export default Loader