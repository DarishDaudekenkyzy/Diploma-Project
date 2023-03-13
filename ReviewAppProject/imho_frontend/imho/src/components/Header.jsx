import { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/imho_logo.png';
import { UserContext } from '../App';
import { Login, Signup, SignupGoogle } from '../pages';

export function onOutsideClick(ref, handleOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function AuthSection({openLogin , openSignup}) {
  const userItem = localStorage.getItem('user');
  const {user, setUser} = useContext(UserContext);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }
  
  if(user !== null) {
    return (
      <>
      <Link to="/account">
            <button className="mx-1 px-[30px] py-[5px] text-[16px] sm:text-[20px]">Hello! {user.firstName}</button>
      </Link>
      <button onClick={handleLogout} className=" mx-1 px-[30px] py-[5px] text-[16px] sm:text-[20px]">Log Out</button>
    </>);
  }
  else {
    return (
      <div className="flex h-full">
        <div className="flex items-center justify-center 
        border-black border-l-2 h-full px-[8px] md:px-[48px]">
          <button className="text-[16px] sm:text-[20px]" onClick={() => openLogin(true)}>Log In</button>
        </div>
        <div className="flex items-center justify-center 
        h-full px-[8px] md:px-[48px] bg-black">
          <button  className="text-white text-[16px] sm:text-[20px]" onClick={() => openSignup(true)}>
            Sign Up
          </button>
        </div>
      </div>
      );
    }
}

const Header = () => {

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openSignupGoogle, setOpenSignupGoogle] = useState(false);

  return (
    <div className='relative'>
      <header className="w-full flex justify-between 
      items-center border-black border-2 h-[48px] md:h-[100px] relative">
        <Link to="/">
          <img className="h-[40px] md:h-[80px] my-[10px] ml-[32px] md:ml-[150px]" src={logo} alt="logo"/>
        </Link>
        <div className="flex justify-center items-center gap-x-3 md:gap-x-10 h-full">
          <Link>
            <p className="text-[16px] sm:text-[20px]">
              Reviews
            </p>
          </Link>
          <Link>
            <p className="text-[16px] sm:text-[20px]">
              FAQ
            </p>
          </Link>
          <Link>
            <p className="text-[16px] sm:text-[20px]">
              About us
            </p>
          </Link>
          <AuthSection 
            openLogin={setOpenLogin}
            openSignup={setOpenSignup}
          />
        </div>
      </header>
      {openLogin && <Login openLogin={setOpenLogin}/>}
      {openSignup && <Signup openSignup={setOpenSignup}/>}
      {openSignupGoogle && <SignupGoogle openSignupGoogle={setOpenSignupGoogle}/>}
    </div>
  )
}

export default Header