import React, {useContext, useEffect} from 'react'

import styles from '../style';
import { UserContext } from '../App';

const Settings = () => {
  const {user, setUser} = useContext(UserContext);
  return (
      <div className="mt-[10px] m-auto max-w-[600px] py-8">
          <form className="flex flex-col sm:flex-row">
            <div className='flex flex-col w-full sm:w-[60%]'>
              <label className="mb-[2px]">Email</label>
              <input className="w-full border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="email"/>
              {/* <input className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="email" defaultValue={user.email}/> */}

              <label className="mb-[2px]">First Name</label>
              <input className="w-full border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="name"/>
              {/* <input className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="name" defaultValue={user.firstName}/> */}

              <label className="mb-[2px]">Last Name</label>
              <input className="w-full border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="name"/>
              {/* <input className="w-[60%] border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="name" defaultValue={user.lastName}/> */}
              
              <label className="mb-[2px]">Course</label>
              <select className="w-full border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <label className="mb-[2px]">Faculty</label>
              <select className="w-full border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]">
                <option value="business">Business School</option>
                <option value="engineering">Engineering & Natural Sciences</option>
                <option value="education">Education & Humanities</option>
                <option value="law">Law & Social Sciences</option>
              </select>

              <label className="mb-[2px]">Password</label>
              <input className="w-full border-[1px] border-primary border-solid mb-[5px] px-[15px] py-[5px]" type="password" placeholder="*******"/>
            </div>
            <div className='grow flex flex-row sm:flex-col align-end justify-center sm:justify-start'>
              <button className="sm:ml-auto w-[200px] mt-[30px] text-white bg-black px-[20px] py-[7px]">Save changes</button>            
            </div>
          </form>
      </div>
  )
}

export default Settings;