import { useState, useEffect } from "react";
import { api_searchUniversities } from "../../../api/UniversityApi";
import { api_getFacultiesInUniversity } from "../../../api/FacultyApi";
import BackArrow from "../BackArrow";
import eye from '../../../assets/eye.svg';
import pen from '../../../assets/pen.svg';
import trash from '../../../assets/trash.svg';
import school from '../../../assets/school_icon.svg';
import { api_deleteProfessor, api_getProfessorsInFaculty } from "../../../api/ProfessorsApi";
import AddNewButton from "../AddNewButton";
import AdminProfessorView from "./AdminProfessorView";
import AdminProfessorAdd from "./AdminProfessorAdd";
import AdminProfessorEdit from "./AdminProfessorEdit";
import AdminSearchInput from "../AdminSearchInput";

export default function ProfessorManagement() {
    const [university, setUniversity] = useState(null);
    const [faculty, setFaculty] = useState(null);
    const [professor, setProfessor] = useState(null);

    const [universities, setUniversities] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [professors, setProfessors] = useState([]);

    const [viewProfessor, setViewProfessor] = useState(false);
    const [editProfessor, setEditProfessor] = useState(false);
    const [addProfessor, setAddProfessor] = useState(false);

    useEffect(() => {
        if(university) {
            loadFaculties();
            setProfessors([]);
            setFaculty(null)
        }
    }, [university])

    useEffect(() => {
        if(faculty !== null) {
            loadAllProfessorsInFaculty();
        }
    }, [faculty])
    
    async function onSearchUniversities(searchInput) {
        await api_searchUniversities(searchInput)
        .then(setUniversities)
        .catch(err => console.log(err));
    }

    async function loadFaculties() {
        await api_getFacultiesInUniversity(university.id)
        .then((data) => {
            setFaculties(data)
        })
        .catch(err => console.log(err))
    }

    async function loadAllProfessorsInFaculty() {
        await api_getProfessorsInFaculty(faculty.facultyId)
        .then((data) => {
            console.log(data)
            setProfessors(data)
        })
        .catch(err => console.log(err));
    }

    async function handleDeleteProfessor(professorId) {
        await api_deleteProfessor(professorId)
        .then(loadAllProfessorsInFaculty)
        .catch(err => console.log(err));
    }

    return (
        <div className="flex flex-col px-8">
            <p className={`md:text-[35px] mb-6`}>Professor Management</p>

            {professor && viewProfessor &&
            <>
            <BackArrow onBack={() => {setProfessor(null); setViewProfessor(false);}} 
            text={`${professor.firstName} ${professor.lastName}`}/>
            <AdminProfessorView professor={professor} university={university} faculty={faculty}/>
            </>}

            {professor && editProfessor &&
            <>
            <BackArrow onBack={() => {setProfessor(null); setEditProfessor(false);}} 
            text={`Editing Professor: ${professor.firstName} ${professor.lastName}`}/>
            <AdminProfessorEdit professor={professor} 
            onEdit={() => {setEditProfessor(false); setProfessor(null); loadAllProfessorsInFaculty()}}/>
            </>}

            {addProfessor && faculty &&
            <>
            <BackArrow onBack={() => {setAddProfessor(false);}} 
            text={`Add New Professor to ${faculty.facultyName}`}/>
            <AdminProfessorAdd faculty={faculty} 
            onAdd={() => {setAddProfessor(false); loadAllProfessorsInFaculty()}}/>
            </>}
            
            {!university &&
                <div className='my-2 max-w-xl'>
                <p className={`text-xl mb-6`}>Select University</p>
                <AdminSearchInput
                onChange={onSearchUniversities} placeholder={'Search Universities'}/>
                {universities.length > 0 &&
                    <div className="border border-black my-4">
                        {universities.map((uni, index) => {
                            return(
                                <div key={index} className={`py-2 px-4 ${index !== 0 && 'border-t'} border-black
                                flex gap-2 items-center hover:bg-gray-200 cursor-pointer`}
                                onClick={() => {setUniversity(uni); setUniversities([])}}>
                                    <img className="h-6" src={school}/>
                                    {uni.name}
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
            }

            {university && !viewProfessor && !addProfessor && !editProfessor &&
                <>
                <BackArrow onBack={() => {setUniversity(null); setFaculty(null)}} text={university.name}/>
                <div>
                    {faculties && 
                    <div>
                        <p className='text-xl font-semibold mb-2'>Faculties</p>
                        {faculties.map((fac, index) => {
                            return (
                                <div key={index} onClick={() => setFaculty(fac)}
                                    className={`flex gap-2 items-center border-black border-b-2 py-[10px] px-4
                                    cursor-pointer hover:pl-8 transition-all
                                    ${faculty && faculty === fac && 'font-semibold bg-gray-100'}
                                    `}>
                                    <p className="max-w-[40%]">{fac.facultyName}</p>
                                </div>
                            );
                        })}
                    </div>
                    }
                </div>
                </>
            }

            {faculty && !viewProfessor && !addProfessor && !editProfessor &&
                <>
                <div className='my-6'>
                    <p className='text-xl font-semibold mb-4'>
                        Professors in {faculty.facultyName}</p>
                    <AddNewButton handleAdd={() => {setAddProfessor(true)}} text='Add New Professor'/>
                    {professors.length > 0 &&
                    <div className='mt-4'>
                        <table className='table-fixed w-full border-collapse'>
                            <thead>
                                <tr className=''>
                                    <th className='py-2 text-start'>Name</th>
                                    <th className='py-2 text-start'>Email</th>
                                    <th className='py-2 text-start'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.map((professor, index) => {
                                    return <ProfessorListItemView key={index} professor={professor}
                                    handleViewProfessor={() => {setViewProfessor(true); setProfessor(professor)}}
                                    handleEditProfessor={() => {setEditProfessor(true); setProfessor(professor)}}
                                    handleDeleteProfessor={() => {handleDeleteProfessor(professor.professorId)}}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
                </>
            }
        </div>
    );
}

function ProfessorListItemView({professor, handleViewProfessor, handleEditProfessor, handleDeleteProfessor}) {
    return(
        <tr className=''>
            <td className='py-3 border-y border-gray-400'>{professor.firstName} {professor.lastName}</td>
            <td className='py-3 border-y border-gray-400'>{professor.email}</td>
            <td className='py-3 border-y border-gray-400'>
                <div className='flex items-center gap-2'>
                    <img className='h-8 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={eye} alt="viewImg" onClick={() => handleViewProfessor(professor)}/>

                    <img className='h-8 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={pen} alt="penImg" onClick={() => handleEditProfessor(professor)}/>
                    <img className='h-6 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={trash} alt="trashImg" onClick={() => handleDeleteProfessor(professor)}/>
                </div>
            </td>
        </tr>
    );
}