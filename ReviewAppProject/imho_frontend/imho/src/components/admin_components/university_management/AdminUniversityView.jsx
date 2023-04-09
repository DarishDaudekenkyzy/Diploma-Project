import backIcon from '../../../assets/backIcon.svg';
import pen from '../../../assets/pen.svg';

import { useState, useEffect } from "react";
import { api_getUniversityById } from '../../../api/UniversityApi';
import { api_getFacultiesInUniversity } from '../../../api/FacultyApi';

export default function UniversityView({uni, setViewUniversity, setEditUniversity}) {
    const [university, setUniversity] = useState();
    const [faculties, setFaculties] = useState([]);
  
    useEffect(() => {
      setUniversity(uni);
      loadFaculties(uni.id);
    }, [])
  
    async function loadFaculties(uniId) {
      await api_getFacultiesInUniversity(uniId)
      .then(data => {
        setFaculties(data);
      })
      .catch(err => console.log(err));
    }
  
    return (
      university && 
      <>
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
      {faculties.length > 0 &&
      <div className='my-4'>
        <p className='text-lg font-semibold'>Faculties</p>
        {faculties.map((faculty, index) => {
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