import React, { useEffect, useRef, useState } from 'react'

import styles from '../../../style';
import check from '../../../assets/check.svg';
import eye from '../../../assets/eye.svg';
import pen from '../../../assets/pen.svg';
import trash from '../../../assets/trash.svg';
import plusIcon from '../../../assets/plusIcon.svg';
import deleteIcon from '../../../assets/deleteIcon.svg';
import UniversityView from './AdminUniversityView';
import UniversityEdit from './AdminUniversityEdit';
import AdminUniversityAdd from './AdminUniversityAdd';
import { api_deleteUniversity, api_getAllUniversities } from '../../../api/UniversityApi';

const UniversityManagement = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewUniversity, setViewUniversity] = useState(false);
  const [editUniversity, setEditUniversity] = useState(false);
  const [addUniversity, setAddUniversity] = useState(false);

  const [selectedUniversity, setSelectedUniversity] = useState();

  useEffect(() => {
    loadUniversities();
  }, [])

  async function loadUniversities() {
    setLoading(true);

      await api_getAllUniversities()
      .then(setUniversities)
      .catch(err => console.log(err));

    setLoading(false);
  }

  async function deleteUniversity(id) {
    await api_deleteUniversity(id)
    .then((response) => {
      loadUniversities();
    })
    .catch(err => console.log(err));
  }


  return (
    <div className="flex flex-col px-8">
      {selectedUniversity ?
        <>
        {viewUniversity && <UniversityView 
          setSelectedUniversity={setSelectedUniversity}
          setViewUniversity={setViewUniversity}
          setEditUniversity={setEditUniversity}
          uniId={selectedUniversity.id}/>}

        {editUniversity && <UniversityEdit 
          setSelectedUniversity={setSelectedUniversity}
          loadUniversities={loadUniversities}
          setEditUniversity={setEditUniversity}
          university={selectedUniversity}/>}
        </>
      :
      addUniversity ?
      <AdminUniversityAdd setAddUniversity={setAddUniversity} loadUniversities={loadUniversities}/>
      :
      <>
      <p className={`md:text-[35px] mb-6`}>University Management</p>
      <div className='flex h-6 gap-2 mb-6 items-center cursor-pointer
      hover:h-8 hover:text-lg transition-all'
      onClick={() => setAddUniversity(true)}>
          <img className='h-full' src={plusIcon} alt='plusIcon'/>
          <p className='font-semibold'>Add new University</p>
      </div>

      <div className="w-[800px]">
          <div className="flex justify-around border-black border-b-2 pb-[20px]">
              <p className="text-[25px] w-[25%]">Name</p>
              <p className="text-[25px] w-[25%]">Acronym</p>
              <p className="text-[25px] w-[25%] text-center">Actions</p>
          </div>
          {loading && 
            <div>
            <p>Loading...</p> 
            </div>
          }
          {universities.length > 0 &&
            universities.map((uni) => {
              return (
              <div key={uni.id} className="flex justify-around items-center border-black border-b-2 py-[10px]">
                  <p className="w-[25%]">{uni.name}</p>
                  <p className="w-[25%]">{uni.acronym}</p>
                  <div className="flex items-center w-[25%] justify-center">
                      <img onClick={() => {
                        setSelectedUniversity(uni);
                        setViewUniversity(true);
                      }
                      }
                      className="h-[35px] cursor-pointer" src={eye} alt="eye" />

                      <img onClick={() => {
                        setSelectedUniversity(uni);
                        setEditUniversity(true);
                      }}
                      className="h-[25px] cursor-pointer" src={pen} alt="pen" />
                      <img onClick={() => {
                        deleteUniversity(uni.id);}}
                      className="h-[25px] cursor-pointer" src={trash} alt="trash" />
                      <img className="h-[25px]" src={check} alt="check" />
                  </div>
              </div>
              );
            })
          }
      </div>
      </>
      }
    </div>
  )
}

export default UniversityManagement;