import React from 'react';
import styles from '../style';

import statistics from '../assets/statistics.png';

const Statistics = () => {
  return (
    <section className={`flex flex-col sm:flex-row justify-center items-stretch md:min-h-[500px] border-black border-b-2`}>
      <div className="flex justify-center items-center 
      sm:w-1/2 bg-[#F3BC2C] p-[16px] border-black border-b-2 sm:border-b-0 sm:border-r-2">
        <img className="img-responsive w-[400px]" src={statistics} alt="statistics"/>
      </div>
      <div className={`sm:w-1/2 flex flex-col items-center h-full px-[16px] py-20`}>
        <p className={`text-[24px] md:text-[48px] font-[KumarOne] md:w-[400px] font-bold`}>
        80% of freshmen...</p>
        <p className={`md:w-[400px] text-[16px] md:text-[20px]`}>...struggle on the process of choosing subjects, teachers and clubs to join in our university. Students try to ask sophomores about it, but not every freshman has an older friend. Why are they so nervous about it? Because, the decision will affect their GPA or time quality. 
        </p>
        <button href="#" className="text-white bg-black 
        px-[40px] py-[10px] mt-[20px] text-[16px] md:text-[20px]">Solution</button>
      </div>
    </section>
  )
}

export default Statistics