import { useEffect, useState } from "react";
import { api_getProfessorsInCourse, api_getProfessorsInFaculty, api_searchProfessorsInFaculty, api_searchProfessorsInUniversity } from "../../../api/ProfessorsApi";
import AddNewButton from "../AddNewButton";
import AsminSearchProfessorsInput from "../AdminSearchProfessorsInput";
import BackArrow from "../BackArrow";
import { api_addProfessorToTheCourse } from "../../../api/CourseApi";

export default function AdminCourseView({course}) {
    const [professors, setProfessors] = useState([]);
    const [addingProfessor, setAddingProfessor] = useState(false);
    
    useEffect(() => {
        loadProfessors();
    }, [])

    async function loadProfessors() {
        await api_getProfessorsInCourse(course.courseId)
        .then(setProfessors)
        .catch(err => console.log(err));
    }

    return (
        <>
        <div className=''>
            {addingProfessor ?
            <AddProfessorToCourseView course={course} professors={professors} 
            setAddingProfessor={setAddingProfessor} loadProfessors={loadProfessors}/>
            :
            <>

            <div className="my-2">
                <p className="text-lg">
                    <span className="font-semibold">Faculty: </span>
                    {course.facultyName}
                </p>
            </div>

            <p className='text-lg font-semibold my-2'>Professors ({professors.length})</p>
            {professors.length > 0 &&
            <div className='mt-2 mb-4 border-2 overflow-scroll max-h-72 w-96'>
                {professors.map((professor, index) => {
                return (
                    <div key={index} className={`py-2 px-4 ${index!==0 && 'border-t-2'}
                    flex gap-2`}>
                        <span className='font-semibold'>{professor.firstName} {professor.lastName}</span>
                        <span>{professor.email}</span>
                    </div>
                );
                })}
            </div>}
            <AddNewButton handleAdd={() => setAddingProfessor(true)} text='Add new Professor'/>
            </>
            }

        </div>
        
        </>
    );
}

function AddProfessorToCourseView({course, professors, setAddingProfessor, loadProfessors}) {
    const [searchProfessorsResults, setSearchProfessorsResults] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(null);

    useEffect(() => {
        loadProfessorsInFaculty()
    }, [])

    async function loadProfessorsInFaculty() {
        await api_getProfessorsInFaculty(course.facultyId)
        .then((data) => {
            setSearchProfessorsResults(data.filter((proff) => {
                return !professors.some(p => p.professorId === proff.professorId)
            }))
        })
        .catch(err => console.log(err));
    }

    async function searchProfessorsNotInCourse(searchInput) {
        setSelectedProfessor(null)
        if(searchInput !== undefined && searchInput.trim().length !== 0) {
            await api_searchProfessorsInFaculty(course.facultyId, searchInput)
            .then((data) => {
                setSearchProfessorsResults(data.filter((proff) => {
                    return !professors.some(p => p.professorId === proff.professorId)
                }))
                console.log(data)
            })
            .catch(err => console.log(err));
        } else {
            loadProfessorsInFaculty();
        }
    }

    async function addProfessorToTheCourse(professor) {
        await api_addProfessorToTheCourse(course.courseId, professor.professorId)
        .then((data) => {
            setSelectedProfessor(null)
            setAddingProfessor(false)
            loadProfessors()
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="max-w-lg">
            <div className="my-2">
                <p className="text-lg">
                    <span className="font-semibold">Add New Professor</span>
                </p>
            </div>

            <div className="flex gap-2 ">
                
                <AsminSearchProfessorsInput
                onChange={(searchInput) => searchProfessorsNotInCourse(searchInput)}
                onSearch={(searchInput) => searchProfessorsNotInCourse(searchInput)} />
                <button className="py-1 px-4 border border-black hover:bg-black hover:text-white shadow
                transition-colors"
                onClick={() => setAddingProfessor(false)}>
                    Cancel
                </button>
            </div>

            {searchProfessorsResults.length > 0 && !selectedProfessor &&
            <div className="mb-4 mt-2 border border-collapse border-black">
                {searchProfessorsResults.map((professor, index) => {
                    return (
                        <div key={index} onClick={() => setSelectedProfessor(professor)}
                        className={`py-2 px-2 ${index !== 0 && 'border-t'} border-black
                        hover:bg-gray-200 cursor-pointer`}>
                            {professor.firstName} {professor.lastName}
                        </div>
                    );
                })}
            </div>
            }

            {selectedProfessor &&
            <div className="py-4 px-4 my-6 border border-black shadow">
                <div className="flex gap-4 mb-4">
                    <p>{selectedProfessor.firstName} {selectedProfessor.lastName}</p>
                    <p className="text-gray-500">{selectedProfessor.email}</p>
                </div>
                <div className="flex gap-4 justify-end">
                    <button className="py-1 px-4 border border-black
                    hover:bg-black hover:text-white transition-colors"
                    onClick={() => addProfessorToTheCourse(selectedProfessor)}>Add</button>
                    <button className="py-1 px-4 border border-black
                    hover:bg-black hover:text-white transition-colors"
                    onClick={() => setSelectedProfessor(null)}>Cancel</button>
                </div>
            </div>
            }
        </div>
    );
}