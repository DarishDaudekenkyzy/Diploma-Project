import React from 'react'
import { Header,
  Hero,
  Statistics,
  Description,
  Team,
  Footer, } from '../components';

  import styles from '../style'

const Main = () => {
  return (
    <div className='w-full overflow-hidden'>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Header />
        </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
          <Statistics />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart} h-max relative mt-[150px]  pb-[50px]`}>
        <div className={`${styles.boxWidth}`}>
          <Description />
        </div>
      </div>
      <div className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Team />
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Main;