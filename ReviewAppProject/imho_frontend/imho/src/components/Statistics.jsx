import React from 'react';
import styles from '../style';

import main_desc from '../assets/main_desc.png';

const Statistics = () => {
  return (
    <section className={`flex h-[700px] justify-center items-center pt-[80px]`}>
      <div class="mr-[80px]">
        <img class="img-responsive w-[300px]" src={main_desc} alt="main_desc"/>
      </div>
      <div className={`flex flex-col items-center w-[400px] ml-[80px]`}>
        <p className={`text-EC7467 text-[48px] font-[KumarOne] w-[400px]`}>80% of freshmen...</p>
        <p className={`w-[500px]`}>...struggle on the process of choosing subjects, teachers and clubs to join in our university. Students try to ask sophomores about it, but not every freshman has an older friend. Why are they so nervous about it? Because, the decision will affect their GPA or time quality. 
        </p>
        <button href="#" className="text-white mx-1 bg-EC7467 
        px-[30px] py-[5px] rounded-2xl mt-[20px]">Solution</button>
      </div>
    </section>
  )
}

export default Statistics