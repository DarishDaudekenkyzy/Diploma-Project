import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { api_updateFaculty } from '../../../api/FacultyApi';

export default function AdminFacultyEdit({setEditFaculty, loadFaculties,setSelectedFaculty, faculty, uniId}) {
    const { register, watch,setError, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          facultyName: faculty.facultyName,
          description: faculty.description,
          universityId: uniId
        }
      });

    async function handleApplyChanges(data) {
        await api_updateFaculty(faculty.facultyId, data)
        .then(data => {
            console.log(data)
            setEditFaculty(false);
            setSelectedFaculty(null);
            loadFaculties();
        })
        .catch(err => console.log(err));
    }
    return (
        <form onSubmit={handleSubmit(handleApplyChanges)}>
            {/* NAME */}
            <div className='my-4 flex flex-col'>
                <label htmlFor="facultyName">Faculty Name: </label>
                <input type="text" name="facultyName"
                className='border-2 py-1 px-2 border-black max-w-lg'
                {...register('facultyName')}/>
                <ErrorMessage errors={errors} name='facultyName'
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
    );
}