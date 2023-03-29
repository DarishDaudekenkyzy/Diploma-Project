import { useNavigate } from "react-router-dom";
import { useState } from "react";
import search from '../assets/search.svg'
import school_icon from '../assets/school_icon.svg'
import axios from "axios";

export default function SearchInput({searchSchools = false, onSchoolChoose, school}) {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState();
    const [searchSchoolsResults, setSearchSchoolsResults] = useState([]);

    function handleSearch(e) {
        e.preventDefault();
        
        if(searchInput === undefined || searchInput === '') {
            console.log('empty search');
            return;
        }

        if(searchSchools) {
            loadSearchSchools(searchInput);
        } else {
            navigate(`/search-professors`, {state: {searchInput: searchInput, school: school}});
        }
    }

    function loadSearchSchools(searchInput) {
        axios.get(`https://localhost:7040/University/Search/${searchInput}`)
        .then((response) => {
            console.log(response.data)
            setSearchSchoolsResults(response.data);
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

    function onInputChange(e) {
        setSearchInput(e.target.value);
        setSearchSchoolsResults([]);
    }

    function handleSchoolChoose(m_school) {
        setSearchSchoolsResults([]);
        onSchoolChoose(m_school)
    }

    return (
    <div className="px-[10px] py-[10px] my-[30px] w-[312px] md:w-[600px] border-[2px] border-primary
    rounded-[30px]">
        <form onSubmit={handleSearch} 
        className="flex" >
            <input className="py-[5px] px-[10px] grow outline-0 outline-none appearance-none " 
            type="search" placeholder={`Search ${searchSchools ? 'Schools' : 'Professors'}`}
            onChange={(e) => onInputChange(e)} />
            <button className="px-4" type="submit">
                <img className="w-[30px]" src={search} alt=""/>
            </button>
        </form>
        {searchSchoolsResults.length > 0 &&
        <div>
            {searchSchoolsResults.map((school) => {
                return(
                    <div key={school.id}
                    className="px-[10px] flex gap-4">
                        <div className="flex items-center">
                            <img className="w-[35px]" src={school_icon} alt=""/>
                        </div>
                        <div className="grow">
                            <p onClick={() => handleSchoolChoose(school)}
                            className="font-semibold hover:text-blue-500 cursor-pointer">{school.name}</p>
                            <p className="text-sm hover:underline cursor-pointer">Go to school page</p>
                        </div>
                    </div>
                );
            })}
        </div>}
    </div>
    );
}