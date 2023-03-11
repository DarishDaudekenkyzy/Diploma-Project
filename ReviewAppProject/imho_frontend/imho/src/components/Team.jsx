import React from 'react';
import styles from '../style';

import empty_circle from '../assets/empty_circle.png';

const TeamMember = ({name}) => {
  return (
    <div className={`flex flex-col items-center w-[150px] mx-[20px]`}>
      <img src={empty_circle} className="aspect-square" />
      <p className="w-[100px] text-white font-medium text-center mt-[10px] text-[14px] sm:text-[16px]">{name}</p>
    </div>
  )
}

const Team = () => { 
  return (
    <section className={`md:h-[700px] border-black border-b-2 bg-[#1D1D1D]`}>
      <p className={`text-center text-white text-[24px] sm:text-[48px] font-[KumarOne] pt-[60px]
      mb-[80px]`}>About us</p>
      <div className="flex flex-wrap gap-[24px] justify-center items-center">
        <TeamMember name="Aizharkyn Alipova" />
        <TeamMember name="Yerkenaz Yershege" />
        <TeamMember name="Darish Daudekenkyzy" />
        <TeamMember name="Rakhat Shalbuidakov" />
        <TeamMember name="Karina Kinazarova" />
      </div>
      <p  className="max-w-[700px] px-[20px] text-white text-center mt-[50px] mx-auto mb-[100px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor. amet, consectetur adipiscing elit. Aenean gravida consequat tortor. Sed ipsum odio, sodales eu condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
    </section>
  )
}

export default Team 