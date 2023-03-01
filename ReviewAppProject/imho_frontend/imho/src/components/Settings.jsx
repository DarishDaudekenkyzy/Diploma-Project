import React, {useContext} from 'react'

import styles from '../style';
import { UserContext } from '../App';

const Settings = () => {
  const {user, setUser} = useContext(UserContext);

  return (
      <section className="w-full overflow-hidden mt-[10px] m-auto w-[600px]">
          <form className="flex flex-col">

            <label className="mb-[10px]">Email</label>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="email" defaultValue={user.email}/>

            <label className="mb-[10px]">First Name</label>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="name" defaultValue={user.firstName}/>

            <label className="mb-[10px]">Last Name</label>
            <input className="w-full border-[1px] border-primary border-solid mb-[10px] px-[20px] py-[7px]" type="name" defaultValue={user.lastName}/>
            
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