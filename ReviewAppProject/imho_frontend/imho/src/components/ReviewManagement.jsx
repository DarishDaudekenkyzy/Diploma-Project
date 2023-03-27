import React from 'react'

import styles from '../style';
import check from '../assets/check.svg';
import eye from '../assets/eye.svg';
import pen from '../assets/pen.svg';
import trash from '../assets/trash.svg';

const ReviewManagement = () => {
  return (
      <div className="flex flex-col items-center">
        <p className={`md:text-[35px] text-center mb-[50px]`}>Review Management</p>
        <div className="w-[800px]">
            <div className="flex justify-around border-black border-b-2 pb-[20px]">
                <p className="text-[25px] w-[25%] text-center">Student</p>
                <p className="text-[25px] w-[25%] text-center">University</p>
                <p className="text-[25px] w-[25%] text-center">Status</p>
                <p className="text-[25px] w-[25%] text-center">Actions</p>
            </div>
            <div className="flex justify-around items-center border-black border-b-2 py-[10px]">
                <p className="w-[25%] text-center">Yerkenaz Yershege</p>
                <p className="w-[25%] text-center">Suleyman Demirel</p>
                <p className="w-[25%] text-center">Submitted</p>
                <div className="flex items-center w-[25%] justify-center">
                    <img className="h-[35px]" src={eye} alt="eye" />
                    <img className="h-[25px]" src={pen} alt="pen" />
                    <img className="h-[25px]" src={trash} alt="trash" />
                    <img className="h-[25px]" src={check} alt="check" />
                </div>
            </div>
            <div className="flex justify-around items-center border-black border-b-2 py-[10px]">
                <p className="w-[25%] text-center">Darish Daudekenkyzy</p>
                <p className="w-[25%] text-center">Nazarbayev</p>
                <p className="w-[25%] text-center">Active</p>
                <div className="flex items-center w-[25%] justify-center">
                    <img className="h-[35px]" src={eye} alt="eye" />
                    <img className="h-[25px]" src={pen} alt="pen" />
                    <img className="h-[25px]" src={trash} alt="trash" />
                    <img className="h-[25px]" src={check} alt="check" />
                </div>
            </div>
        </div>
      </div>
  )
}

export default ReviewManagement;