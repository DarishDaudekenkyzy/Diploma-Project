import backIcon from '../../../assets/backIcon.svg';
import pen from '../../../assets/pen.svg';

import { useEffect, useState } from "react";
import { api_getFacultyById } from "../../../api/FacultyApi";

export default function AdminFacultyView({setViewFaculty, setEditFaculty, setSelectedFaculty, facultyId}) {
    const [faculty, setFaculty] = useState();
    
    useEffect(() => {
        loadFaculty(facultyId);
    }, [])

    async function loadFaculty(facultyId) {
        await api_getFacultyById(facultyId)
        .then(setFaculty)
        .catch(err => console.log(err))
    }
    return (
        <>
        {faculty &&
        <>
            <div className='flex flex-row items-center mb-6'>
                <div className='flex w-8 h-8 gap-1 relative' onClick={() => {
                    setViewFaculty(false)
                    setSelectedFaculty(null)
                    }}>
                <div className='w-full h-full flex items-end justify-center absolute cursor-pointer 
                hover:-translate-x-2 transition-transform'>
                    <img className='w-6' src={backIcon} alt='back'/>
                </div>
                </div>
                <p className='md:text-[35px]'>{faculty.facultyName} [{faculty.university.acronym}]</p>
            </div>

            <div className='mb-2 flex gap-2 items-center cursor-pointer hover:underline'
            onClick={() => {
            setViewFaculty(false);
            setEditFaculty(true);
            }}>
                <p className='text-lg'>Edit Information</p>
                <div className='relative'>
                    <img className='w-6 hover:-translate-y-1 transition-transform'
                    src={pen} alt='edit_img'/>
                </div>
            </div>

            {/* DESCRIPTION */}
            {faculty.description &&
            <div className='my-2'>
            <p className='font-semibold'>Description:</p>  
            <p className='text-sm'>{faculty.description}</p>
            </div>}

            {/* COURSES */}
            <>
            {faculty.courses && faculty.courses.length > 0 &&
            <div className='my-4'>
                <p className='text-lg font-semibold mb-2'>Courses ({faculty.courses.length})</p>
                <div className='border-2 overflow-scroll max-h-72 w-96'>
                    {faculty.courses.map((course, index) => {
                    return (
                        <div key={index} className={`py-2 px-4 ${index!==0 && 'border-t-2'}
                        flex gap-2`}>
                            <span className='font-semibold'>{course.courseCode}</span>
                            <span>{course.courseName}</span>
                        </div>
                    );
                    })}
                </div>
            </div>
            }
            </>

            {/* PROFESSORS */}
            <>
            {faculty.professors && faculty.professors.length > 0 &&
            <div className='my-4'>
                <p className='text-lg font-semibold mb-2'>Professors ({faculty.professors.length})</p>
                <div className='border-2 overflow-scroll max-h-72 w-96'>
                    {faculty.professors.map((professor, index) => {
                    return (
                        <div key={index} className={`py-2 px-4 ${index!==0 && 'border-t-2'}
                        flex gap-2`}>
                            <span className='font-semibold'>{professor.firstName} {professor.lastName}</span>
                            <span>{professor.email}</span>
                        </div>
                    );
                    })}
                </div>
            </div>
            }
            </>
        </>
        }
        </>
    );
}