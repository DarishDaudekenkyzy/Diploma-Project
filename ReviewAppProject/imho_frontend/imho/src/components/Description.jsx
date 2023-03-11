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
          <p className="py-[50px] font-medium text-[16px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
        <div className="grow px-[20px]">
          <img src={desc2} className="m-auto h-[170px]" />
          <p className="py-[50px] font-medium text-[16px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
        <div className="grow px-[20px]">
          <img src={desc3} className="m-auto h-[170px]" />
          <p className="py-[50px] font-medium text-[16px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
      </div>
    </section>
  )
}

export default Description