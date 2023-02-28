import React from 'react';
import styles from '../style';
import star from '../assets/star.svg';

const Savedreviews = () => {

  return (
      <section className="w-full overflow-hidden mt-[10px] m-auto w-[600px]">
          <table className='w-full'>
            <tbody>
              <tr className='w-full border-2 h-[50px]'>
                <td className='p-[20px] align-start w-[30%] border-2'>Something blablabla</td>
                <td className='p-[20px] align-start w-[60%]'>blablabla</td>
                <td className='p-[20px] align-start w-[10%]'><img className='w-[25px]' src={star}/></td>
              </tr>
              <tr className='w-full border-2 h-[50px]'>
                <td className='p-[20px] align-start w-[30%] border-2'>Something blablabla</td>
                <td className='p-[20px] align-start w-[60%]'>blablabla</td>
                <td className='p-[20px] align-start w-[10%]'><img className='w-[25px]' src={star}/></td>
              </tr>
              <tr className='w-full border-2 h-[50px]'>
                <td className='p-[20px] align-start w-[30%] border-2'>Something blablabla</td>
                <td className='p-[20px] align-start w-[60%]'>blablabla</td>
                <td className='p-[20px] align-start w-[10%]'><img className='w-[25px]' src={star}/></td>
              </tr>
            </tbody>
          </table>
      </section>
  )
}

export default Savedreviews;