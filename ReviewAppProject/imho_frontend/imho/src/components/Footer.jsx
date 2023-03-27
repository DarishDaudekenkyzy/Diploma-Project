import React from 'react';

import imho_logo from '../assets/imho_logo.png';
import twitter_icon from '../assets/twitter_icon.svg';
import instagram_icon from '../assets/instagram_icon.svg';
import facebook_icon from '../assets/facebook_icon.svg';
import linkedin_icon from '../assets/linkedin_icon.svg';

const NavItem = ({text}) => {
  return(
    <p className="text-[15px] font-semibold">{text}</p>
  )
}

const Footer = () => {
  return (
    <footer className="pb-[50px] px-[20px] sm:px-20 border-black border-t-[2px]">
      <img className="sm:hidden mx-auto mt-[20px] mb-[20px]" src={imho_logo} />
      <div className="flex justify-center items-center gap-x-[24px] border-black border-b-[1px] pb-[24px] sm:pb-0">
        <div className="flex flex-col sm:flex-row items-end gap-[20px] sm:gap-[30px]">
          <NavItem text="Mobile app" />
          <NavItem text="Community" />
          <NavItem text="Company" />
        </div>
        <img className="hidden sm:block mx-auto mt-[20px] mb-[20px]" src={imho_logo} />
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-[20px] sm:gap-[30px]">
          <NavItem text="Help desk" />
          <NavItem text="Blog" />
          <NavItem text="Resources" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-[30px] mt-[30px] ">
        <div className="flex justify-center gap-x-6">
          <img className="aspect-square h-[24px]" src={twitter_icon} alt="twitter_icon"/>
          <img className="aspect-square h-[24px]" src={instagram_icon} alt="instagram_icon"/>
          <img className="aspect-square h-[24px]" src={facebook_icon} alt="facebook_icon"/>
          <img className="aspect-square h-[24px]" src={linkedin_icon} alt="linkedin_icon"/>
        </div>
        <p className="text-[15px]">© SDU. We love our users!</p>
      </div>
    </footer>
  )
}

export default Footer