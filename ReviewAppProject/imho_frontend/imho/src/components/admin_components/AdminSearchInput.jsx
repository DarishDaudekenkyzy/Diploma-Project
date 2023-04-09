import { useState, useRef } from "react";
import search from '../../assets/search.svg'

export default function AdminSearchInput({onChange, placeholder}) {
    const inputRef = useRef(null);

    async function handleSearch(e) {
        e.preventDefault();
    }

    async function onInputChange(e) {
        onChange(e.target.value)   
    }

    return (
    <div className="w-full border border-primary">
        <form onSubmit={handleSearch} className="flex" >
            <input ref={inputRef}
            className="py-3 px-4 grow outline-none" type="search" placeholder={placeholder}
            onChange={(e) => onInputChange(e)} />
            
            <button className="px-4" type="submit">
                <img className="w-8" src={search} alt=""/>
            </button>
        </form>
    </div>
    );
}