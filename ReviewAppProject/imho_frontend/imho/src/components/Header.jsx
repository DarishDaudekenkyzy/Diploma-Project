import { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="w-full flex py-6 justify-between items-center navbar h-75">
      <Link to="/">
        <img className="mb-5 ml-5" src={logo} alt="logo"/>
      </Link>
      <div>
        <Link to="/login">
          <button className="text-white mx-1 px-[30px] 
          py-[5px] ">Log In</button>
        </Link>
        <Link to="/signup">
          <button href="#" className="text-white mx-1 bg-EC7467 
          px-[30px] py-[5px] rounded-2xl">Sign Up</button>
        </Link>
      </div>
    </header>
  )
}

export default Header