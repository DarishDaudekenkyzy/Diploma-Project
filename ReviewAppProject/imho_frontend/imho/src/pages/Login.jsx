import React, {useEffect, useState, useContext, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../App';
import logo from '../assets/imho_logo.png';
import google_reg from '../assets/google_reg.png';
import { onOutsideClick } from '../components/Header';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';


  const Login = ({openLogin, setOpenLogin}) => {
    
    const {user, setUser} = useContext(UserContext);
    const { register, setError, handleSubmit, formState: { errors } } = useForm();
    const loginRef = useRef(null);

    onOutsideClick(loginRef, () => {
      document.body.style.overflow = 'scroll';
      setOpenLogin(false)
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [openLogin])
    

    function handleLogin(data) {
      axios.post('https://localhost:7040/User/SignIn', data)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setOpenLogin(false);
        document.body.style.overflow = 'scroll';
      })
      .catch(function (error) {
        if (error.response) {
          if(error.response.data === 'User with provided email not found.')
            setError('email', {type: "manual", message: 'User not found.'});
          if(error.response.data === 'Wrong password.')
            setError('password', {type: "manual", message: 'Wrong password.'});
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
    <div className='z-50 w-full h-screen top-0 absolute bg-[rgb(60,60,60,0.4)]'>
        <div className="flex flex-col items-center mt-[10px] m-auto p-[10px] max-w-[500px] bg-white" ref={loginRef}>
        <img className="h-[80px] my-[10px]" src={logo} alt="logo"/>
        <p className="text-black text-[20px] sm:text-[30px] font-bold mb-[10px]">Login to your account</p>
          <form onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col py-[20px]">
            
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" 
            type="email" placeholder="E-mail" name="email" {...register('email',
            {required: 'This field is required'})}/>
            <ErrorMessage errors={errors} name='email'
            render={({ message }) => <p className="text-red-500">{message}</p>}/>

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" 
            type="password" placeholder="Passowrd" name="password" {...register('password',
            {required: 'This field is required'})}/>
            <ErrorMessage errors={errors} name='password'
            render={({ message }) => <p className="text-red-500">{message}</p>}/>
            

            <p className="text-gray text-center my-[15px] text-[15px]">forgot password?</p>
            <button  className="w-[200px] my-[10px] text-white mx-auto bg-black 
            px-[30px] py-[7px] rounded-[4px]" type="submit">Continue</button>
            <div className="flex items-center gap-x-2">
              <hr className="w-[50px]"/>
              <p className="text-gray text-center my-[10px] text-[15px]">Sign up with email</p>
              <hr className="w-[50px]"/>
            </div>
            <button  className="w-[250px] my-[10px] text-white mx-auto bg-black 
            px-[20px] py-[5px] rounded-[4px]" type="button"> 
              <span className="flex items-center gap-x-3">
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
