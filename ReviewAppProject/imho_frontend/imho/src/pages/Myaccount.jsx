import { useState, useContext, useEffect } from 'react';

import { Header, Footer, Account, 
  Myreviews, Savedreviews, Settings } from '../components';

import styles from '../style';
import { UserContext } from '../App';
import { useLocation } from 'react-router-dom';

const TabItem = ({text, isActive, setActive}) => {
  const ifActive = 'font-bold border-black border-b-2 pb-[20px]';
  return (
    <button onClick={setActive} className='w-1/4'>
      <p className={`text-[16px] md:text-[20px] ${isActive ? `${ifActive}` : ""}`}>{text}</p>
    </button> 
  )
};

const Myaccount = () => {
  const {user, setUser} = useContext(UserContext);
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(1);

  const activeIndex = (index) => {
    setActiveTab(index);
  }

  useEffect(() => {
    if(location.state) {
      setActiveTab(location.state)
    }
  }, [location.state])

  console.log(activeTab);
  return (
    <>
      <Header/>
      {user &&
      <section id="myaccount" className={`border-black pt-[50px] 
      border-b-2`}>
      <p className={`text-[24px] md:text-[48px] text-center mb-[50px]`}>{user.firstName} {user.lastName}</p>
      <div className="form mx-auto my-16 max-w-[800px] bg-white px-[16px] sm:px-[50px] py-[20px]">
        <div className="m-auto h-[50px] border-b-2 pb-[20px] md:pb-[53px] flex justify-between">
          <TabItem text="Account" isActive={activeTab === 1} setActive={() => activeIndex(1)}/>
          <TabItem text="My reviews" isActive={activeTab === 2} setActive={() => activeIndex(2)}/>
          <TabItem text="Saved reviews" isActive={activeTab === 3} setActive={() => activeIndex(3)}/>
          <TabItem text="Settings" isActive={activeTab === 4} setActive={() => activeIndex(4)}/>
        </div>
        
        {activeTab === 1 && <Account/>}
        {activeTab === 2 && <Myreviews />}
        {activeTab === 3 && <Savedreviews/>}
        {activeTab === 4 && <Settings/>}
      </div>
      </section>
      }
      <Footer />
    </>
  )
}

export default Myaccount;