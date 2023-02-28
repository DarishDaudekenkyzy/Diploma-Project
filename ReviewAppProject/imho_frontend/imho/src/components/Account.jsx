import React from 'react'

import styles from '../style';

const Account = () => {
  return (
      <section className="w-full overflow-hidden mt-[40px] m-auto w-[600px]">
          <form className="flex flex-col">
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="name" placeholder="First name"/>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="name" placeholder="Last name"/>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="text" placeholder="Course"/>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="text" placeholder="Faculty"/>
            <button className="w-[200px] mt-[30px] text-white mx-1 bg-EC7467 
          px-[30px] py-[10px] rounded-xl">Delete my account</button>
          </form>
      </section>
  )
}

export default Account;