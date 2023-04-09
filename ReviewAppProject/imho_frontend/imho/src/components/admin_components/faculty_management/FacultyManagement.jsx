import { useEffect, useState } from 'react';

import eye from '../../../assets/eye.svg';
import pen from '../../../assets/pen.svg';
import trash from '../../../assets/trash.svg';
import school from '../../../assets/school_icon.svg';
import { api_deleteFaculty, api_getFacultiesInUniversity } from '../../../api/FacultyApi';
import { api_searchUniversities } from '../../../api/UniversityApi';
import AdminSearchInput from '../AdminSearchInput';
import AdminFacultyAdd from './AdminFacultyAdd';
import AdminFacultyView from './AdminFacultyView';
import AdminFacultyEdit from './AdminFacultyEdit';
import AddNewButton from '../AddNewButton';
import BackArrow from '../BackArrow';

export default function FacultyManagement() {
    const [loading, setLoading] = useState(false);
    const [searchUniverstiesResults, setSearchUniverstiesResults] = useState([]);
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

    async function deleteFaculty(id) {
        await api_deleteFaculty(id)
        .then(loadFaculties)
        .catch(err => console.log(err))
    }

    async function onSearchUniversities(searchInput) {
        if(searchInput === '') {
            setSearchUniverstiesResults([])
            return
        }
        await api_searchUniversities(searchInput)
        .then(setSearchUniverstiesResults)
        .catch(err => console.log(err));
    }


    return (
        <div className="flex flex-col px-8">
        <p className={`md:text-[35px] mb-6`}>Faculty Management</p>

        {viewFaculty && selectedFaculty && <>
        <BackArrow onBack={() => {setViewFaculty(false);setSelectedFaculty(null)}} text={selectedFaculty.facultyName}/>
        <AdminFacultyView setViewFaculty={setViewFaculty} setEditFaculty={setEditFaculty} fac={selectedFaculty}/>
        </>}

        {editFaculty && selectedFaculty && <>
        <BackArrow onBack={() => {setEditFaculty(false);setSelectedFaculty(null)}} 
        text={`Editing ${selectedFaculty.facultyName}`}/>
        <AdminFacultyEdit
        setEditFaculty={setEditFaculty} setSelectedFaculty={setSelectedFaculty}
        faculty={selectedFaculty} uniId={university.id} loadFaculties={loadFaculties}/>
        </>}
        
        {addFaculty && university &&
        <>
        <BackArrow onBack={() => {setAddFaculty(false);}} 
        text={`Add New Faculty in ${university.name}`}/>
        <AdminFacultyAdd loadFaculties={loadFaculties}
        setAddFaculty={setAddFaculty} university={university}/>
        </>}

        {!addFaculty && !viewFaculty && !editFaculty && !selectedFaculty &&
        <>
        <div className='my-2'>
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
        </div>

        {university &&
        <div className='mt-6'>
            <p className='text-xl mb-4'>Faculties in 
                <span className='font-semibold'> {university.name}</span>
            </p>
            <AddNewButton handleAdd={() => setAddFaculty(true)} text='Add new Faculty'/>
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
        </>}
        </div>
      )
}