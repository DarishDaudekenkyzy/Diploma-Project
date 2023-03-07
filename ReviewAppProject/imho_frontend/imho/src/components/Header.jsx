import { useState, useContext } from 'react';
import { useNavigate, Link }  from 'react-router-dom'
import logo from '../assets/imho_logo.png';
import { UserContext } from '../App';
import { Login, Signup, SignupGoogle } from '../pages';

function AuthSection({openLogin , openSignup}) {
  const navigate = useNavigate();
  const userItem = localStorage.getItem('user');
  const {user, setUser} = useContext(UserContext);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    // navigate("/login");
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
      <div className="flex">
        <div className="flex items-center justify-center 
        border-black border-l-2 h-[100px] w-[200px]">
          <button className="text-[20px]" onClick={() => openLogin(true)}>Log In</button>
        </div>
        <div className="flex items-center justify-center 
        h-[100px] w-[200px] bg-black">
          <button  className="text-white  text-[20px]" onClick={() => openSignup(true)}>
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
      items-center border-black border-2 h-[100px] relative">
        <Link to="/">
          <img className="h-[80px] my-[10px] ml-[150px]" src={logo} alt="logo"/>
        </Link>
        <div className="flex justify-center items-center">
          <Link>
            <p className="text-[20px] mr-[40px]">
              Reviews
            </p>
          </Link>
          <Link>
            <p className="text-[20px] mr-[40px]">
              FAQ
            </p>
          </Link>
          <Link>
            <p className="text-[20px] mr-[40px]">
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