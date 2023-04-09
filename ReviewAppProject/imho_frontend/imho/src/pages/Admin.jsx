import { useState, useContext } from 'react';

import { Header, Footer} from '../components';
import UniversityManagement from '../components/admin_components/university_management/UniversityManagement';
import FacultyManagement from '../components/admin_components/faculty_management/FacultyManagement';
import CourseManagement from '../components/admin_components/course_management/CourseManagement';
import ProfessorManagement from '../components/admin_components/professor_management/ProfessorManagement';
import UserManagement from '../components/admin_components/user_management/UserManagement';
import ReviewManagement from '../components/admin_components/review_management/ReviewManagement';

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
      <section className={`flex border-black  mt-[-2px] min-h-screen`}>
        <div className="flex flex-col w-1/5 py-24 px-8 border-black border-t-2 border-r-2 gap-y-2 items-start">
            <TabItem text="Review Management" isActive={activeTab === 1} setActive={() => activeIndex(1)}/>
            <TabItem text="User Management" isActive={activeTab === 2} setActive={() => activeIndex(2)}/>
            <TabItem text="Professor Management" isActive={activeTab === 3} setActive={() => activeIndex(3)}/>
            <TabItem text="Course Management" isActive={activeTab === 4} setActive={() => activeIndex(4)}/>
            <TabItem text="University Management" isActive={activeTab === 5} setActive={() => activeIndex(5)}/>
            <TabItem text="Faculty Management" isActive={activeTab === 6} setActive={() => activeIndex(6)}/>
        </div>
        <div className="w-[75%] py-[80px]">
            {activeTab === 1 && <ReviewManagement/>}
            {activeTab === 2 && <UserManagement />}
            {activeTab === 3 && <ProfessorManagement/>}
            {activeTab === 4 && <CourseManagement/>}
            {activeTab === 5 && <UniversityManagement/>}
            {activeTab === 6 && <FacultyManagement/>}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Admin;