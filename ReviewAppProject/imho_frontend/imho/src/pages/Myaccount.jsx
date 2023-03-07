import { useState, useContext } from 'react';

import { Header, Footer, Account, 
  Myreviews, Savedreviews, Settings } from '../components';

import styles from '../style';
import { UserContext } from '../App';


const Myaccount = () => {
  const {user, setUser} = useContext(UserContext);

  const [activeTab, setActiveTab] = useState(1);

  const activeIndex = (index) => {
    setActiveTab(index);
  }

console.log(activeTab);
  return (
    <>
      <Header/>
      <section id="myaccount" className={`border-black pt-[50px] h-[750px]
      border-b-2`}>
      <p className={`text-[48px] text-center mb-[50px]`}>*Name of the student*</p>
      <div className="form m-auto w-[700px] h-[500px] 
      bg-white px-[50px] py-[20px]">
        <div className="m-auto w-[600px] h-[50px] border-b-2 pb-[53px] flex justify-between">
          <button onClick={() => activeIndex(1)}>
            <p className={`text-[20px] ${((activeTab === 1) &&
             `font-bold border-black border-b-2 pb-[20px]`)}`}>Account</p>
          </button>
          <button onClick={() => activeIndex(2)}>
            <p className={`text-[20px] ${((activeTab === 2) &&
             `font-bold border-black border-b-2 pb-[20px]`)}`}>My reviews</p>
          </button>
          <button onClick={() => activeIndex(3)}>
            <p className={`text-[20px] ${((activeTab === 3) &&
             `font-bold border-black border-b-2 pb-[20px]`)}`}>Saved reviews</p>
          </button>
          <button onClick={() => activeIndex(4)}>
            <p className={`text-[20px] ${((activeTab === 4) &&
             `font-bold border-black border-b-2 pb-[20px]`)}`}>Settings</p>
          </button>
        </div>
        {activeTab === 1 && <Account/>}
        {activeTab === 2 && <Myreviews />}
        {activeTab === 3 && <Savedreviews/>}
        {activeTab === 4 && <Settings/>}
      </div>
      </section>
      <Footer />
    </>
  )
}

export default Myaccount;