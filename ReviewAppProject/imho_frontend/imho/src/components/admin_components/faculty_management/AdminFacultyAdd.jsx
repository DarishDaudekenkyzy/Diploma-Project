import backIcon from '../../../assets/backIcon.svg';

import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { api_createFaculty } from '../../../api/FacultyApi';

export default function AdminFacultyAdd({setAddFaculty, loadFaculties, university}) {
    const { register, watch,setError, setValue, handleSubmit, formState: { errors } } = useForm();

    async function handleAddNewFaculty(data) {
        await api_createFaculty({
            facultyName: data.facultyName,
            description: data.description,
            universityId: university.id
        })
        .then((data) => {
            console.log(data)
            setAddFaculty(false);
            loadFaculties();
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <div className='flex flex-row items-center mb-6'>
            <div className='flex w-8 h-8 gap-1 relative' onClick={() => setAddFaculty(false)}>
            <div className='w-full h-full flex items-end justify-center absolute cursor-pointer 
            hover:-translate-x-2 transition-transform'>
                <img className='w-6' src={backIcon} alt='back'/>
            </div>
            </div>
            <p className='md:text-[35px]'>Add Faculty for {university.name}</p>
        </div>

        <form onSubmit={handleSubmit(handleAddNewFaculty)}>
        {/* NAME */}
        <div className='my-4 flex flex-col'>
          <label htmlFor="facultyName">Name: </label>
          <input type="text" name="facultyName"
          className='border-2 py-1 px-2 border-black max-w-lg'
          {...register('facultyName', {
            required: 'The Faculty name is required'
          })}/>
          <ErrorMessage errors={errors} name='facultyName'
          render={({ message }) => <p className="text-red-500">{message}</p>}/>
        </div>
  
        {/* DESCRIPTION */}
        <div className='my-4 flex flex-col'>
          <label htmlFor="name">Description: </label>
          <textarea type="text" name="description"
          className='border-2 py-1 px-2 border-black max-w-lg max-h-96 h-32'
          {...register('description')}/>
          <ErrorMessage errors={errors} name='description'
          render={({ message }) => <p className="text-red-500">{message}</p>}/>
        </div>
  
        {/* SUBMIT */}
        <div>
          <button type="submit"
          className='py-2 px-4 mt-6 border-2 border-black 
          hover:bg-black hover:text-white hover:px-12 hover:py-4 transition-all ease-linear '>
            Add New Faculty</button>
        </div>
      </form>
        </>
    );
}