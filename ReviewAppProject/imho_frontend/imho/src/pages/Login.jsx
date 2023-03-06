import React, {useEffect, useState, useContext, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../App';

import { Header, Footer } from '../components';

import styles from '../style'


  const Login = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [userModel, setUserModel] = useState({email: '', password: ''});
    const [emailErrorMessage, setEmailErrorMessage] = useState();
    const [passwordErrorMessage, setPasswordErrorMessage] = useState();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function handleChange(e) {
      if(e.target.name === 'email') setEmailErrorMessage('');
      if(e.target.name === 'password') setPasswordErrorMessage('');
      setUserModel({
        ...userModel,
        [e.target.name]: e.target.value
      });

    }

    function handleLogin() {
      if(emailRef.current.value === '') setEmailErrorMessage('This field is required');
      if(passwordRef.current.value === '') setPasswordErrorMessage('This field is required');

      if(userModel.email !== '' && userModel.password !== '') {
        axios.post('https://localhost:7040/User/SignIn', userModel)
        .then((response) => {
          console.log(response.data.value);
          localStorage.setItem('user', response.data);
          setUser(response.data);
          navigate("/");
        })
        .catch(function (error) {
          if (error.response) {
            if(error.response.data === 'User with provided email not found.')
              setEmailErrorMessage(error.response.data);
              if(error.response.data === 'Wrong password.')
              setPasswordErrorMessage(error.response.data);
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
    <div className='w-full overflow-hidden'>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Header />
        </div>
      </div>

      <section>
        <div className="form h-[700px] m-auto w-[600px]">
          <img src="./src/assets/loginBackground.jpg" />
          <form className="mt-[-480px] mr-[-180px] flex flex-col items-center">
            <p className="text-primary text-[30px] font-[KumarOne] mb-[10px]">Welcome Back</p>

            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" 
            name="email" type="email" placeholder="Email" onChange={handleChange} ref={emailRef}/>
            {emailErrorMessage ? (<div>{emailErrorMessage}</div>) : (<></>)}

            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" 
            name="password" type="password" placeholder="Password" onChange={handleChange} ref={passwordRef}/>
            {passwordErrorMessage ? (<div>{passwordErrorMessage}</div>) : (<></>)}

            <p className="text-EC7467 mb-[15px] right-0 text-[13px] pl-[95px]">forgot password?</p>
            <button className="bg-primary text-white w-[150px] py-[5px]" type="button" 
               onClick={handleLogin}>Log in</button>
            <Link to="/signup">
              <p className="text-EC7467  mt-[10px] text-[13px]">are you new here?</p>
            </Link>
          </form>
        </div>
      </section>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Login;
