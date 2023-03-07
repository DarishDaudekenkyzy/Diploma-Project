import React from 'react';
import styles from '../style';

import desc1 from '../assets/desc1.png';
import desc2 from '../assets/desc2.png';
import desc3 from '../assets/desc3.png';

const Description = () => {
  return (
    <section className={`h-[600px] border-black border-b-2`}>
      <p className={`text-center text-[48px] font-[KumarOne] mt-[70px]
      mb-[80px]`}>Application where...</p>
      <div className="flex justify-center">
        <div className="w-[270px] mx-[20px]">
          <img src={desc1} className="h-[170px]" />
          <p className="mt-[50px] font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
        <div className="w-[270px] mx-[20px]">
          <img src={desc2} className="h-[170px]" />
          <p className="mt-[50px] font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
        <div className="w-[270px] mx-[20px]">
          <img src={desc3} className="h-[170px]" />
          <p className="mt-[50px] font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
      </div>
    </section>
  )
}

export default Description