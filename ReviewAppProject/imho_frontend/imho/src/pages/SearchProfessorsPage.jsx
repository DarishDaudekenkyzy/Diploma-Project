import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Header, Footer, Account, 
  Myreviews, Savedreviews, Settings } from '../components';

import styles from '../style';
import search from '../assets/search.svg'
import SearchInput from '../components/SearchInput';


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
        console.log('useEffect');
        if(location.state.school === undefined) {
            console.log('search professors')
            searchProfessors(location.state.searchInput);
        }
        else {
            console.log(location.state.school)
            searchProfessorsInSchool(location.state.searchInput, location.state.school.id)
        }
    }, [location]);
    
    async function searchProfessors(searchInput) {
        await axios.get(`https://localhost:7040/Professor/Search/${searchInput}`)
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

    async function searchProfessorsInSchool(searchInput, schoolId) {
        await axios.get(`https://localhost:7040/Professor/Search/${schoolId}/${searchInput}`)
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
                <SearchInput school={location.state.school}/>

                {searchResults.length > 0 ? (
                    <>
                        <p className="text-[16px] sm:text-[20px] md:text-[25px] px-[20px] text-center">
                            {searchResults.length} professors 
                            {location.state.school &&
                            ` in ${location.state.school.name} `}
                            with “{location.state.searchInput}” in their name</p>
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
            </section>
            <Footer />
        </>
    )
}

export default SearchProfessorsPage;