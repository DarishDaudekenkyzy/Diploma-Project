
import { useRef } from 'react';
import search from '../../assets/search.svg'

export default function AsminSearchProfessorsInput({onSearch, onChange}) {
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

    function handleChange(e) {
        onChange(e.target.value)
    }

    return (
    <div className="w-full border border-primary shadow">
        <form onSubmit={handleSearch} className="flex" >
            <input ref={inputRef} onChange={handleChange}
            type="search" placeholder='Search Professors'
            className="py-2 px-3 grow outline-none"/>

            <button className="px-3" type="submit">
                <img className="w-7" src={search} alt=""/>
            </button>
        </form>
    </div>
    );
}