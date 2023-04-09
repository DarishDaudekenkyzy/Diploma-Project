import {React, useState, useContext, useEffect, useRef} from 'react';

import { Header, Footer } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import logo from '../assets/imho_logo.png';
import google_reg from '../assets/google_reg.png';

import styles from '../style';
import { onOutsideClick } from '../components/Header';

const Signup = ({openSignup, setOpenSignup}) => {
  const {user, setUser} = useContext(UserContext);
  const { register, watch,setError, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      universityId: 0
    }
  });
  const [uniiversities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const signupRef = useRef(null);
  const watchUniversity = watch('universityId');
  onOutsideClick(signupRef, () => {
    setOpenSignup(false);
    document.body.style.overflow = 'scroll';
  });

  useEffect(() => {
      loadUniversities();
      document.body.style.overflow = 'hidden';
  }, [openSignup]);

  useEffect(() => {
    if(watchUniversity !== 0) {
      loadFaculties(watchUniversity);
    }
  }, [watchUniversity])

  async function loadUniversities() {
    await axios.get('https://localhost:7040/University/All')
      .then((response) => {
        console.log(response.data);
        setUniversities(response.data);
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
  async function loadFaculties(universityId) {
    await axios.get(`https://localhost:7040/Faculty/${universityId}/All`)
      .then((response) => {
        console.log(response.data);
        setFaculties(response.data);
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

  async function handleRegister(data) {
      axios.post('https://localhost:7040/User/Create', data)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setOpenSignup(false);
        document.body.style.overflow = 'scroll';
      })
      .catch(function (error) {
        if (error.response) {
          if(error.response.data === 'User with provided email exists.')
            setError('email', {type: "manual", message: 'This email is taken'});
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
    <div className='z-50 w-full top-0 h-screen absolute bg-[rgb(60,60,60,0.4)]'>
        <div className="flex flex-col items-center mt-[10px]
         m-auto max-w-[500px] bg-white p-[10px]" ref={signupRef}>
        <img className="h-[80px] my-[10px]" src={logo} alt="logo"/>
        <p className="text-black text-[30px] font-bold mb-[10px]">Sign Up</p>
          <form onSubmit={handleSubmit(handleRegister)} 
          className="flex flex-col py-[20px]">

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" 
            type="text" placeholder="First name" name="firstName" {...register('firstName',
            {required: 'This field is required'})}/>
            <ErrorMessage errors={errors} name='firstName'
            render={({ message }) => <p className="text-red-500">{message}</p>}/>

            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" 
            type="text" placeholder="Last name" name="lastName" {...register('lastName',
            {required: 'This field is required'})}/>
            <ErrorMessage errors={errors} name='lastName'
            render={({ message }) => <p className="text-red-500">{message}</p>}/>

            <select className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]"
            {...register('course', {required: 'This field is required'})}>
              <option value="">Class of</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <ErrorMessage errors={errors} name='course'
            render={({ message }) => <p className="text-red-500">{message}</p>}/>

            <select className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]"
            {...register('universityId', {required: 'This field is required'})}>
              <option value="none">University</option>
              {uniiversities.length > 0 && (
                  uniiversities.map((u) => { 
                    return (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  );}
              ))}
            </select>

            <select className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]"
            disabled={watchUniversity === 0}
            {...register('facultyId', {required: 'This field is required'})}>
              <option value="none">Faculty</option>
              {faculties.length > 0 && (
                  faculties.map((f) => { 
                    return (
                    <option key={f.facultyId} value={f.facultyId}>{f.facultyName}</option>
                  );}
              ))}
            </select>
            <ErrorMessage errors={errors} name='facultyId'
            render={({ message }) => <p className="text-red-500">{message}</p>}/>

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

            <button  className="w-[200px] my-[10px] text-white mx-auto bg-black 
            px-[30px] py-[7px]" type="submit">Register</button>
          </form>
        </div>
    </div>
  )
}

export default Signup;