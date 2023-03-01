import React, {useEffect, useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../App';

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
    <div className='w-full overflow-hidden'>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Header />
        </div>
      </div>

      <section>
        <div className="form h-[700px] m-auto w-[600px]">
          <img src="./src/assets/loginBackground.jpg" />
          <form className="mt-[-470px] mr-[-180px] flex flex-col items-center">
            <p className="text-primary text-[30px] font-[KumarOne] mb-[20px]">Welcome Back</p>

            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" 
            type="email" placeholder="Email" onChange={(e) => setInputEmail(e.target.value)}/>

            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" 
            type="password" placeholder="Password" onChange={(e) => setInputPassword(e.target.value)}/>

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
