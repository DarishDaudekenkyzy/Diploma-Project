import { useState } from 'react';

import { Header, Footer } from '../components';

import styles from '../style';
import search from '../assets/search.svg'
import yellow_pen from '../assets/yellow_pen.png'
import thumb_up from '../assets/thumb_up.svg'
import thumb_down from '../assets/thumb_down.svg'


const ReviewInfo = () => {
    return (
        <>
          <Header/>
          <section id="review_info" className="flex justify-center items-center py-[100px]">
            <div className="flex flex-col justify-start w-[450px] gap-y-2 relative ">
              <p className="text-[33px] font-bold w-[350px]">Bazarbayeva Larissa Yermurzaevna</p>
              <img className="h-[100px] absolute top-0 right-10" src={yellow_pen} />
              <p  className="font-bold">Professor of Engerneering Faculty</p>
              <div className="flex justify-start items-start">
                    <p className="text-[30px] font-bold">3.9</p>
                    <p>\5</p>
                  </div>
              <p  className="font-bold">overall quality based on ‘n’ ratings</p>
              <div className="flex justify-start gap-x-5">
                <div className="border-black border-r-[1px] pr-[20px]">
                  <p className="text-[30px] font-bold">80%</p>
                  <p>would take again</p>
                </div>
                <div>
                  <p className="text-[30px] font-bold">3.8</p>
                  <p>level of difficulty</p>
                </div>
              </div>
              <button className="w-[200px] border-black border-[1px] rounded-[10px]
              bg-[#F5E049] px-[20px] py-[7px] mt-5">Rate Professor</button>
            </div>

            <div className="flex flex-col w-[400px] gap-y-4 bg-black p-[20px] h-[270px]">
                <p className="text-white text-[20px]">Rating distribution</p>
              <div className="flex flex-col items-end gap-y-4">
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">awesome 5</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[80%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">9</p>
                </div>
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">great 4</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[35%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">11</p>
                </div>
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">good 3</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[20%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">12</p>
                </div>
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">ok 2</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[36%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">5</p>
                </div>
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">awful 1</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[22%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">4</p>
                </div>
              </div>
            </div>
          </section>

          <section id="review_info2" className="flex flex-col items-center 
          gap-y-5 py-[50px] border-b-2 border-black">
            <div className="w-[700px] flex justify-start border-b-2 border-black">
              <p className="border-b-2 border-black pb-[10px]">3 students ratings</p>
            </div>
            <div className="w-[700px] flex items-start">
              <select className="w-[200px] border-black border-[1px] px-[10px] py-[5px]">
                <option value="all">All courses</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="flex flex-col mt-[30px] gap-y-[20px]">
              <div className="flex items-center w-[700px] bg-[#F9F9F9] 
              border-black border-[1px] p-[20px]">
                  <div className="flex flex-col gap-y-2 items-center">
                      <p className="text-[15px] font-semibold">QUALITY</p>
                      <div className="flex justify-center items-center
                      font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
                          9.0
                      </div>
                      <p className="text-[15px] font-semibold">DIFFICULTY</p>
                      <div className="flex justify-center items-center
                      font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#F5E049]">
                          5.5
                      </div>
                  </div>
                  <div className="flex flex-col items-start ml-[20px] gap-y-[5px]">
                      <div className="w-full flex justify-between">
                        <div className="flex justify-start gap-x-[20px]">
                          <p className="text-[13px] font-semibold">CSS107</p>
                          <div className="text-[13px] border-black 
                          border-[1px] bg-[#F5E049] rounded-[5px] px-[15px]">Great</div>
                        </div>
                        <p className="text-[13px]">28th September, 2022</p>
                      </div>
                      <div>
                        <div className="flex justify-start gap-x-[20px]">
                          <p className="text-[13px]">Would Take Again: No</p>
                          <p className="text-[13px]">Attendance: <b>Mandatory</b></p>
                        </div>
                      </div>
                      <div className="my-[10px]">
                        <p className="text-[13px]">
                          The only grades in the grade book are 4 exams. 1 out of the first three are dropped. Went to every class, watched every lecture a second time to review and completed all the extra worksheets and still got the same grade on exam 2 that I got on exam one when I didnt go to any classes and joined the class a day before the exam
                          I didnt go to any classes and joined the class a day before the exam
                        </p>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex justify-start gap-x-[10px]">
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Tough grader</div>
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Funny</div>
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Great explanations</div>
                        </div>
                        <div className="flex justify-start">
                          <p className="text-[13px]">0</p>
                          <img className="h-[100px] mr-[5px] h-[20px]" src={thumb_up} />
                          <p className="text-[13px]">0</p>
                          <img className="h-[100px] mr-[5px] h-[20px]" src={thumb_down} />
                        </div>
                      </div>
                  </div>
              </div>
              <div className="flex items-center w-[700px] bg-[#23A094] 
              border-black border-[1px] p-[20px]">
                  <div className="flex flex-col gap-y-2 items-center">
                      <p className="text-[15px] font-semibold">QUALITY</p>
                      <div className="flex justify-center items-center
                      font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
                          9.0
                      </div>
                      <p className="text-[15px] font-semibold">DIFFICULTY</p>
                      <div className="flex justify-center items-center
                      font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#F5E049]">
                          5.5
                      </div>
                  </div>
                  <div className="flex flex-col items-start ml-[20px] gap-y-[5px]">
                      <div className="w-full flex justify-between">
                        <div className="flex justify-start gap-x-[20px]">
                          <p className="text-[13px] font-semibold">CSS107</p>
                          <div className="text-[13px] border-black 
                          border-[1px] bg-[#F5E049] rounded-[5px] px-[15px]">Great</div>
                        </div>
                        <p className="text-[13px]">28th September, 2022</p>
                      </div>
                      <div>
                        <div className="flex justify-start gap-x-[20px]">
                          <p className="text-[13px]">Would Take Again: No</p>
                          <p className="text-[13px]">Attendance: <b>Mandatory</b></p>
                        </div>
                      </div>
                      <div className="my-[10px]">
                        <p className="text-[13px]">
                          The only grades in the grade book are 4 exams. 1 out of the first three are dropped. Went to every class, watched every lecture a second time to review and completed all the extra worksheets and still got the same grade on exam 2 that I got on exam one when I didnt go to any classes and joined the class a day before the exam
                          I didnt go to any classes and joined the class a day before the exam
                        </p>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex justify-start gap-x-[10px]">
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Tough grader</div>
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Funny</div>
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Great explanations</div>
                        </div>
                        <div className="flex justify-start">
                          <p className="text-[13px]">0</p>
                          <img className="h-[100px] mr-[5px] h-[20px]" src={thumb_up} />
                          <p className="text-[13px]">0</p>
                          <img className="h-[100px] mr-[5px] h-[20px]" src={thumb_down} />
                        </div>
                      </div>
                  </div>
              </div>
              <div className="flex items-center w-[700px] bg-[#F9F9F9] 
              border-black border-[1px] p-[20px]">
                  <div className="flex flex-col gap-y-2 items-center">
                      <p className="text-[15px] font-semibold">QUALITY</p>
                      <div className="flex justify-center items-center
                      font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
                          9.0
                      </div>
                      <p className="text-[15px] font-semibold">DIFFICULTY</p>
                      <div className="flex justify-center items-center
                      font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#F5E049]">
                          5.5
                      </div>
                  </div>
                  <div className="flex flex-col items-start ml-[20px] gap-y-[5px]">
                      <div className="w-full flex justify-between">
                        <div className="flex justify-start gap-x-[20px]">
                          <p className="text-[13px] font-semibold">CSS107</p>
                          <div className="text-[13px] border-black 
                          border-[1px] bg-[#F5E049] rounded-[5px] px-[15px]">Great</div>
                        </div>
                        <p className="text-[13px]">28th September, 2022</p>
                      </div>
                      <div>
                        <div className="flex justify-start gap-x-[20px]">
                          <p className="text-[13px]">Would Take Again: No</p>
                          <p className="text-[13px]">Attendance: <b>Mandatory</b></p>
                        </div>
                      </div>
                      <div className="my-[10px]">
                        <p className="text-[13px]">
                          The only grades in the grade book are 4 exams. 1 out of the first three are dropped. Went to every class, watched every lecture a second time to review and completed all the extra worksheets and still got the same grade on exam 2 that I got on exam one when I didnt go to any classes and joined the class a day before the exam
                          I didnt go to any classes and joined the class a day before the exam
                        </p>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex justify-start gap-x-[10px]">
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Tough grader</div>
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Funny</div>
                          <div className="text-[13px]
                          bg-black px-[20px] rounded-[20px] text-white">Great explanations</div>
                        </div>
                        <div className="flex justify-start">
                          <p className="text-[13px]">0</p>
                          <img className="h-[100px] mr-[5px] h-[20px]" src={thumb_up} />
                          <p className="text-[13px]">0</p>
                          <img className="h-[100px] mr-[5px] h-[20px]" src={thumb_down} />
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
    )
}

export default ReviewInfo;