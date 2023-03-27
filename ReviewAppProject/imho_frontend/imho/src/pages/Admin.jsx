import { useState, useContext } from 'react';

import { Header, 
    Footer, 
    ReviewManagement,
    UserManagement,
    ProfessorManagement,
    CourseManagement,
    UniversityManagement } from '../components';

import styles from '../style';
import { UserContext } from '../App';

const TabItem = ({text, isActive, setActive}) => {
  const ifActive = 'font-bold';
  return (
    <button onClick={setActive}>
      <p className={`text-[16px] md:text-[20px] ${isActive ? `${ifActive}` : ""}`}>{text}</p>
    </button> 
  )
};

const Admin = () => {
  const {user, setUser} = useContext(UserContext);

  const [activeTab, setActiveTab] = useState(1);

  const activeIndex = (index) => {
    setActiveTab(index);
  }

  console.log(activeTab);
  return (
    <>
      <Header/>
      <section className={`flex border-black h-[750px] border-b-2 mt-[-2px]`}>
        <div className="flex flex-col h-full w-[25%] pt-[100px] border-black border-2 gap-y-2">
            <TabItem text="Review Management" isActive={activeTab === 1} setActive={() => activeIndex(1)}/>
            <TabItem text="User Management" isActive={activeTab === 2} setActive={() => activeIndex(2)}/>
            <TabItem text="Professor Management" isActive={activeTab === 3} setActive={() => activeIndex(3)}/>
            <TabItem text="Course Management" isActive={activeTab === 4} setActive={() => activeIndex(4)}/>
            <TabItem text="University Management" isActive={activeTab === 5} setActive={() => activeIndex(5)}/>
        </div>
        <div className="w-[75%] pt-[80px]">
            {activeTab === 1 && <ReviewManagement/>}
            {activeTab === 2 && <UserManagement />}
            {activeTab === 3 && <ProfessorManagement/>}
            {activeTab === 4 && <CourseManagement/>}
            {activeTab === 5 && <UniversityManagement/>}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Admin;