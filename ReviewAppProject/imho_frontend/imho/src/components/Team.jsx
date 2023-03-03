import React from 'react';
import styles from '../style';

import empty_circle from '../assets/empty_circle.png';

const Team = () => { 
  return (
    <section className={``}>
      <p className={`text-EC7467 text-center text-[48px] font-[KumarOne] mt-[60px]
      mb-[80px]`}>About us</p>
      <div className="flex justify-center items-center">
        <div className={`flex flex-col items-center w-[150px] mx-[20px]`}>
          <img src={empty_circle} />
          <p className="w-[100px] font-medium text-center mt-[10px]">Aizharkyn Alipova</p>
        </div>
        <div className={`flex flex-col items-center w-[150px] mx-[20px]`}>
          <img src={empty_circle} />
          <p className="w-[100px] font-medium text-center mt-[10px]">Yerkenaz Yershege</p>
        </div>
        <div className={`flex flex-col items-center w-[150px] mx-[20px]`}>
          <img src={empty_circle} />
          <p className="w-[100px] font-medium text-center mt-[10px]">Darish Daudekenkyzy</p>
        </div>
        <div className={`flex flex-col items-center w-[150px] mx-[20px]`}>
          <img src={empty_circle} />
          <p className="w-[100px] font-medium text-center mt-[10px]">Rakhat Shalbuidakov</p>
        </div>
        <div className={`flex flex-col items-center w-[150px] mx-[20px]`}>
          <img src={empty_circle} />
          <p className="w-[100px] font-medium text-center mt-[10px]">Karina Kinazarova</p>
        </div>
      </div>
      <p  className="w-[700px] text-center mt-[50px] mx-auto mb-[100px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor. amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
    </section>
  )
}

export default Team 