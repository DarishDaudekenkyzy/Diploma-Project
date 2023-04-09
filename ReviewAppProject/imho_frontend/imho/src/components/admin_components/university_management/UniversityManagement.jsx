import React, { useEffect, useRef, useState } from 'react'

import styles from '../../../style';
import check from '../../../assets/check.svg';
import eye from '../../../assets/eye.svg';
import pen from '../../../assets/pen.svg';
import trash from '../../../assets/trash.svg';
import BackArrow from '../BackArrow';
import AddNewButton from '../AddNewButton';

import UniversityView from './AdminUniversityView';
import UniversityEdit from './AdminUniversityEdit';
import AdminUniversityAdd from './AdminUniversityAdd';
import { api_deleteUniversity, api_getAllUniversities } from '../../../api/UniversityApi';
import Loading from '../../Loading';

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
      <p className={`md:text-[35px] mb-6`}>University Management</p>
      
      {viewUniversity && selectedUniversity && <>
        <BackArrow onBack={() => {setSelectedUniversity(false);setViewUniversity(false);}} text={selectedUniversity.name}/>
        <UniversityView 
          uni={selectedUniversity}
          setViewUniversity={setViewUniversity}
          setEditUniversity={setEditUniversity}/>
      </>}

      {editUniversity && selectedUniversity &&<>
      <BackArrow onBack={() => {setSelectedUniversity(false);setEditUniversity(false);}} 
      text={`Editing ${selectedUniversity.name}`}/>
      <UniversityEdit 
        setSelectedUniversity={setSelectedUniversity}
        loadUniversities={loadUniversities}
        setEditUniversity={setEditUniversity}
        university={selectedUniversity}/>
      </>}
        
      
      {addUniversity &&
      <AdminUniversityAdd setAddUniversity={setAddUniversity} loadUniversities={loadUniversities}/>
      }
      
      {!addUniversity && !viewUniversity && !editUniversity && !selectedUniversity &&
      <div className="w-[800px] mt-4 mb-8">
        {loading && <Loading/>}

        <AddNewButton handleAdd={() => setAddUniversity(true)} text={'Add New University'} />
        <table className='w-full my-4'>
          <thead>
            <tr className='font-semibold border-b-2 border-black text-xl'>
              <td className='py-4 w-1/3'>Name</td>
              <td className='py-4 text-center w-1/3'>Acronym</td>
              <td className='py-4 text-center w-1/3'>Actions</td>
            </tr>
          </thead>
          <tbody>
            {universities.length > 0 &&
              universities.map((uni, index) => {
                return (
                <tr key={index} className={`${index !== 0 && 'border-t-2 border-black'} `}>
                    <td className="py-3">{uni.name}</td>
                    <td className="py-3 text-center">{uni.acronym}</td>
                    <td className="py-3 flex gap-2 items-center justify-center">
                        <img onClick={() => {
                          setSelectedUniversity(uni);
                          setViewUniversity(true);
                        }}
                        className="h-8 cursor-pointer 
                        hover:-translate-y-1 transition-transform" src={eye} alt="eye" />

                        <img onClick={() => {
                          setSelectedUniversity(uni);
                          setEditUniversity(true);
                        }}
                        className="h-6 cursor-pointer
                        hover:-translate-y-1 transition-transform" src={pen} alt="pen" />
                        <img onClick={() => {
                          deleteUniversity(uni.id);}}
                        className="h-6 cursor-pointer
                        hover:-translate-y-1 transition-transform" src={trash} alt="trash" />
                    </td>
                </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      }
    </div>
  )
}

export default UniversityManagement;