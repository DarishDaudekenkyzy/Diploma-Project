
import { useRef } from 'react';
import search from '../assets/search.svg'

export default function SearchProfessorsInput({onSearch}) {
    const inputRef = useRef(null);

    function handleSearch(e) {
        e.preventDefault();
        const searchInput = inputRef.current.value;
        
        if(searchInput === undefined || searchInput === '') {
            console.log('empty search');
            return;
        }
        onSearch(searchInput)
    }

    return (
    <div className="px-[10px] py-[10px] w-full border-[2px] border-primary
    rounded-[30px]">
        <form onSubmit={handleSearch} 
        className="flex" >
            <input ref={inputRef}
            className="py-[5px] px-[10px] grow outline-0 outline-none appearance-none " 
            type="search" placeholder='Search Professors'/>

            <button className="px-4" type="submit">
                <img className="w-[30px]" src={search} alt=""/>
            </button>
        </form>
    </div>
    );
}