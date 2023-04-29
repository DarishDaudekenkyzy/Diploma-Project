import React, { useEffect, useRef } from 'react'
import { Header,
  Hero,
  Statistics,
  Description,
  Team,
  Footer, } from '../components';

import styles from '../style';
import { useLocation } from 'react-router-dom';

const Main = () => {
  const aboutUsRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    console.log(location)
    if(location.state && location.state === 'about')
      aboutUsRef.current.scrollIntoView();
  }, [aboutUsRef, location])
  
  return (
    <div className='w-full overflow-hidden'>
          <Header />
          <Hero />
          <Statistics />
          <Description />
          <div ref={aboutUsRef}>
            <Team/>
          </div>
          <Footer />
    </div>
  )
}

export default Main;