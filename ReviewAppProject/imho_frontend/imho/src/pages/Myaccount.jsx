import { useState } from 'react';

import { Header, Footer, Account, 
  Myreviews, Savedreviews, Settings } from '../components';

import styles from '../style';


const Myaccount = () => {

const [activeTab, setActiveTab] = useState(1);

const activeIndex = (index) => {
  setActiveTab(index);
}

console.log(activeTab);
  return (
    <div className='w-full overflow-hidden'>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Header/>
        </div>
      </div>

      <section>
      <div className="form h-[800px] m-auto w-[600px]">
        <p className={`text-EC7467 text-[48px] font-[KumarOne] text-start mt-[40px]`}>*Name of the student*</p>
        <div className="m-auto w-[600px] h-[50px] border-b-2 mt-[50px] pb-[70px] flex justify-between">
          <button onClick={() => activeIndex(1)} 
          className={"text-[20px]" + (activeTab === 1 && "font-bold")}>Account</button>
          <button onClick={() => activeIndex(2)} 
          className={"text-[20px]" + (activeTab === 2 && "font-bold")}>My reviews</button>
          <button onClick={() => activeIndex(3)} 
          className={"text-[20px]" + (activeTab === 3 && "font-bold")}>Saved reviews</button>
          <button onClick={() => activeIndex(4)} 
          className={"text-[20px]" + (activeTab === 4 && "font-bold")}>Settings</button>
        </div>
        {activeTab === 1 && <Account/>}
        {activeTab === 2 && <Myreviews/>}
        {activeTab === 3 && <Savedreviews/>}
        {activeTab === 4 && <Settings/>}
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

export default Myaccount;