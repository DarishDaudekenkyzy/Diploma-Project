import { useState, useRef } from "react";
import search from '../assets/search.svg'
import school_icon from '../assets/school_icon.svg'
import { api_searchUniversities } from "../api/UniversityApi";

export default function SearchUniversitiesInput({onSelect}) {
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef(null);

    async function handleSearch(e) {
        e.preventDefault();
    }

    async function onInputChange(e) {
        if (e.target.value === '') {
            setSearchResults([]);
            return;
        }
        await api_searchUniversities(e.target.value)
        .then(setSearchResults)
        .catch(err => console.log(err))
    }

    function handleSelect(university) {
        setSearchResults([]);
        inputRef.current.value = '';
        onSelect(university)
    }

    return (
    <div className="px-[10px] py-[10px] w-full border-[2px] border-primary
    rounded-[30px]">
        <form onSubmit={handleSearch} 
        className="flex" >
            <input ref={inputRef}
            className="py-[5px] px-[10px] grow outline-0 outline-none appearance-none " 
            type="search" placeholder='Search Universities'
            onChange={(e) => onInputChange(e)} />
            <button className="px-4" type="submit">
                <img className="w-[30px]" src={search} alt=""/>
            </button>
        </form>
        {searchResults.length > 0 &&
        <div>
            {searchResults.map((school) => {
                return(
                    <div key={school.id}
                    className="px-[10px] flex gap-4">
                        <div className="flex items-center">
                            <img className="w-[35px]" src={school_icon} alt=""/>
                        </div>
                        <div className="grow">
                            <p onClick={() => handleSelect(school)}
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