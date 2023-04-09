import backIcon from '../../../assets/backIcon.svg';

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { api_addUniversity } from '../../../api/UniversityApi';

export default function AdminUniversityAdd({setAddUniversity, loadUniversities}) {
    const { register, watch,setError, setValue, handleSubmit, formState: { errors } } = useForm();
  
    async function handleAddNewUniversity(data) { 
      await api_addUniversity(data)
      .then((data) => {
        console.log(data)
        setAddUniversity(false);
        loadUniversities();
      })
      .catch(err => console.log(err));
    }

    return (
      <>
      
      {/* BACK BUTTON */}
      <div className='flex flex-row items-center mb-4'>
        <div className='flex w-8 h-8 gap-1 relative cursor-pointer' onClick={() => setAddUniversity(false)}>
          <div className='w-full h-full flex items-end justify-center absolute 
          hover:-translate-x-2 transition-transform'>
            <img className='w-6' src={backIcon} alt='back'/>
          </div>
        </div>
        <p className='md:text-[35px]'>Add University</p>
      </div>
  
      <form onSubmit={handleSubmit(handleAddNewUniversity)}>
        {/* NAME */}
        <div className='my-4 flex flex-col'>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name"
          className='border-2 py-1 px-2 border-black max-w-lg'
          {...register('name', {
            required: 'The university name is required'
          })}/>
          <ErrorMessage errors={errors} name='name'
          render={({ message }) => <p className="text-red-500">{message}</p>}/>
        </div>
  
        {/* ACRONYM */}
        <div className='my-4 flex flex-col'>
          <label htmlFor="name">Acronym: </label>
          <input type="text" name="acronym" maxLength={5} 
          className='border-2 py-1 px-2 border-black max-w-lg'
          {...register('acronym')}/>
          <ErrorMessage errors={errors} name='acronym'
          render={({ message }) => <p className="text-red-500">{message}</p>}/>
        </div>
  
        {/* DESCRIPTION */}
        <div className='my-4 flex flex-col'>
          <label htmlFor="name">Description: </label>
          <textarea type="text" name="description"
          className='border-2 py-1 px-2 border-black max-w-lg max-h-96 h-64'
          {...register('description')}/>
          <ErrorMessage errors={errors} name='description'
          render={({ message }) => <p className="text-red-500">{message}</p>}/>
        </div>
  
        {/* SUBMIT */}
        <div>
          <button type="submit"
          className='py-2 px-4 mt-6 border-2 border-black 
          hover:bg-black hover:text-white hover:px-12 hover:py-4 transition-all ease-linear '>Add New University</button>
        </div>
      </form>
      </>
    );
  }