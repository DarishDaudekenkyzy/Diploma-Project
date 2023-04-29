import React from 'react'

import styles from '../style';

const Account = () => {
  return (
      <div className="mt-[10px] m-auto max-w-[600px] py-8">
          <form className="flex flex-col mt-[20px]">
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="name" placeholder="First name"/>
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="name" placeholder="Last name"/>
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="text" placeholder="Course"/>
            <input className="w-full border-black border-b-2 mb-[10px] px-[20px] py-[7px]" type="text" placeholder="Faculty"/>
            <button className="w-full sm:w-[200px] mt-[30px] text-white mx-1 bg-black px-[30px] py-[10px]">Edit</button>
          </form>
      </div>
  )
}

export default Account;