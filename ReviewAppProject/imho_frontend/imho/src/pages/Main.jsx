import React from 'react'
import { Header,
  Hero,
  Statistics,
  Description,
  Team,
  Footer, } from '../components';

import styles from '../style';

const Main = () => {
  return (
    <div className='w-full overflow-hidden'>
          <Header />
          <Hero />
          <Statistics />
          <Description />
          <Team />
          <Footer />
    </div>
  )
}

export default Main;