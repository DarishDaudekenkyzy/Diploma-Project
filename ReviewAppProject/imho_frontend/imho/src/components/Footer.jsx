import React from 'react';

import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="pb-[50px]">
      <img className="mx-auto mt-[20px] mb-[50px]" src={logo} />
      <div className="flex justify-center">
        <div className="mx-[30px]">
          <p  className="text-white w-[200px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. </p>
        </div>
        <div className="mx-[30px]">
          <p  className="text-white w-[200px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. </p>
        </div>
        <div className="mx-[30px]">
          <p  className="text-white w-[200px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. </p>
        </div>
        <div className="mx-[30px]">
          <p  className="text-white w-[200px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer