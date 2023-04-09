import { useState, useEffect } from "react";

import AdminCourseView from './AdminCourseView';
import BackArrow from "../BackArrow";
import eye from '../../../assets/eye.svg';
import pen from '../../../assets/pen.svg';
import trash from '../../../assets/trash.svg';
import school from '../../../assets/school_icon.svg';
import { api_getFacultiesInUniversity } from '../../../api/FacultyApi';
import { api_DeleteCourse, api_getAllCoursesInUniversity, api_getCoursesInFaculty } from '../../../api/CourseApi';
import AddNewButton from "../AddNewButton";
import AdminCourseAdd from "./AdminCourseAdd";
import AdminSearchInput from "../AdminSearchInput";
import { api_searchUniversities } from "../../../api/UniversityApi";
import AdminCourseEdit from "./AdminCourseEdit";

export default function CourseManagement() {
    const [searchUniverstiesResults, setSearchUniverstiesResults] = useState([]);
    const [university, setUniversity] = useState();
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [viewCourse, setViewCourse] = useState(false);
    const [addingCourse, setAddingCourse] = useState(false);
    const [editingCourse, setEditingCourse] = useState(false);

    useEffect(() => {
        if(university) {
            loadFaculties();
            setCourses([])
        }
    }, [university])

    useEffect(() => {
        if(selectedFaculty !== null) {
            loadAllCoursesInFaculty();
        }
    }, [selectedFaculty])

    async function onSearchUniversities(searchInput) {
        if(searchInput === '') {
            setSearchUniverstiesResults([])
            return
        }
        await api_searchUniversities(searchInput)
        .then(setSearchUniverstiesResults)
        .catch(err => console.log(err));
    }

    async function loadFaculties() {
        await api_getFacultiesInUniversity(university.id)
        .then((data) => {
            console.log(data)
            setFaculties(data)
        })
        .catch(err => console.log(err))
    }

    async function loadAllCoursesInFaculty() {
        if(selectedFaculty !== null) {
            await api_getCoursesInFaculty(selectedFaculty.facultyId)
            .then(setCourses)
            .catch(err => console.log(err));
        }
    }

    
    async function handleDeleteCourse(course) {
        await api_DeleteCourse(course.courseId)
        .then(() => {
            loadAllCoursesInFaculty()
            loadFaculties()
        })
        .catch(err => console.log(err));
    }
    
    function handleViewCourse(course) {
        setSelectedCourse(course);
        setViewCourse(true);
        console.log(course)
    }

    function handleAddNewCourse() {
        setAddingCourse(true);
    }

    function handleEditCourse(course) {
        setEditingCourse(true)
        setSelectedCourse(course);
    }


    return (
        <div className="flex flex-col px-8">
            <p className={`md:text-[35px] mb-6`}>Course Management</p>
            {viewCourse && selectedCourse && 
            <>
            <BackArrow onBack={() => {setViewCourse(false); setSelectedCourse(null)}} text={selectedCourse.courseName}/>
            <AdminCourseView course={selectedCourse}/>
            </>}

            {editingCourse && selectedCourse &&
            <>
            <BackArrow onBack={() => {setEditingCourse(false); setSelectedCourse(null)}} 
            text={`Editing ${selectedCourse.courseName}`}/>
            <AdminCourseEdit course={selectedCourse} uniId={university.id}
            onEdit={() => {setEditingCourse(false); setSelectedCourse(null); loadAllCoursesInFaculty(); loadFaculties()}}/>
            </>
            }

            {addingCourse && selectedFaculty &&
            <>
            <BackArrow onBack={() => setAddingCourse(false)} text={`Add New Course in ${selectedFaculty.facultyName}`}/>
            <AdminCourseAdd faculty={selectedFaculty}
            onAdd={() => {setAddingCourse(false); loadAllCoursesInFaculty(); loadFaculties();}}/>
            </>
            }


            {!university && !viewCourse && !addingCourse && !selectedCourse &&
            <div className='my-2 max-w-xl'>
                <p className={`text-xl mb-6`}>Select University</p>
                <AdminSearchInput
                onChange={onSearchUniversities} placeholder={'Search Universities'}/>
                {searchUniverstiesResults.length > 0 &&
                    <div className="border border-black my-4">
                        {searchUniverstiesResults.map((uni, index) => {
                            return(
                                <div key={index} className={`py-2 px-4 ${index !== 0 && 'border-t'} border-black
                                flex gap-2 items-center hover:bg-gray-200 cursor-pointer`}
                                onClick={() => {setUniversity(uni); setSearchUniverstiesResults([])}}>
                                    <img className="h-6" src={school}/>
                                    {uni.name}
                                </div>
                            );
                        })}
                    </div>
                }
            </div>}

            {university && !viewCourse && !addingCourse && !selectedCourse &&
            <>
            <BackArrow onBack={() => {setUniversity(null); setSelectedFaculty(null)}} text={university.name}/>
                {/* FACULTIES */}
                <div>
                    {faculties && 
                    <div>
                        <p className='text-xl font-semibold'>Faculties</p>
                        {faculties.map((fac, index) => {
                            return (
                                <div key={index} onClick={() => setSelectedFaculty(fac)}
                                    className="flex gap-2 items-center border-black border-b-2 py-[10px]
                                    cursor-pointer hover:pl-4 transition-all">
                                    <p className="max-w-[40%]">{fac.facultyName}</p>
                                    <p>(Courses: {fac.coursesCount})</p> 
                                </div>
                            );
                        })}
                    </div>
                    }
                </div>

                {selectedFaculty &&
                    <div className='my-6'>
                        <p className='text-xl font-semibold mb-4'>
                            Courses in {selectedFaculty.facultyName} ({courses.length})</p>
                        <AddNewButton handleAdd={handleAddNewCourse} text={'Add New Course'}/>
                        {courses.length > 0 &&
                        <div className='mt-4'>
                            <table className='table-fixed w-full border-collapse'>
                                <thead>
                                    <tr className=''>
                                        <th className='py-2 w-16 text-start'>Code</th>
                                        <th className='py-2 text-start'>Name</th>
                                        <th className='py-2 text-start'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course, index) => {
                                        return <CourseListItemView key={index} course={course}
                                        handleViewCourse={handleViewCourse}
                                        handleEditCourse={handleEditCourse}
                                        handleDeleteCourse={handleDeleteCourse}/>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        }
                    </div>
                }
            </>}
        </div>
    );
}

function CourseListItemView({course, handleViewCourse, handleEditCourse, handleDeleteCourse}) {
    return(
        <tr className=''>
            <td className='py-3 font-semibold border-y border-gray-400'>{course.courseCode}</td>
            <td className='py-3 border-y border-gray-400'>{course.courseName}</td>
            <td className='py-3 border-y border-gray-400'>
                <div className='flex items-center gap-2'>
                    <img className='h-8 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={eye} alt="viewImg" onClick={() => handleViewCourse(course)}/>

                    <img className='h-8 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={pen} alt="penImg" onClick={() => handleEditCourse(course)}/>
                    <img className='h-6 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={trash} alt="trashImg" onClick={() => handleDeleteCourse(course)}/>
                </div>
            </td>
        </tr>
    );
}