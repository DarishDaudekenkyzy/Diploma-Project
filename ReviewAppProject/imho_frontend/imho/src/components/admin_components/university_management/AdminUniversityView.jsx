import backIcon from '../../../assets/backIcon.svg';
import pen from '../../../assets/pen.svg';

import { useState, useEffect } from "react";
import { api_getUniversityById } from '../../../api/UniversityApi';

export default function UniversityView({setSelectedUniversity, setViewUniversity, setEditUniversity, uniId}) {
    const [university, setUniversity] = useState();
  
    useEffect(() => {
      loadUniversity(uniId);
    }, [])
  
    async function loadUniversity(uniId) {
      await api_getUniversityById(uniId)
      .then(data => {
        console.log(data);
        setUniversity(data);
      })
    }
  
    return (
      university && 
      <>
      {/* BACK BUTTON */}
      <div className='flex flex-row items-center my-4'>
        <div className='flex w-8 h-8 gap-1 relative'
          onClick={() => {
            setSelectedUniversity(false);
            setViewUniversity(false);
          }}>
          <div className='w-full h-full flex items-end justify-center absolute cursor-pointer 
          hover:-translate-x-2 transition-transform'>
            <img className='w-6' src={backIcon} alt='back'/>
          </div>
        </div>
        <p className='md:text-[35px]'>{university.name}</p>
      </div>
  
      <div className='mb-2 flex gap-2 items-center cursor-pointer hover:underline'
        onClick={() => {
          setViewUniversity(false);
          setEditUniversity(true);
        }}>
        <p className='text-lg'>Edit Information</p>
        <div className='relative'>
          <img className='w-6 hover:-translate-y-1 transition-transform'
          src={pen} alt='edit_img'/>
        </div>
      </div>
  
      {/* ACRONYM */}
      {university.acronym &&
      <div className='my-2'>
        <p>
        <span className='font-semibold'>Acronym: </span> 
        {university.acronym}</p>
      </div>}
  
      {/* DESCRIPTION */}
      {university.description &&
      <div className='my-2'>
        <p className='font-semibold'>Description:</p>  
        <p className='text-sm'>{university.description}</p>
      </div>}
        
      {/* FACULTIES */}
      <>
      {university.faculties && university.faculties.length > 0 &&
      <div className='my-4'>
        <p className='text-lg font-semibold'>Faculties</p>
        {university.faculties.map((faculty, index) => {
          return (
            <div key={index}>
              <p>{index+1} {faculty.facultyName}</p>
            </div>
          );
        })}
      </div>
      }
      </>
      </>
    );
  }