import React from 'react'

import { Header, Footer } from '../components';

  import styles from '../style'

const Signup = () => {
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
            <p className="text-primary text-[30px] font-[KumarOne] mb-[20px]">Welcome!</p>
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="name" placeholder="Username"/>
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="email" placeholder="Email"/>
            <input className="w-100 border-[1px] border-primary border-solid mb-[10px] px-[5px] py-[7px]" type="password" placeholder="Password"/>
            <button className="bg-primary text-white mt-[10px] w-[150px] py-[5px]">Sign up</button>
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