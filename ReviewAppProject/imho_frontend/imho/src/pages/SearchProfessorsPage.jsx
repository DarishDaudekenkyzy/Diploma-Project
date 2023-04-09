import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Header, Footer, Account, 
  Myreviews, Savedreviews, Settings } from '../components';

import styles from '../style';
import search from '../assets/search.svg'
import SearchProfessorsInput from '../components/SearchProfessorsInput';
import { api_searchProfessors, api_searchProfessorsInUniversity } from '../api/ProfessorsApi';
import Loading from '../components/Loading';


const SearchProfessorsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchResults, setSearchResults] = useState([]);
    const [university, setUniversity] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if(location.state !== null) {
            if(location.state.searchInput.trim() !== '') {
                if(location.state.uni !== null) {
                    setUniversity(location.state.uni);
                }
                setSearchInput(location.state.searchInput);
            }
        }
    }, [])

    useEffect(() => {
        if(searchInput.trim() !== '') {
            if(university)
                searchProfessorsInUniversity()
            else
                searchProfessors();
        }
    }, [searchInput])
    
    async function handleSearch(searchInput) {
        setSearchInput(searchInput);
    }

    async function searchProfessors()  {
        setLoading(true);
        await api_searchProfessors(searchInput)
            .then((data) => {
                if(data.length > 0) {
                    setSearchResults(data);
                    setNotFound(false);
                }
                else setNotFound(true);
            })
            .catch(err => console.log(err));
        setLoading(false);
    }

    async function searchProfessorsInUniversity() {
        setLoading(true);
        await api_searchProfessorsInUniversity(university.id, searchInput)
        .then((data) => {
            if(data.length > 0) {
                setSearchResults(data);
                setNotFound(false);
            }
            else setNotFound(true);
        })
        .catch(err => console.log(err));
        setLoading(false);
    }

    return (
        <>
            <Header/>
            <section className="min-h-[700px] flex flex-col items-center mb-6">
                <div className='w-[312px] md:w-[700px]'>
                    <p className='text-2xl mt-8 font-semibold text-center'> 
                        {university ? 
                        `Search professors in ${university.name}`
                        : `Search professors`}
                    </p>
                    <div className='my-6'>
                        <SearchProfessorsInput onSearch={handleSearch}/>
                    </div>
                    {loading && <Loading/>}
                    {notFound && 
                    <div>
                        <p>Not Found</p>
                    </div>}

                    {searchResults.length > 0 && 
                    <>
                    
                        <p className="text-xl px-[20px]">
                            Found {searchResults.length} professors 
                            {university && ` in ${university.acronym} `}
                            {' '}with “{searchInput}” in their name</p>
                        <div className="mt-[30px] flex flex-col gap-y-[20px] px-[20px] w-full sm:w-auto">
                        {searchResults.map((p, index) => {
                            return (
                                <SearchItem key={p.professorId} professor={p} navigate={navigate}/>
                            );
                        })}
                        </div>
                    </>
                    }
                </div>
            </section>
            <Footer />
        </>
    )
}

export default SearchProfessorsPage;

const SearchItem = ({professor, navigate}) => {
    function handleClick() {
        console.log(professor);
        navigate('/review-info', {state: professor.professorId});
    }
    return (
        <div className="flex items-center w-full p-[10px] bg-[#F9F9F9] border-black border-[1px] 
        cursor-pointer hover:shadow-lg hover:bg-[#f1f1f1] hover:-translate-y-2 transition-transform"
        onClick={handleClick}>
            <div className="flex flex-col items-center xs:ml-[50px]">
                <p className="text-[12px] sm:text-[15px] font-semibold">QUALITY</p>
                <div className="flex justify-center items-center font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
                    {professor.rating}
                </div>
                <p className="text-[14px]">{professor.reviewsCount} ratings</p>
            </div>
            <div className="flex flex-col items-start ml-[20px] gap-y-[5px]">
                <p className="text-[16px] sm:text-[20px] font-bold">{professor.firstName} {professor.lastName}</p>
                <p className="text-[16px]">
                    {professor.courses.map((course, key)=>`${key!=0 ? ', ':''}${course.courseCode}`)}
                </p>
                <div className="flex flex-col sm:flex-row gap-x-[40px]">
                    <p className="text-[15px]">{professor.wouldTakeAgainPercentage}% Would Take Again</p>
                    <p className="text-[15px]">{professor.difficultyPercentage}% Level of Difficulty</p>
                </div>
            </div>
        </div>
    );
}