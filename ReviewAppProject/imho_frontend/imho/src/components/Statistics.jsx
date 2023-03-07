import React from 'react';
import styles from '../style';

import statistics from '../assets/statistics.png';

const Statistics = () => {
  return (
    <section className={`flex justify-center items-center h-[500px] border-black border-b-2`}>
      <div class="flex justify-center items-center 
      w-1/2 bg-[#F3BC2C] h-full border-black border-r-2">
        <img class="img-responsive w-[400px]" src={statistics} alt="statistics"/>
      </div>
      <div className={`w-1/2 flex flex-col items-center h-full`}>
        <p className={`text-[48px] font-[KumarOne] w-[400px] mt-20 font-bold`}>
        80% of freshmen...</p>
        <p className={`w-[400px] text-[20px]`}>...struggle on the process of choosing subjects, teachers and clubs to join in our university. Students try to ask sophomores about it, but not every freshman has an older friend. Why are they so nervous about it? Because, the decision will affect their GPA or time quality. 
        </p>
        <button href="#" className="text-white bg-black 
        px-[40px] py-[10px] mt-[20px]">Solution</button>
      </div>
    </section>
  )
}

export default Statistics