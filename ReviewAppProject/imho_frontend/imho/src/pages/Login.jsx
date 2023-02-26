import React from 'react'
import { Link } from 'react-router-dom'

import { Header, Footer } from '../components';

  import styles from '../style'

const Login = () => {
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
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="email" placeholder="Email"/>
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="password" placeholder="Password"/>
            <p className="text-EC7467 mb-[15px] right-0 text-[13px] pl-[95px]">forgot password?</p>
            <button className="bg-primary text-white w-[150px] py-[5px]">Log in</button>
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