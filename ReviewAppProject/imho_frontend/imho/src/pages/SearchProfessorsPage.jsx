import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Header, Footer, Account, 
  Myreviews, Savedreviews, Settings } from '../components';

import styles from '../style';
import search from '../assets/search.svg'
import SearchProfessorsInput from '../components/SearchProfessorsInput';
import { api_searchProfessors, api_searchProfessorsInUniversity } from '../api/ProfessorsApi';


const SearchItem = ({professor, navigate}) => {
    function handleClick() {
        console.log(professor);
        navigate('/review-info', {state: professor});
    }
    return (
        <div className="flex items-center w-full p-[10px] bg-[#F9F9F9] border-black border-[1px]"
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

const SearchProfessorsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        handleSearch(location.state.searchInput)
    }, [])
    
    async function handleSearch(searchInput) {
        if(location.state.uni === undefined) {
            await api_searchProfessors(searchInput)
            .then((data) => {
                setSearchResults(data);
            })
            .catch(err => console.log(err));
        } else {
            await api_searchProfessorsInUniversity(location.state.uni.id, searchInput)
            .then((data) => {
                setSearchResults(data);
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <>
            <Header/>
            <section className="min-h-[700px] flex flex-col items-center mb-6">
                <div className='w-[312px] md:w-[700px]'>
                    <p className='text-2xl mt-8 font-semibold text-center'> 
                        {location.state.uni ? 
                        `Search professors in ${location.state.uni.name}`
                        : `Search professors`}
                    </p>
                    <div className='my-6'>
                        <SearchProfessorsInput onSearch={handleSearch}/>
                    </div>

                    {searchResults.length > 0 ? (
                        <>
                            <p className="text-xl px-[20px] text-center">
                                {searchResults.length} professors 
                                {location.state.uni &&
                                ` in ${location.state.uni.acronym} 
                                with “${location.state.searchInput}” in their name`}</p>
                            <div className="mt-[30px] flex flex-col gap-y-[20px] px-[20px] w-full sm:w-auto">
                            {searchResults.map((p, index) => {
                                return (
                                    <SearchItem key={p.professorId} professor={p} navigate={navigate}/>
                                );
                            })}
                            </div>
                        </>
                    ) : (
                        <div>
                            <h1>Not Found</h1>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default SearchProfessorsPage;