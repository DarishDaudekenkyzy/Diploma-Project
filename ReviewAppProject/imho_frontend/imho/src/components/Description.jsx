import React from 'react';
import styles from '../style';

import bulb  from '../assets/bulb.png';
import main_desc1 from '../assets/main_desc1.png';
import main_desc2 from '../assets/main_desc2.png';
import main_desc3 from '../assets/main_desc3.png';

const Description = () => {
  return (
    <section className={`bg-primary`}>
      <img  className={`absolute w-[100px] top-[-50px] left-[45%]`} src={bulb} />
      <p className={`text-white text-center text-[48px] font-[KumarOne] mt-[80px]
      mb-[40px]`}>Application where...</p>
      <div className="flex justify-center">
        <div className="w-[300px] mx-[20px]">
          <img src={main_desc1} />
          <p className="text-white mt-[20px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
        <div className="w-[300px] mx-[20px]">
          <img src={main_desc2} />
          <p className="text-white mt-[20px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
        <div className="w-[300px] mx-[20px]">
          <img src={main_desc3} />
          <p className="text-white mt-[20px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
      </div>
    </section>
  )
}

export default Description