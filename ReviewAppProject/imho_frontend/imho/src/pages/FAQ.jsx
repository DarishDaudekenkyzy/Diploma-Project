import React, { useState } from 'react';
import '../index.css';
import { Header, Footer } from '../components';

import search from '../assets/search.svg'
import { Link, useNavigate } from 'react-router-dom';

const FAQ = () => {

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('Search...');

  const data = [
    {
        question:  'As a Professor, what can I do about negative reviews on my profile?',
        answer: 'Nothing here yet'
    },
    {
        question:  'Will my professor know that I have rated them?',
        answer: `Nope! We don't display any of your personal information anywhere on the site. 
        Though you have the option of creating an account, an account is not required to post a rating and comment. 
        Whether you choose to create a registered account or not, all ratings submitted will remain anonymous.
        While all comments are posted anonymously, we can’t guarantee that a professor will not be able to identify 
        you by the details you include. We strongly encourage everyone to write constructive comments without 
        including any identifying information about yourself or others. If our online moderators determine 
        the comment could identify you or anyone else, the post will be removed.`
    },
    {
        question:  'Can you explain the rating scale?',
        answer: 'Nothing here yet'
    },
    {
        question:  'I’m a Professor and I want to remove my profile.',
        answer: 'Nothing here yet'
    },
  ];

  const [selected, setSelected] = useState(-1);

  const toggle = (i) => {
    if (i === selected) {
        setSelected(-1);
        return;
    }

     setSelected(i);
  };

  return (
    <>
        <Header />
        <section id="faq" className={`flex flex-col items-center md:h-[1000px] px-[24px] py-[80px]  md:mt-[80px] 
        bg-[url('../assets/back_main.jpg')] bg-cover border-black border-b-2`}>
            <p className={`text-[24px] md:text-[48px] font-[KumarOne] mb-[30px] font-bold`}>Frequently asked questions(FAQ)</p>
            <form className="flex ">
                <input className="w-[312px] md:w-[600px] border-[2px] border-primary 
                py-[10px] px-[20px] rounded-[30px] mb-[30px] outline-0 appearance-none" 
                type="search" placeholder="What can we help you with?"
                onChange={(e) => setSearchInput(e.target.value)} />
                <button className="ml-[-40px] mt-[-30px]" type="button" onClick={() => {navigate(`/search/${searchInput}`)}}>
                    <img className="w-[30px]" src={search} alt=""/>
                </button>
            </form>
            <div className="w-100 md:w-[600px] mt-[20px]">
                <div className="flex flex-col gap-y-[20px]">
                    {data.map((item, i) => (
                        <div key={i} className="flex flex-col gap-y-2">
                            <div className="flex items-start gap-x-2 cursor-pointer" onClick={() => toggle(i)}>
                                <span className="text-[20px] font-semibold md:font-bold">{selected === i ? '-' : '+'}</span>
                                <p className="text-[20px] font-semibold md:font-bold">{item.question}</p>
                            </div>
                            <div className={`text-[20px] ${selected === i ? `flex` : 'hidden'}`}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default FAQ