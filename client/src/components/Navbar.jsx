import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from './';
import { useStateContext } from '../context';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const NavBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('Campaigns');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const [newaddress, setnewaddress] = useState(address);

  const handleClick = (link) => {
    setIsActive(link.name);
    navigate(link.link);
  };

  const handleAddress = (val) => {
    setnewaddress(val);
  }

  return (
    <nav>
      <div className='list-none hidden sm:flex flex-row justify-between  h-[50px] '>
        <ul className="flex flex-row justify-between items-center gap-[50px]">
          {navlinks.map((link, indx) => (
            <li
              key={indx}
              className={`cursor-pointer ${isActive === link.name ? 'text-white' : 'text-gray-500'
                } flex items-center space-x-1 text-[20px] gap-2`}
              onClick={() => handleClick(link)}
            >
              <FontAwesomeIcon icon={link.icon} class="h-[20px]" />
              <span class="text-[28px]">{link.name}</span>
            </li>
          ))}
        </ul>
        <div className='flex'>
          <CustomButton btnType="button"
            title={newaddress ? 'Log Out' : 'Connect'}
            styles={'bg-[#8c6dfc]'}
            handleClick={() => {
              if (newaddress) {
                handleAddress(null);
              }
              else {
                try {
                  connect();
                  handleAddress(address);
                }
                catch (error) {
                  alert(error);
                }
              }
            }}
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
        {/*Small Devices*/}
        <div className="sm:hidden flex justify-end items-center relative">
          <img
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />
          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <FontAwesomeIcon icon={link.icon} className="h-[20px] text-white" />

                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>
            <CustomButton btnType="button"
              title={address ? 'Log Out' : 'Connect'}
              styles={'bg-[#8c6dfc]'}
              handleClick={() => {
                // if (address) logout();
                // else connect();
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar


