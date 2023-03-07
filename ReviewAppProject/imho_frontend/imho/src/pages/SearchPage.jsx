import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Header, Footer, Account, 
  Myreviews, Savedreviews, Settings } from '../components';

import styles from '../style';
import search from '../assets/search.svg'


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
            <section className="h-[700px] flex flex-col items-center">
                <form className="flex mt-[50px]">
                <input className="w-[600px] border-[2px] border-primary 
                py-[10px] px-[20px] rounded-[30px] mb-[30px] outline-0 appearance-none" 
                type="search" value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} />
                <button className="ml-[-40px] mt-[-30px]" type="button" onClick={() => {navigate(`/search/${searchInput}`)}}>
                    <img className="w-[30px]" src={search} alt=""/>
                </button>
                </form>

                <p className="text-[25px]">1 professor with “{params.searchInput}” in their name</p>
                {/* {searchResults ? (
                    <div>
                        {searchResults.map((p, index) => {
                            return (
                                <div key={p.professorId}>
                                    <h2>{p.firstName} {p.lastName}</h2>
                                    <p>Faculty Id: {p.facultyId}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <h1>Not Found</h1>
                    </div>
                )} */}
                <div className="mt-[30px] gap-y-[20px]">
                    <div className="flex items-center w-[700px] p-[10px] bg-[#F9F9F9] 
                    border-black border-[1px]">
                        <div className="flex flex-col items-center ml-[50px]">
                            <p className="text-[15px] font-semibold">QUALITY</p>
                            <div className="flex justify-center items-center
                            font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
                                9.0
                            </div>
                            <p className="text-[14px]">3 ratings</p>
                        </div>
                        <div className="flex flex-col items-start ml-[20px] gap-y-[5px]">
                            <p className="text-[20px] font-bold">Bazarbaeva Larisa Yermurzaevna</p>
                            <p className="text-[16px]">CSS107, INF401, CSS302</p>
                            <div className="flex gap-x-[40px]">
                                <p className="text-[15px]">15% Would Take Again</p>
                                <p className="text-[15px]">5.0 Level of Difficulty</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default SearchPage;