import React from 'react';
import styles from '../style';
import star from '../assets/star.svg';
import savedreviews from '../assets/savedreviews.png';

const Savedreviews = () => {

  return (
      <div className="mt-[10px] m-auto max-w-[600px]">
          <table className='w-full hidden'>
            <tbody>
              <tr className='w-full border-2 h-[50px]'>
                <td className='p-[12px] sm:p-[20px] align-start w-[30%] border-2'>Something blablabla</td>
                <td className='p-[12px] sm:p-[20px] align-start w-[60%]'>blablabla</td>
                <td className='p-[12px] sm:p-[20px] align-start w-[10%]'><img className='aspect-square min-w-[16px] w-[16px] sm:w-[24px]' src={star}/></td>
              </tr>
              <tr className='w-full border-2 h-[50px]'>
                <td className='p-[12px] sm:p-[20px] align-start w-[30%] border-2'>Something blablabla</td>
                <td className='p-[12px] sm:p-[20px] align-start w-[60%]'>blablabla</td>
                <td className='p-[12px] sm:p-[20px] align-start w-[10%]'><img className='aspect-square min-w-[16px] w-[16px] sm:w-[24px]' src={star}/></td>
              </tr>
              <tr className='w-full border-2 h-[50px]'>
                <td className='p-[12px] sm:p-[20px] align-start w-[30%] border-2'>Something blablabla</td>
                <td className='p-[12px] sm:p-[20px] align-start w-[60%]'>blablabla</td>
                <td className='p-[12px] sm:p-[20px] align-start w-[10%]'><img className='aspect-square min-w-[16px] w-[16px] sm:w-[24px]' src={star}/></td>
              </tr>
            </tbody>
          </table>
          <div className="w-full flex flex-col items-center mt-[50px] gap-y-10">
            <img className="max-h-[150px]" src={savedreviews} />
            <p className="text-[16px] sm:text-[20px]">You don’t have any saved reviews yet</p>
          </div>
      </div>
  )
}

export default Savedreviews;