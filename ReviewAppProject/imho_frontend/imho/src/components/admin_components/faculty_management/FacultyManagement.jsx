import { useEffect, useState } from 'react';
import plusIcon from '../../../assets/plusIcon.svg';
import eye from '../../../assets/eye.svg';
import pen from '../../../assets/pen.svg';
import trash from '../../../assets/trash.svg';
import SearchUniversitiesInput from '../../SearchUniversitiesInput';
import { api_deleteFaculty, api_getFacultiesInUniversity } from '../../../api/FacultyApi';
import AdminFacultyAdd from './AdminFacultyAdd';
import AdminFacultyView from './AdminFacultyView';
import AdminFacultyEdit from './AdminFacultyEdit';

export default function FacultyManagement() {
    const [loading, setLoading] = useState(false);
    const [university, setUniversity] = useState();
    const [faculties, setFaculties] = useState();

    const [selectedFaculty, setSelectedFaculty] = useState();
    
    const [viewFaculty, setViewFaculty] = useState(false);
    const [editFaculty, setEditFaculty] = useState(false);
    const [addFaculty, setAddFaculty] = useState(false);

    useEffect(() => {
        if(university) {
            loadFaculties();
        }
    }, [university])

    async function loadFaculties() {
        setLoading(true);
        await api_getFacultiesInUniversity(university.id)
        .then((data) => {
            setFaculties(data)
            console.log(data);
        })
        .catch(err => console.log(err))
        setLoading(false);
    }

    function onUniversitySelect(uni) {
        console.log(uni);
        setUniversity(uni);
    }

    async function deleteFaculty(id) {
        await api_deleteFaculty(id)
        .then(loadFaculties)
        .catch(err => console.log(err))
    }

    return (
        <div className="flex flex-col px-8">
        {selectedFaculty ?
        <>
            {viewFaculty && <AdminFacultyView 
            setViewFaculty={setViewFaculty} setSelectedFaculty={setSelectedFaculty}
            setEditFaculty={setEditFaculty}
            facultyId={selectedFaculty.facultyId}/>}
            {editFaculty && <AdminFacultyEdit
            setEditFaculty={setEditFaculty} setSelectedFaculty={setSelectedFaculty}
            faculty={selectedFaculty} uniId={university.id}/>}
        </>
        :
        addFaculty ? 
        <>
        <AdminFacultyAdd loadFaculties={loadFaculties}
        setAddFaculty={setAddFaculty} university={university}/>
        </>
        :
        <>
        <p className={`md:text-[35px] mb-6`}>Faculty Management</p>
        <div className='my-2'>
            <SearchUniversitiesInput
            onSelect={onUniversitySelect}/>
        </div>

        {university &&
        <div className='mt-6'>
            <p className='text-xl mb-4'>Faculties in 
                <span className='font-semibold'> {university.name}</span>
            </p>
            <div>
                <div className='w-fit flex h-4 gap-2 items-center cursor-pointer
                hover:h-6 hover:text-lg transition-all'
                onClick={() => setAddFaculty(true)}>
                    <img className='h-full' src={plusIcon} alt='plusIcon'/>
                    <p className='font-semibold'>Add new Faculty</p>
                </div>
            </div>
        </div>
        }

        {loading && 
            <div>
                <p>Loading...</p> 
            </div>
        }

        {faculties &&
          <div className="w-[800px] my-6">
              <div className="flex justify-between border-black border-b-2 pb-[15px]">
                  <p className="text-lg w-[25%] font-semibold">Faculty Name</p>
                  <p className="text-lg w-[25%] text-center font-semibold">Actions</p>
              </div>
              {faculties.map((faculty, index) => {
                return (
                    <div key={index}
                    className="flex justify-between items-center border-black border-b-2 py-[10px]">
                        <p className="max-w-[40%]">{faculty.facultyName}</p>
                        <div className="flex items-center w-[25%] justify-center gap-1">
                            <img onClick={() => {
                                setSelectedFaculty(faculty)
                                setViewFaculty(true)}}
                            className="h-[35px] cursor-pointer" src={eye} alt="eye" />
                            <img onClick={() => {
                                setSelectedFaculty(faculty)
                                setEditFaculty(true)}}
                            className="h-[25px] cursor-pointer" src={pen} alt="pen" />
                            <img onClick={() => deleteFaculty(faculty.facultyId)}
                            className="h-[25px] cursor-pointer" src={trash} alt="trash" />
                        </div>
                    </div>
                );
              })}
              
          </div>
        }
        </>
        }
        </div>
      )
}