import { useState, useContext } from 'react';
import { useNavigate, Link }  from 'react-router-dom'
import logo from '../assets/logo.png';
import { UserContext } from '../App';

function AuthSection() {
  const navigate = useNavigate();
  const userItem = localStorage.getItem('user');
  const {user, setUser} = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/login");
  }

  if(userItem) {
    return (
    <>
      <Link to="/account">
            <button className="text-white mx-1 px-[30px] py-[5px] ">Hello! {user.firstName}</button>
      </Link>
      <button onClick={handleLogout} className="text-white mx-1 px-[30px] py-[5px] ">Log Out</button>
    </>);
  }
  else {
    return (
      <>
        <Link to="/login">
          <button className="text-white mx-1 px-[30px] 
          py-[5px] ">Log In</button>
        </Link>
        <Link to="/signup">
          <button href="#" className="text-white mx-1 bg-EC7467 
          px-[30px] py-[5px] rounded-2xl">Sign Up</button>
        </Link>
      </>
      );
    }
}

const Header = () => {
  return (
    <header className="w-full flex py-6 justify-between items-center navbar h-75">
      <Link to="/">
        <img className="mb-5 ml-5" src={logo} alt="logo"/>
      </Link>
      <div>
        <AuthSection/>
      </div>
    </header>
  )
}

export default Header