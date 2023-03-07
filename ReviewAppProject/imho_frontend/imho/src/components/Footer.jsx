import React from 'react';

import imho_logo from '../assets/imho_logo.png';
import twitter_icon from '../assets/twitter_icon.svg';
import instagram_icon from '../assets/instagram_icon.svg';
import facebook_icon from '../assets/facebook_icon.svg';
import linkedin_icon from '../assets/linkedin_icon.svg';

const Footer = () => {
  return (
    <footer className="pb-[50px] px-20">
      <div className="flex border-black border-b-[1px]">
        <div className="flex items-end mb-[50px]">
          <p className="text-[15px] font-semibold mx-[30px]">Mobile app</p>
          <p className="text-[15px] font-semibold mx-[30px]">Community</p>
          <p className="text-[15px] font-semibold mx-[30px]">Company</p>
        </div>
        <img className="mx-auto mt-[20px] mb-[20px]" src={imho_logo} />
        <div className="flex items-end mb-[50px]">
          <p className="text-[15px] font-semibold mx-[30px]">Help desk</p>
          <p className="text-[15px] font-semibold mx-[30px]">Blog</p>
          <p className="text-[15px] font-semibold mx-[30px]">Resources</p>
        </div>
      </div>
      <div className="flex flex-col items-center ml-[70px]">
        <div className="flex justify-center mt-[30px]">
          <img className="h-[30px] mr-6" src={twitter_icon} alt="twitter_icon"/>
          <img className="h-[30px] mr-6" src={instagram_icon} alt="instagram_icon"/>
          <img className="h-[30px] mr-6" src={facebook_icon} alt="facebook_icon"/>
          <img className="h-[30px] mr-6" src={linkedin_icon} alt="linkedin_icon"/>
        </div>
        <div className="mt-[30px]">
          <p className="text-[15px]">© SDU. We love our users!</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer