import {useState} from 'react'
import { Footer, Header } from '../components'
import yellow_pen from '../assets/yellow_pen.png'
import yes_icon from '../assets/yes.png'
import no_icon from '../assets/no.png'

const CreateReview = () => {

  const [rate, setRate] = useState(5);
  const currentRate = (index) => {
    setRate(index);
  }

  const [difficult, setDifficult] = useState(1);
  const currentDifficult = (index) => {
    setDifficult(index);
  }

  const [takeAgain, setTakeAgain] = useState(true);
  const currentTakeAgain = (index) => {
    setTakeAgain(index);
  }

  const [attendanceMandatory, setAttendanceMandatory] = useState(true);
  const currentAttendanceMandatory = (index) => {
    setAttendanceMandatory(index);
  }

  const [tags, setTags] = useState([]);
  const setTag = (tag) => {
    if (tags.includes(tag)) {
      tags.shift();
      console.log(tags);
    } else {
      setTags([...tags, tag]);
      console.log(tags);
    }

    if (tags.length > 3) {
      tags.shift();
      console.log(tags);
    }
  }




  return (
    <>
    <Header/>
    <section className="flex justify-center py-[100px] relative">
      <div className="flex flex-col items-center relative">
        <div className="text-[30px] font-bold border-b-2 border-black pb-10">
          Rate: Bazarbayeva Larisa Yermurzaevna
        </div>
        <img className="h-[150px] absolute top-20 right-0" src={yellow_pen} />
        <div className="flex justify-start my-5 w-[550px] gap-x-10 items-center">
          <p className="w-max text-[20px] font-semibold">Select Course Code:</p>
          <select className="border-black border-[1px] px-[20px] py-[7px] cursor-pointer">
            <option value="none">Course code: </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="flex justify-start my-5 w-[550px] gap-x-10 items-center">
          <p className="w-max text-[20px] font-semibold">Rate Your Professor:</p>
            <div>
              <div className="flex justify-start gap-x-2 items-center cursor-pointer">
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((rate === 5) && `bg-[#97C1A9]`)}`} onClick={() => currentRate(5)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((rate === 4) && `bg-[#CCE2CB]`)}`} onClick={() => currentRate(4)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((rate === 3) && `bg-[#FBEAC2]`)}`} onClick={() => currentRate(3)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((rate === 2) && `bg-[#FFDAC1]`)}`} onClick={() => currentRate(2)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((rate === 1) && `bg-[#FFB8B1]`)}`} onClick={() => currentRate(1)}></div>
              </div>
              {rate === 5 && <p className="text-center">5 - Awesome</p>}
              {rate === 4 && <p className="text-center">4 - Good</p>}
              {rate === 3 && <p className="text-center">3 - So so</p>}
              {rate === 2 && <p className="text-center">2 - Bad</p>}
              {rate === 1 && <p className="text-center">1 - Really bad</p>}
            </div>
        </div>
        <div className="flex justify-start my-5 w-[550px] gap-x-10 items-center">
          <p className="w-max text-[20px] font-semibold">How difficult was the professor?</p>
            <div>
              <div className="flex justify-start gap-x-2 items-center cursor-pointer">
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((difficult === 1) && `bg-[#97C1A9]`)}`} onClick={() => currentDifficult(1)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((difficult === 2) && `bg-[#CCE2CB]`)}`} onClick={() => currentDifficult(2)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((difficult === 3) && `bg-[#FBEAC2]`)}`} onClick={() => currentDifficult(3)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((difficult === 4) && `bg-[#FFDAC1]`)}`} onClick={() => currentDifficult(4)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${((difficult === 5) && `bg-[#FFB8B1]`)}`} onClick={() => currentDifficult(5)}></div>
              </div>
              {difficult === 1 && <p className="text-center">1 - Very easy</p>}
              {difficult === 2 && <p className="text-center">2 - Easy</p>}
              {difficult === 3 && <p className="text-center">3 - Mid</p>}
              {difficult === 4 && <p className="text-center">4 - Difficult</p>}
              {difficult === 5 && <p className="text-center">5 - Very difficult</p>}
            </div>
        </div>
        <div className="flex justify-start my-5 w-[550px] gap-x-10 items-center">
          <p className="w-max text-[20px] font-semibold">Would you take this professor again?</p>
            <div>
              <div className="flex justify-start gap-x-2 items-center">
                <p className="text-center">Yes</p>
                <div className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%] border-[1px] border-black mr-5 cursor-pointer
                ${((takeAgain) && `bg-[#7CFF89]`)}`} onClick={() => currentTakeAgain(true)}>
                  <img className="w-[15px]" src={yes_icon} />
                </div>
                <p className="text-center">No</p>
                <div className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%] border-[1px] border-black cursor-pointer
                ${((!takeAgain) && `bg-[#FF6464]`)}`} onClick={() => currentTakeAgain(false)}>
                  <img className="w-[18px]" src={no_icon} />
                </div>
              </div>
            </div>
        </div>
        <div className="flex justify-start my-5 w-[550px] gap-x-10 items-center">
          <p className="w-max text-[20px] font-semibold">Was attendance mandatory?</p>
            <div>
              <div className="flex justify-start gap-x-2 items-center">
                <p className="text-center">Yes</p>
                <div className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%] border-[1px] border-black mr-5 cursor-pointer
                ${((attendanceMandatory) && `bg-[#7CFF89]`)}`} onClick={() => currentAttendanceMandatory(true)}>
                  <img className="w-[15px]" src={yes_icon} />
                </div>
                <p className="text-center">No</p>
                <div className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%] border-[1px] border-black cursor-pointer
                ${((!attendanceMandatory) && `bg-[#FF6464]`)}`} onClick={() => currentAttendanceMandatory(false)}>
                  <img className="w-[18px]" src={no_icon} />
                </div>
              </div>
            </div>
        </div>
        <div className="flex justify-start my-5 w-[550px] gap-x-10 items-center">
          <p className="w-max text-[20px] font-semibold">Select grade recieved:</p>
          <select className="border-black border-[1px] px-[20px] py-[7px] cursor-pointer">
            <option value="none">Select grade </option>
            <option value="a">A</option>
            <option value="a-">A-</option>
            <option value="b+">B+</option>
            <option value="b">B</option>
            <option value="b-">B-</option>
            <option value="c+">C+</option>
            <option value="c+">C+</option>
            <option value="c">C</option>
            <option value="c-">C-</option>
            <option value="d+">D+</option>
            <option value="d">D</option>
            <option value="d-">D-</option>
            <option value="f">F</option>
            <option value="d/w">Drop/Withdrawal</option>
            <option value="nsy">Not sure yet </option>
            <option value="rnts">Rather not to say</option>
          </select>
        </div>
        <div className="flex flex-col justify-start my-5 w-[550px] gap-x-10">
          <p className="w-max text-[20px] font-semibold">Select up to 3 tags</p>
          <div className="flex flex-wrap justify-start my-5 gap-2 cursor-pointer">
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Tough grader</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>
            Get Ready to Read</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Participation Matters</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Group Projects</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Amazing Lessons</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Clear Grading Criteria</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Inspirational</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>
            Lots of Homework</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Funny</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Beware of Many Quizzes</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>
            So Many Papers</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Respected</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>
            Hard Tests</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Bonus Points</div>
            <div className="border-[1px] border-black 
            px-[10px] py-[5px] rounded-[20px]" onClick={() => setTag(event.target.innerHTML.toString())}>Great explanations</div>
          </div>
        </div>
        <div className="flex flex-col justify-start my-5 w-[550px] gap-y-3">
          <p className="w-max text-[20px] font-semibold">Write a review</p>
          <p className="w-[80&]">(Discuss the professor's professional abilities including teaching style and ability to convey the material clearly)</p>
          <form className="flex flex-col gap-y-5">
            <textarea  className="border-[1px] border-black h-[150px] p-4"
            placeholder='What you want other students to know about the teacher?'>
            </textarea>
            <button className="w-[200px] text-white
            bg-black px-[20px] py-[7px]" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default CreateReview