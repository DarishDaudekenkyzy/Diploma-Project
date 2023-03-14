import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Header, Footer, Account, 
  Myreviews, Savedreviews, Settings } from '../components';

import styles from '../style';
import search from '../assets/search.svg'


const SearchItem = ({professor, navigate}) => {
    function handleClick() {
        console.log(professor);
        navigate('/review-info', {state: professor});
    }
    return (
        <div className="flex items-center w-full sm:w-[700px] p-[10px] bg-[#F9F9F9] border-black border-[1px]"
        onClick={handleClick}>
            <div className="flex flex-col items-center xs:ml-[50px]">
                <p className="text-[12px] sm:text-[15px] font-semibold">QUALITY</p>
                <div className="flex justify-center items-center font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
                    {Math.round(professor.rating * 100) / 100}
                </div>
                <p className="text-[14px]">{professor.reviewsCount} ratings</p>
            </div>
            <div className="flex flex-col items-start ml-[20px] gap-y-[5px]">
                <p className="text-[16px] sm:text-[20px] font-bold">{professor.firstName} {professor.lastName}</p>
                <p className="text-[16px]">
                    {professor.courses.map((course, key)=>`${key!=0 ? ', ':''}${course.courseCode}`)}
                </p>
                <div className="flex flex-col sm:flex-row gap-x-[40px]">
                    <p className="text-[15px]">{Math.round(professor.wouldTakeAgainPercentage)}% Would Take Again</p>
                    <p className="text-[15px]">% Level of Difficulty</p>
                </div>
            </div>
        </div>
    );
}

const SearchPage = () => {
    const navigate = useNavigate();
    let params = useParams();

    const [searchInput, setSearchInput] = useState(params.searchInput);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.log('useEffect');
        getSearchResults();
    }, [params]);
    
    function getSearchResults() {
        axios.get(`https://localhost:7040/Professor/Search/${searchInput}`)
        .then((response) => {
            console.log(response.data);
            setSearchResults(response.data);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }

    return (
        <>
            <Header/>
            <section className="min-h-[700px] flex flex-col items-center mb-6">
                <form className="flex w-full sm:w-auto mt-[50px] px-[20px] sm:px-0">
                    <input className="w-full sm:w-[600px] border-[2px] border-primary 
                    py-[10px] px-[20px] rounded-[30px] mb-[30px] outline-0 appearance-none" 
                    type="search" value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} />
                    <button className="ml-[-40px] mt-[-30px]" type="button" onClick={() => {navigate(`/search/${searchInput}`)}}>
                        <img className="w-[24px]" src={search} alt=""/>
                    </button>
                </form>

                {searchResults.length > 0 ? (
                    <>
                        <p className="text-[16px] sm:text-[20px] md:text-[25px] px-[20px] text-center">{searchResults.length} professor with “{params.searchInput}” in their name</p>
                        <div className="mt-[30px] flex flex-col gap-y-[20px] px-[20px] w-full sm:w-auto">
                        {searchResults.map((p, index) => {
                            return (
                                <SearchItem key={p.professorId} professor={p} navigate={navigate}
                                handleClick={() => handleClick(p.firstName)}/>
                            );
                        })}
                        </div>
                    </>
                ) : (
                    <div>
                        <h1>Not Found</h1>
                    </div>
                )}
            </section>
            <Footer />
        </>
    )
}

export default SearchPage;