import React, {useEffect, useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../App';
import logo from '../assets/imho_logo.png';
import google_reg from '../assets/google_reg.png';

import { Header, Footer } from '../components';

import styles from '../style'


  const Login = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const[inputEmail, setInputEmail] = useState();
    const[inputPassword, setInputPassword] = useState();

    function handleLogin() {
      
      axios.post('https://localhost:7040/User/signin', {email: inputEmail, password: inputPassword})
      .then((response) => {
        console.log(response.data.value);
        localStorage.setItem('user', response.data.value);
        setUser({
          firstName: response.data.value.firstName,
          lastName: response.data.value.lastName,
          email: response.data.value.email,
          password: response.data.value.password
        });
        console.log(user);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
  return (
    <div className='w-full h-screen absolute overflow-hidden bg-[rgb(60,60,60,0.3)]'>
        <div className="flex flex-col items-center mt-[10px]
        border-black border-2 m-auto w-[500px] bg-white">
        <img className="h-[80px] my-[10px]" src={logo} alt="logo"/>
        <p className="text-black text-[30px] font-bold mb-[10px]">Login to your account</p>
          <form className="flex flex-col mt-[20px]">
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="email" placeholder="Email" onChange={(e) => setInputEmail(e.target.value)}/>
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="password" placeholder="Password" onChange={(e) => setInputPassword(e.target.value)}/>
            <p className="text-gray text-center my-[15px] text-[15px]">forgot password?</p>
            <button  className="w-[200px] my-[10px] text-white mx-auto bg-black 
            px-[30px] py-[7px]" type="button" onClick={handleLogin}>Continue</button>
            <div className="flex items-center gap-x-2">
              <hr className="w-[50px]"/>
              <p className="text-gray text-center my-[10px] text-[15px]">Sign up with email</p>
              <hr className="w-[50px]"/>
            </div>
            <button  className="w-[250px] my-[10px] text-white mx-auto bg-black 
            px-[20px] py-[5px]" type="button" onClick={handleLogin}> 
              <span class="flex items-center gap-x-3">
                <img className="h-[25px] my-[10px]" src={google_reg} />   
                Sign up with Google
              </span>
            </button>
            <p className="text-gray text-center text-[15px]">Don’t have an account?</p>
            <p className="text-gray text-center text-[15px] ">Sign Up</p>
          </form>
        </div>
        <div className="form h-[700px] m-auto w-[600px] hidden">
          <form className="mt-[480px] mr-[180px] flex flex-col items-center">
            <Link to="/signup">
              <p className="text-EC7467  mt-[10px] text-[13px]">are you new here?</p>
            </Link>
          </form>
        </div>
    </div>
  )
}

export default Login;
