import React from 'react'

import styles from '../style';
import check from '../assets/check.svg';
import eye from '../assets/eye.svg';
import pen from '../assets/pen.svg';
import trash from '../assets/trash.svg';

const UserManagement = () => {
    return (
        <div className="flex flex-col items-center">
          <p className={`md:text-[35px] text-center mb-[50px]`}>User Management</p>
          <div className="w-[800px]">
              <div className="flex justify-around border-black border-b-2 pb-[20px]">
                  <p className="text-[25px] w-[25%] text-center">Name</p>
                  <p className="text-[25px] w-[25%] text-center">Surname</p>
                  <p className="text-[25px] w-[25%] text-center">Email</p>
                  <p className="text-[25px] w-[25%] text-center">Actions</p>
              </div>
              <div className="flex justify-around items-center border-black border-b-2 py-[10px]">
                  <p className="w-[25%] text-center">Yerkenaz</p>
                  <p className="w-[25%] text-center">Yershege</p>
                  <p className="w-[25%] text-center">erkenaz@gmail.com</p>
                  <div className="flex items-center w-[25%] justify-center">
                      <img className="h-[35px]" src={eye} alt="eye" />
                      <img className="h-[25px]" src={pen} alt="pen" />
                      <img className="h-[25px]" src={trash} alt="trash" />
                      <img className="h-[25px]" src={check} alt="check" />
                  </div>
              </div>
              <div className="flex justify-around items-center border-black border-b-2 py-[10px]">
                  <p className="w-[25%] text-center">Darish</p>
                  <p className="w-[25%] text-center">Daudekenkyzy</p>
                  <p className="w-[25%] text-center">darsh@com.kz</p>
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

export default UserManagement;