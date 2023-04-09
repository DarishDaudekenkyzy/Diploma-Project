import pen from '../../../assets/pen.svg';

import { useEffect, useState } from "react";
import { api_getFacultyById } from "../../../api/FacultyApi";
import { api_getCoursesInFaculty } from '../../../api/CourseApi';
import { api_getProfessorsInFaculty } from '../../../api/ProfessorsApi';

export default function AdminFacultyView({setViewFaculty, setEditFaculty, fac}) {
    const [faculty, setFaculty] = useState();
    const [courses, setCourses] = useState([]);
    const [professors, setProfessors] = useState([]);
    
    useEffect(() => {
        setFaculty(fac);
        loadCourses(fac.facultyId);
        loadProfessors(fac.facultyId)
    }, [])

    async function loadCourses(facultyId) {
        await api_getCoursesInFaculty(facultyId)
        .then(setCourses)
        .catch(err => console.log(err))
    }

    async function loadProfessors(facultyId) {
        await api_getProfessorsInFaculty(facultyId)
        .then(setProfessors)
        .catch(err => console.log(err));
    }
    return (
        <>
        {faculty &&
        <>
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
            {courses.length > 0 &&
            <div className='my-4'>
                <p className='text-lg font-semibold mb-2'>Courses ({courses.length})</p>
                <div className='border-2 overflow-scroll max-h-72 w-96'>
                    {courses.map((course, index) => {
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
            {professors.length > 0 &&
            <div className='my-4'>
                <p className='text-lg font-semibold mb-2'>Professors ({professors.length})</p>
                <div className='border-2 overflow-scroll max-h-72 w-96'>
                    {professors.map((professor, index) => {
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