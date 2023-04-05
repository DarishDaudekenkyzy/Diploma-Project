import backIcon from '../../../assets/backIcon.svg';

import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { api_updateUniversity } from '../../../api/UniversityApi';

export default function UniversityEdit({setSelectedUniversity, loadUniversities, setEditUniversity, university}) {
    const { register, watch,setError, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        name: university.name,
        acronym: university.acronym,
        description: university.description
      }
    });
  
    async function handleApplyChanges(data) {
      await api_updateUniversity(data)
      .then((data) => {
        console.log(data);
        setEditUniversity(false);
        setSelectedUniversity(null);
        loadUniversities();
      })
      .catch(err => console.log(err));
    }
  
    return (
      university &&
      <>
      <div className='flex flex-row items-center my-4'>
        <div 
        className='flex w-8 h-8 gap-1 relative cursor-pointer'
        onClick={() => {
        setSelectedUniversity(null);
        setEditUniversity(false);
        }}>
          <div className='w-full h-full flex items-end justify-center absolute 
          hover:-translate-x-2 transition-transform'>
            <img className='w-6' src={backIcon} alt='back'/>
          </div>
        </div>
        <p className='md:text-[35px]'>Editing <span className='font-light'>{university.name}</span></p>
      </div>

      <form onSubmit={handleSubmit(handleApplyChanges)}>
        {/* NAME */}
        <div className='my-4 flex flex-col'>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name"
          className='border-2 py-1 px-2 border-black max-w-lg'
          {...register('name')}/>
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
  
        <div>
          <button type="submit" 
          className='py-2 px-4 border-2 border-black 
          hover:bg-black hover:text-white hover:px-12 transition-all ease-linear '>Apply Changes</button>
        </div>
      </form>
      </>
    );
  }