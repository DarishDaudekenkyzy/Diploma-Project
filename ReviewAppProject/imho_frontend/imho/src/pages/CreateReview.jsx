import {useState, useContext, useRef, useEffect} from 'react'
import { Footer, Header } from '../components'
import yellow_pen from '../assets/yellow_pen.png'
import yes_icon from '../assets/yes.png'
import no_icon from '../assets/no.png'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom'

const CreateReview = () => {
  const navigate = useNavigate();
  const [professor, setProfessor] = useState(null);
  const {user, setUser} = useContext(UserContext);
  const [searchResults, setSearchResults] = useState([]);
  const searchInput = useRef(null);
  const { register, setError, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {rating: 5, wouldTakeAgain: true, wasAttendanceMandatory: true}
  });
  const watchRating = watch('rating');
  const watchTakeAgain = watch('wouldTakeAgain');
  const watchAttendance = watch('wasAttendanceMandatory');
  const watchCourse = watch('courseId');

  useEffect(() => {
    if(user === null) {
      navigate('/');
      
    }
    setValue('userId', user.userId);
  }, [user]);

  function handleSearch(e) {
    if(e.target.value === '') {
        setSearchResults([]);
    }
    else {
    axios.get(`https://localhost:7040/Professor/Search/${e.target.value}`)
    .then((response) => {
        setSearchResults(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    }
  }

  function handleSelectItem(selected) {
    setProfessor(selected);
    setValue('professorId', selected.professorId);
    setSearchResults([]);
    searchInput.current.value = '';
  }

  async function handleSubmitReview(data) {
    data.courseId = parseInt(watchCourse);
    console.log(data);
    await axios.post('https://localhost:7040/ReviewProfessor/Create', data)
    .then((response) => {
      console.log(response.data);
      setProfessor(null);
      searchInput.current.value = '';
    })
    .catch(function (error) {
      if (error.response) {
        if(error.response.data === 'User with provided email exists.')
          setError('email', {type: "manual", message: 'This email is taken'});
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }

  const [difficult, setDifficult] = useState(1);
  const currentDifficult = (index) => {
    setDifficult(index);
  }

  const [tags, setTags] = useState([]);
  const setTag = (tag) => {
    if (tags.includes(tag) ) {
      let index = tags.indexOf(tag)
      tags.splice(index, 1);
      console.log(tags);
      return;
    } 
    if (tags.length >= 3) {
      console.log(tags); 
      return;
    }

    setTags([...tags, tag]);
    console.log(tags);
  }




  return (
    <>
    <Header/>
    <section className="flex justify-center pt-8 pb-32">
      <div className="flex flex-col items-center relative w-[550px]">
        <div className="w-full mb-8">
            <input ref={searchInput} className="border-2 border-neutral-600 rounded-md p-1.5 mb-2.5 w-full" placeholder='Search Professors'  
            onChange={handleSearch}/>

            {searchResults.length > 0 ? (
                <SearchResults searchResults={searchResults} handleClick={handleSelectItem}/>
            ) : <></>}
        </div>
        {professor ? (
          <form onSubmit={handleSubmit(handleSubmitReview)}
            className='relative'>
            <div className="text-[30px] font-bold border-b-2 border-black pb-10">
              Rate: {professor.firstName} {professor.lastName}
            </div>
            <img className="h-[150px] absolute top-20 right-0" src={yellow_pen} />
            {/* COURSE CODE */}
            <div className="my-5">
              <div className='flex justify-start w-full gap-x-10 items center'>
                <p className="w-max text-[20px] font-semibold">Select Course Code:</p>
                <select className="border-black border-[1px] px-[20px] py-[7px] cursor-pointer"
                {...register('courseId', {required: 'This field is required'})}>
                  <option value={0}>Course code: </option>
                  {professor.courses.length > 0 && professor.courses.map((c) => { 
                      return (
                      <option key={c.courseId} value={c.courseId}>{c.courseName}</option>
                      );
                  })}
                </select>
              </div>
              <ErrorMessage errors={errors} name='courseId'
                  render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            {/* RATE PROFESSOR */}
            <div className="flex justify-start my-5 w-full gap-x-10 items-center">
              <p className="w-max text-[20px] font-semibold">Rate Your Professor:</p>
                <div>
                  <div className="flex justify-start gap-x-2 items-center cursor-pointer">
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(getValues('rating') === 5 && `bg-[#97C1A9]`)}`} onClick={() => setValue('rating', 5)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(getValues('rating') === 4 && `bg-[#CCE2CB]`)}`} onClick={() => setValue('rating', 4)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(getValues('rating') === 3 && `bg-[#FBEAC2]`)}`} onClick={() => setValue('rating', 3)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(getValues('rating') === 2 && `bg-[#FFDAC1]`)}`} onClick={() => setValue('rating', 2)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(getValues('rating') === 1 && `bg-[#FFB8B1]`)}`} onClick={() => setValue('rating', 1)}></div>
                  </div>
                  <p className="text-center">
                    {watchRating === "5" && '5 - Awesome'}
                    {watchRating === "4" && '4 - Good'}
                    {watchRating === "3" && '3 - So so'}
                    {watchRating === "2" && '2 - Bad'}
                    {watchRating === "1" && '1 - Really Bad'}
                  </p>
                </div>
            </div>

            {/* DIFFICULITY */}
            <div className="flex justify-start my-5 w-full gap-x-10 items-center">
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

            {/* WOULD YOU TAKE AGAIN */}
            <div className="flex justify-start my-5 w-full gap-x-10 items-center">
              <p className="w-max text-[20px] font-semibold">Would you take this professor again?</p>
                <div>
                  <div className="flex justify-start gap-x-2 items-center">
                    <p className="text-center">Yes</p>
                    <div className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%] border-[1px] border-black mr-5 cursor-pointer
                    ${watchTakeAgain && 'bg-[#7CFF89]'}`} onClick={() => setValue('wouldTakeAgain', true)}>
                      <img className="w-[15px]" src={yes_icon} />
                    </div>
                    <p className="text-center">No</p>
                    <div className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%] border-[1px] border-black cursor-pointer
                    ${!watchTakeAgain && 'bg-[#FF6464]'}`} onClick={() => setValue('wouldTakeAgain', false)}>
                      <img className="w-[18px]" src={no_icon} />
                    </div>
                  </div>
                </div>
            </div>

            {/* MANDATORY ATTENDANCE */}
            <div className="flex justify-start my-5 w-full gap-x-10 items-center">
              <p className="w-max text-[20px] font-semibold">Was attendance mandatory?</p>
                <div>
                  <div className="flex justify-start gap-x-2 items-center">
                    <p className="text-center">Yes</p>
                    <div className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%] border-[1px] border-black mr-5 cursor-pointer
                    ${watchAttendance && 'bg-[#7CFF89]'}`} onClick={() => setValue('wasAttendanceMandatory', true)}>
                      <img className="w-[15px]" src={yes_icon} />
                    </div>
                    <p className="text-center">No</p>
                    <div className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%] border-[1px] border-black cursor-pointer
                    ${!watchAttendance && 'bg-[#FF6464]'}`} onClick={() => setValue('wasAttendanceMandatory', false)}>
                      <img className="w-[18px]" src={no_icon} />
                    </div>
                  </div>
                </div>
            </div>

            {/* GRADE RECEIVED */}
            <div className="flex justify-start my-5 w-full gap-x-10 items-center">
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

            {/* TAGS */}
            <div className="flex flex-col justify-start my-5 w-full gap-x-10">
              <p className="w-max text-[20px] font-semibold">Select up to 3 tags</p>
              <div className="flex flex-wrap justify-start my-5 gap-2 cursor-pointer">
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px] 
                bg-[${(tags.includes('Tough grader') && `#F5E049`)}]`} 
                onClick={() => setTag('Tough grader')}>Tough grader</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Get Ready to Read') && `#F5E049`)}]`}
                onClick={() => setTag('Get Ready to Read')}>
                Get Ready to Read</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Participation Matters') && `#F5E049`)}]`}
                onClick={() => setTag('Participation Matters')}>Participation Matters</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Group Projects') && `#F5E049`)}]`}
                onClick={() => setTag('Group Projects')}>Group Projects</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Amazing Lessons') && `#F5E049`)}]`}
                onClick={() => setTag('Amazing Lessons')}>Amazing Lessons</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Clear Grading Criteria') && `#F5E049`)}]`}
                onClick={() => setTag('Clear Grading Criteria')}>Clear Grading Criteria</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Inspirational') && `#F5E049`)}]`}
                onClick={() => setTag('Inspirational')}>Inspirational</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Lots of Homework') && `#F5E049`)}]`}
                onClick={() => setTag('Lots of Homework')}>Lots of Homework</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Funny') && `#F5E049`)}]`}
                onClick={() => setTag('Funny')}>Funny</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Beware of Many Quizzes') && `#F5E049`)}]`}
                onClick={() => setTag('Beware of Many Quizzes')}>Beware of Many Quizzes</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('So Many Papers') && `#F5E049`)}]`}
                onClick={() => setTag('So Many Papers')}>So Many Papers</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Respected') && `#F5E049`)}]`}
                onClick={() => setTag('Respected')}>Respected</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Hard Tests') && `#F5E049`)}]`}
                onClick={() => setTag(('Hard Tests'))}>Hard Tests</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Bonus Points') && `#F5E049`)}]`}
                onClick={() => setTag('Bonus Points')}>Bonus Points</div>
                <div className={`border-[1px] border-black px-[10px] py-[5px] rounded-[20px]
                bg-[${(tags.includes('Great explanations') && `#F5E049`)}]`}
                onClick={() => setTag('Great explanations')}>Great explanations</div>
              </div>
            </div>
            
            {/* REVIEW */}
            <div className="flex flex-col justify-start my-5 w-full gap-y-3">
              <p className="w-max text-[20px] font-semibold">Write a review</p>
              <p className="w-[80&]">(Discuss the professor's professional abilities including teaching style and ability to convey the material clearly)</p>
              <div className="flex flex-col gap-y-5">
                <div>
                  <input className='border-[1px] border-black py-2 px-4 w-full' placeholder='Review Title'
                  {...register('title', {required: 'This field is required'})}/>
                  <ErrorMessage errors={errors} name='title'
                  render={({ message }) => <p className="text-red-500">{message}</p>}/>
                </div>
                <div>
                  <textarea  className="border-[1px] border-black h-[150px] p-4 w-full"
                  placeholder='What you want other students to know about the teacher?'
                  {...register('content', {required: 'This field is required'})}>
                  </textarea>
                  <ErrorMessage errors={errors} name='content'
                  render={({ message }) => <p className="text-red-500">{message}</p>}/>
                </div>
                <button className="w-[200px] text-white
                bg-black px-[20px] py-[7px]" type="submit">Submit</button>
              </div>
            </div>
          </form>
        ) : <></>}
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default CreateReview

function SearchResults(props) {
  return(
    <div className="border-gray-400 border-2 rounded-md overflow-scroll flex flex-col max-h-64 w-full">
    {props.searchResults.map((p, index) => {
        return (
            <span key={index} 
            className={`py-2 px-4 flex justify-between hover:bg-gray-200
            border-gray-400 ${index > 0 && 'border-t-2' }`} 
            onClick={() => props.handleClick(props.searchResults[index])}>
                <span>{p.firstName} {p.lastName}</span> 
                <span className='text-slate-500'>{p.email}</span>
            </span>
        );
    })}
    </div>
  );
}