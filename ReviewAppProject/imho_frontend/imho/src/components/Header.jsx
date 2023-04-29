import { useState, useContext, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/imho_logo.png';
import { UserContext } from '../App';
import { Login, Signup, SignupGoogle } from '../pages';
import { ChevronDownIcon } from '@heroicons/react/24/solid'

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

function AuthSection({setOpenLogin, setOpenSignup}) {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }

  onOutsideClick(dropdownRef, () => {
    setUserDropdownOpen(false);
  })
  
  return (
    <>
    {user ?
        <div ref={dropdownRef} className='h-full'>
          <div onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          className='group px-8 text-white gap-1 bg-black h-full flex items-center cursor-pointer'>
                <p className="text-xl">Hey, {user.firstName}!</p>
                <ChevronDownIcon className='w-6 h-6'/>
          </div>
          <div className='relative'>
            {userDropdownOpen &&
            <div className='absolute top-0 bg-white w-full border-black border font-semibold cursor-pointer'>
              <div onClick={() => {navigate('/account', {state:1}); setUserDropdownOpen(false)}}
              className='py-2 px-2 hover:bg-gray-200'>
                <p>Profile</p>
              </div>
              <div onClick={() => {navigate('/account', {state:4}); setUserDropdownOpen(false)}}
              className='py-2 px-2 hover:bg-gray-200'>
                <p>Account Settings</p>
              </div>
              <div onClick={() => {navigate('/account', {state:2}); setUserDropdownOpen(false)}}
              className='py-2 px-2 hover:bg-gray-200'>
                <p>Your Ratings</p>
              </div>
              <div onClick={() => {navigate('/account', {state:3}); setUserDropdownOpen(false)}}
              className='py-2 px-2 hover:bg-gray-200'>
                <p>Saved</p>
              </div>
              <div onClick={() => {handleLogout(); setUserDropdownOpen(false)}}
              className='py-2 px-2 hover:bg-gray-200'>
                <p>Log Out</p>
              </div>
            </div>
            }
          </div>
        </div>
        :
        <div className="flex h-full cursor-pointer">
          <div onClick={() => setOpenLogin(true)}
          className="flex items-center justify-center hover:bg-gray-200 hover:underline
          border-black border-l-2 h-full px-[8px] md:px-[48px]">
            <button className="text-2xl">Log In</button>
          </div>
          <div onClick={() => setOpenSignup(true)}
          className="flex items-center justify-center hover:underline decoration-white
          h-full px-[8px] md:px-[48px] bg-black">
            <button  className="text-white text-2xl">
              Sign Up
            </button>
          </div>
        </div>
    }
    </>
  );
}

const MobileMenu = ({show=false, setShow, setOpenLogin, setOpenSignup}) => {
  const userItem = localStorage.getItem('user');
  const {user, setUser} = useContext(UserContext);
  const menuRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  onOutsideClick(menuRef, () => {
    close();
  });
  const close = () => {
    document.body.style.overflow = 'scroll';
    setShow(false);
  }
  useEffect(()=>{
    document.body.style.overflow = 'hidden';
  }, [show]);

  return (
    <div className='z-10 w-full h-screen top-0 absolute bg-[rgb(60,60,60,0.4)]'>
      <div className="flex flex-col gap-y-[32px] items-center mt-[80px] m-auto p-[10px] py-[32px] max-w-[300px] bg-white relative" ref={menuRef}>
        <div className='absolute top-[24px] right-[24px] cursor-pointer	' onClick={()=> close()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
            <path fill='black' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
          </svg>
        </div>
        <Link to="/">
          <img className="h-[50px]" src={logo} alt="logo"/>
        </Link>
        <div className="flex flex-col font-bold items-center gap-y-3 md:gap-x-10 h-full">
          {user !== null ? (
            <Link to='/account'>
              <button className="text-[16px] underline">Hello! {/*user.firstName*/}</button>
            </Link>
          ) : (
            <>
              <button className="text-[16px] underline" onClick={() => setOpenLogin(true)}>Log In</button>
              <button  className="text-[16px] underline" onClick={() => setOpenSignup(true)}>Sign Up</button>
            </>
          )}
          <Link to="/">
            <p className='text-[16px]'>
              Reviews
            </p>
          </Link>
          <Link to="/faq">
            <p className='text-[16px]'>
              FAQ
            </p>
          </Link>
          <div className='group h-full cursor-pointer'>
            <Link to="/about">
              <p className='group-hover:underline text-[16px]'>
                About us
              </p>
            </Link>
          </div>
          {user !== null && (
            <button onClick={handleLogout} className="text-[16px] underline">Log Out</button>
          )}
        </div>
      </div>
    </div>
  )
}

const Header = () => {

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openSignupGoogle, setOpenSignupGoogle] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  return (
    <div className='relative'>
      <header className="w-full flex justify-between text-2xl
      items-center border-0  border-black sm:border-2 h-[48px] md:h-[100px] relative">
        <Link to="/">
          <img className="h-[40px] md:h-[80px] my-[10px] ml-[32px] md:ml-[150px]" src={logo} alt="logo"/>
        </Link>
        <div className="hidden sm:flex justify-center items-center h-full gap-4">
          <div className='group px-4 h-full cursor-pointer flex items-center justify-center '>
            <Link to="/faq">
              <p className='group-hover:underline font-semibold'>
                FAQ
              </p>
            </Link>
          </div>
          <div onClick={() => navigate('/', {state: 'about'})}
          className='group px-4 h-full cursor-pointer flex items-center justify-center '>
              <p className='group-hover:underline font-semibold'>
                About us
              </p>
          </div>
          <AuthSection 
            setOpenLogin={setOpenLogin}
            setOpenSignup={setOpenSignup}
          />
        </div>
        <div className='flex sm:hidden bg-black h-full items-center justify-center px-[16px]'>
          <button onClick={()=> setOpenMenu(true)}>
            <svg width="16" height="16"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill='white' d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
            </svg>
          </button>
        </div>
      </header>
      {openMenu && <MobileMenu show={openMenu} setShow={setOpenMenu} setOpenLogin={setOpenLogin} setOpenSignup={setOpenSignup} />}
      {openLogin && <Login openLogin={openLogin} setOpenLogin={setOpenLogin}/>}
      {openSignup && <Signup openSignup={openSignup} setOpenSignup={setOpenSignup}/>}
      {openSignupGoogle && <SignupGoogle openSignupGoogle={setOpenSignupGoogle}/>}
    </div>
  )
}

export default Header