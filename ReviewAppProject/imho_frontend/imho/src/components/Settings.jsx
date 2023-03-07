import React, {useContext} from 'react'

import styles from '../style';
import { UserContext } from '../App';

const Settings = () => {
  const {user, setUser} = useContext(UserContext);

  return (
      <div className="mt-[10px] m-auto w-[600px]">
          <form className="flex flex-col relative">

            <label className="mb-[2px]">Email</label>
            <input className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="email" defaultValue={user.email}/>

            <label className="mb-[2px]">First Name</label>
            <input className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="name" defaultValue={user.firstName}/>

            <label className="mb-[2px]">Last Name</label>
            <input className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="name" defaultValue={user.lastName}/>
            
            <label className="mb-[2px]">Course</label>
            <select className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <label className="mb-[2px]">Faculty</label>
            <select className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]">
              <option value="business">Business School</option>
              <option value="engineering">Engineering & Natural Sciences</option>
              <option value="education">Education & Humanities</option>
              <option value="law">Law & Social Sciences</option>
            </select>

            <label className="mb-[2px]">Password</label>
            <input className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="password" placeholder="*******"/>

            <button className="w-[200px] mt-[30px] text-white absolute
            top-[-5px] right-0 bg-black px-[20px] py-[7px]">Save changes</button>

          </form>
      </div>
  )
}

export default Settings;