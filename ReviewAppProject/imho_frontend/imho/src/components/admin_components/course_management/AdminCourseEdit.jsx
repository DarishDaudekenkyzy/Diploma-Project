import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from "react";
import { api_getFacultiesInUniversity } from "../../../api/FacultyApi";
import { api_UpdateCourse } from "../../../api/CourseApi";

export default function AdminCourseEdit({course, onEdit,uniId, loadFaculties}) {
    const [faculties, setFaculties] = useState([]);
    const { register, watch,setError, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            'facultyId': course.facultyId,
            'courseName': course.courseName,
            'courseCode': course.courseCode,
            'courseDescription': course.courseDescription
        }
      });

    const watchFaculty = watch('facultyId')

    useEffect(() => {
        getFaculties();
        console.log(course)
    }, [])

    async function getFaculties() {
        await api_getFacultiesInUniversity(uniId)
        .then(setFaculties)
        .catch(err => console.log(err));
    }

    async function handleApplyChanges(data) {
        console.log(data);
        await api_UpdateCourse(course.courseId, data)
        .then((data) => {
            onEdit()
        })
        .catch((err) => {
            console.log(err.response)
            if(err.response.data === 'Course with provided Code already exists')
                setError('courseCode', { type: 'custom', message: 'Course with provided Code already exists' });
        })
    }

    return (
        <form onSubmit={handleSubmit(handleApplyChanges)}>
            {/* NAME */}
            <div className='my-4 flex flex-col gap-2'>
                <label htmlFor="courseName">Course Name: </label>
                <input type="text" name="courseName"
                className='border-2 py-1 px-2 border-black max-w-lg'
                {...register('courseName',{required: 'Course Name is Required'})}/>
                <ErrorMessage errors={errors} name='courseName'
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            {/* CourseCode */}
            <div className='my-4 flex flex-col gap-2'>
                <label htmlFor="courseCode">Course Code: </label>
                <input type="text" name="courseCode"
                className='border-2 py-1 px-2 border-black max-w-lg'
                {...register('courseCode',{required: 'Course Code is Required'})}/>
                <ErrorMessage errors={errors} name='courseCode'
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>
    
            {/* DESCRIPTION */}
            <div className='my-4 flex flex-col gap-2'>
                <label htmlFor="courseDescription">Description: </label>
                <textarea type="text" name="courseDescription"
                className='border-2 py-1 px-2 border-black max-w-lg max-h-96 h-32'
                {...register('courseDescription')}/>
                <ErrorMessage errors={errors} name='courseDescription'
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            {/*CHANGE FACULTY*/}
            <div className='my-4 flex flex-col gap-2'>
                <label htmlFor="courseDescription">Change Faculty: </label>

                <select value={watchFaculty}
                className="py-2 px-2 max-w-lg border border-black" {...register('facultyId')}>
                    {faculties.map((fac, index) => {
                        return (
                            <option key={index} value={fac.facultyId}>{fac.facultyName}</option>
                        );
                    })}
                </select>
                <ErrorMessage errors={errors} name='courseDescription'
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