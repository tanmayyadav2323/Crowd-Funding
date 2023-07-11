import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SideBar, NavBar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';

const App = () => {
  return (
    <div className='relative sm:-8 p-4 bg-gray-900 min-h-screen flex flex-row'>
      <div className='w-full mx-auto sm:pr-5 ml-[20px]'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/create-campaign' element={<CreateCampaign />}></Route>
          <Route path='/campaign-details/:id' element={<CampaignDetails />}></Route>
        </Routes>
      </div>
    </div>


  )
}

export default App