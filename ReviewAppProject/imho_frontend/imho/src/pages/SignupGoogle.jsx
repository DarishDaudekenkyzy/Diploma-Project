import {React, useState, useContext} from 'react';

import { Header, Footer } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import logo from '../assets/imho_logo.png';
import google_reg from '../assets/google_reg.png';

import styles from '../style'

const SignupGoogle = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const[inputEmail, setInputEmail] = useState();
  const[inputFirstName, setInputFirstName] = useState();
  const[inputLastName, setInputLastName] = useState();
  const[inputPassword, setInputPassword] = useState();

  function handleRegister() {
      
    axios.post('https://localhost:7040/User/register', 
    { firstName: inputFirstName, 
      lastName: inputLastName,
      email: inputEmail,
      password: inputPassword})
    .then((response) => {
      console.log(response.data);
      localStorage.setItem('user', response.data);
      setUser({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        password: response.data.password
      });
      navigate("/");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }

  return (
    <div className='w-full top-0 h-screen absolute overflow-hidden bg-[rgb(60,60,60,0.4)]'>
        <div className="flex flex-col items-center mt-[10px]
         m-auto w-[500px] bg-white">
        <img className="h-[80px] my-[10px]" src={logo} alt="logo"/>
        <p className="text-black text-[30px] font-bold mb-[10px]">Sign Up</p>
          <form className="flex flex-col mt-[20px]">
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="email" placeholder="Email" onClick={handleRegister}/>
            <button  className="w-[200px] my-[10px] text-white mx-auto bg-black 
            px-[30px] py-[7px]" type="button" onClick={handleRegister}>Continue</button>
            <div className="flex items-center gap-x-2">
              <hr className="w-[50px]"/>
              <p className="text-gray text-center my-[10px] text-[15px]">Sign up with email</p>
              <hr className="w-[50px]"/>
            </div>
            <button  className="w-[250px] my-[10px] text-white mx-auto bg-black 
            px-[20px] py-[5px]" type="button" onClick={handleRegister}> 
              <span class="flex items-center gap-x-3">
                <img className="h-[25px] my-[10px]" src={google_reg} />   
                Sign up with Google
              </span>
            </button>
            <p className="text-gray text-center text-[15px]">Already have an account? Login</p>
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

export default SignupGoogle;