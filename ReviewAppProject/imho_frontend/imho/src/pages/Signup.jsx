import {React, useState, useContext} from 'react';

import { Header, Footer } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import logo from '../assets/imho_logo.png';
import google_reg from '../assets/google_reg.png';

import styles from '../style'

const Signup = ({openSignup}) => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const [userModel, setUserModel] = useState();

  function handleChange(e) {
    setUserModel({
      ...userModel,
      [e.target.name]: e.target.value
    })
  }

  function handleRegister() {
    openSignup(false);
    axios.post('https://localhost:7040/User/Create', userModel)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem('user', response.data);
      setUser(response.data);
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
    <div className='w-full h-screen absolute overflow-hidden bg-[rgb(60,60,60,0.4)]'>
        <div className="flex flex-col items-center mt-[10px]
         m-auto w-[500px] bg-white">
        <img className="h-[80px] my-[10px]" src={logo} alt="logo"/>
        <p className="text-black text-[30px] font-bold mb-[10px]">Sign Up</p>
          <form className="flex flex-col mt-[20px]">
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="name" placeholder="First name" onChange={(e) => setInputFirstName(e.target.value)}/>

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="name" placeholder="Last name" onChange={(e) => setInputLastName(e.target.value)}/>

            <select className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]">
              <option value="none">Class of</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <select className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]">
              <option value="none">Faculty</option>
              <option value="business">Business School</option>
              <option value="engineering">Engineering & Natural Sciences</option>
              <option value="education">Education & Humanities</option>
              <option value="law">Law & Social Sciences</option>
            </select>

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="email" placeholder="Email" onChange={(e) => setInputEmail(e.target.value)}/>

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="password" placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}/>

            <button  className="w-[200px] my-[10px] text-white mx-auto bg-black 
            px-[30px] py-[7px]" type="button" onClick={handleRegister}>Register</button>
          </form>
        </div>
    </div>
  )
}

export default Signup;