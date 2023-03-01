import {React, useState, useContext} from 'react';

import { Header, Footer } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';

import styles from '../style'

const Signup = () => {
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
            <p className="text-primary text-[30px] font-[KumarOne] mb-[10px]">Welcome!</p>
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="name" placeholder="First Name"
            onChange={(e) => setInputFirstName(e.target.value)}/>
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="name" placeholder="Last Name"
            onChange={(e) => setInputLastName(e.target.value)}/>
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="email" placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}/>
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="password" placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}/>
            <button className="bg-primary text-white mt-[5px] w-[150px] py-[5px]" type="button"
            onClick={handleRegister}>Sign up</button>
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

export default Signup;