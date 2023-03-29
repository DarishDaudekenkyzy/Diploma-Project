import React from 'react';
import styles from '../style';

import desc1 from '../assets/desc1.png';
import desc2 from '../assets/desc2.png';
import desc3 from '../assets/desc3.png';

const Description = () => {
  return (
    <section className={`border-black border-b-2`}>
      <p className={`text-center text-[24px] md:text-[48px] font-[KumarOne] mt-[32px] md:mt-[70px]
      mb-[36px] md:mb-[80px]`}>Application where...</p>
      <div className="flex flex-col sm:flex-row justify-center gap-x-[20px] md:gap-x-[60px] md:px-[160px] pb-[36px] sm:pb-[64px]">
        <div className="grow px-[20px]">
          <img src={desc1} className="m-auto h-[170px]" />
          <p className="py-[50px] font-medium text-[16px]">The website provides a platform where students can leave reviews and ratings for their teachers. Students can rate their teachers based on various criteria such as course content, teaching style and overall effectiveness.</p>
        </div>
        <div className="grow px-[20px]">
          <img src={desc2} className="m-auto h-[170px]" />
          <p className="py-[50px] font-medium text-[16px]">IMHO is designed to help students choose the best teachers for their courses based on the experiences of other students. This allows students to make informed decisions when choosing their courses and teachers.</p>
        </div>
        <div className="grow px-[20px]">
          <img src={desc3} className="m-auto h-[170px]" />
          <p className="py-[50px] font-medium text-[16px]">IMHO can also help teachers to improve by providing them with feedback from their students. By reading reviews and ratings, teachers can learn what their students appreciate and provide a better learning experience for their students.</p>
        </div>
      </div>
    </section>
  )
}

export default Description