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
  const [userModel, setUserModel] = useState({
    firstName: '', lastName: '', email: '', password: ''});
  const [errorMessages, setErrorMessages] = useState({firstName: '', lastName: '', email:'', password: ''});

  function validateModel() {
    let valid = true;
    let firstNameError = '';
    let lastNameError = '';
    let emailError = '';
    let passwordError = '';

    if(userModel.firstName === '') {
      valid = false;
      firstNameError = 'This field is required';
    } 
    if(userModel.lastName === '') {
      valid = false;
      lastNameError = 'This field is required';
    } 
    if(userModel.email === '') {
      valid = false;
      emailError = 'This field is required';
    } 
    if(userModel.password === '') {
      valid = false;
      passwordError = 'This field is required';
    }
    setErrorMessages({...errorMessages, 
      firstName: firstNameError, lastName: lastNameError, 
      email: emailError, password: passwordError});
    return valid;
  }

  function handleChange(e) {
    setErrorMessages({...errorMessages, [e.target.name]: ''});
    setUserModel({
      ...userModel,
      [e.target.name]: e.target.value
    })
    console.log(`${[e.target.name]}: ${e.target.value}`) ;
  }

  function handleRegister() {
    let validModel = validateModel();
    if(validModel === true) {
      console.log('handleRegister');
      axios.post('https://localhost:7040/User/Create', userModel)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        openSignup(false);
      })
      .catch(function (error) {
        if (error.response) {
          if(error.response.data === 'User with provided email exists.')
            setErrorMessages({...errorMessages, email: error.response.data});
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
  }

  return (
    <div className='w-full h-screen absolute bg-[rgb(60,60,60,0.4)]'>
        <div className="flex flex-col items-center mt-[10px]
         m-auto max-w-[500px] bg-white p-[10px]">
        <img className="h-[80px] my-[10px]" src={logo} alt="logo"/>
        <p className="text-black text-[30px] font-bold mb-[10px]">Sign Up</p>
          <form className="flex flex-col py-[20px]">
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="name" placeholder="First name" name="firstName" 
            onChange={handleChange}/>
            {errorMessages.firstName !== '' ? (<p>{errorMessages.firstName}</p>) : <></>}

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="name" placeholder="Last name" name="lastName" 
            onChange={handleChange}/>
            {errorMessages.lastName !== '' ? (<p>{errorMessages.lastName}</p>) : <></>}

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

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="email" placeholder="Email" name="email" 
            onChange={handleChange}/>
            {errorMessages.email !== '' ? (<p>{errorMessages.email}</p>) : <></>}

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="password" placeholder="Password" name="password"
            onChange={handleChange}/>
            {errorMessages.password !== '' ? (<p>{errorMessages.password}</p>) : <></>}

            <button  className="w-[200px] my-[10px] text-white mx-auto bg-black 
            px-[30px] py-[7px]" type="button" onClick={handleRegister}>Register</button>
          </form>
        </div>
    </div>
  )
}

export default Signup;