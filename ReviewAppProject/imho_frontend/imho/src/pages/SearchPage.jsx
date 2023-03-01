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
        <div className='w-full overflow-hidden'>
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
            <Header/>
            </div>
        </div>

        <section>
            <form className="flex">
            <input className="w-[600px] border-[2px] border-primary 
            py-[10px] px-[20px] rounded-[30px] mb-[30px] outline-0 appearance-none" 
            type="search" value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} />
            <button className="ml-[-40px] mt-[-30px]" type="button" onClick={() => {navigate(`/search/${searchInput}`)}}>
                <img className="w-[30px]" src={search} alt=""/>
            </button>
            </form>

            <h1>Search: {params.searchInput}</h1>
            {searchResults ? (
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
            )}
        </section>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
            <Footer />
            </div>
        </div>
        </div>
    )
}

export default SearchPage;