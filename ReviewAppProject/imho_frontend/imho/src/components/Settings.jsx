import React from 'react'

import styles from '../style';

const Settings = () => {
  return (
      <section className="w-full overflow-hidden mt-[10px] m-auto w-[600px]">
          <form className="flex flex-col">

            <label className="mb-[10px]">Email</label>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="email" placeholder="190000000@stu.sdu.edu.kz"/>

            <label className="mb-[10px]">Username</label>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="name" placeholder="sdushnik sdushnikov"/>
            
            <label className="mb-[10px]">Course</label>
            <select className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]">
              <option value="volvo">1</option>
              <option value="saab">2</option>
              <option value="opel">3</option>
              <option value="audi">4</option>
            </select>

            <label className="mb-[10px]">Faculty</label>
            <select className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]">
              <option value="volvo">Business School</option>
              <option value="saab">Engineering & Natural Sciences</option>
              <option value="opel">Education & Humanities</option>
              <option value="audi">Law & Social Sciences</option>
            </select>

            <label className="mb-[10px]">Password</label>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="password" placeholder="*******"/>

            <button className="w-[200px] mt-[30px] text-white mx-1 bg-EC7467 
          px-[30px] py-[10px] rounded-xl">Save changes</button>

          </form>
      </section>
  )
}

export default Settings;