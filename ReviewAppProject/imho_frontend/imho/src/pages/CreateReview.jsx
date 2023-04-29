import {useState, useContext, useRef, useEffect} from 'react'
import { Footer, Header } from '../components'
import yellow_pen from '../assets/yellow_pen.png'
import yes_icon from '../assets/yes.png'
import no_icon from '../assets/no.png'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate, useLocation } from 'react-router-dom'
import { api_getProfessorById } from '../api/ProfessorsApi'
import { api_getCoursesOfProfessor } from '../api/CourseApi'
import { api_getAllTags } from '../api/TagApi'
import BackArrow from '../components/admin_components/BackArrow'
import { api_CreateProfessorReview } from '../api/ProfessorReviewsApi'

// SAMPLES
// const initProf = {firstName: "Larisa", lastName: "Bazarbayeva"}
// const initCourses = [{courseId: 1, courseCode: "CSS101", courseName: "Course 101", facultyId: 2}, {courseId: 2, courseCode: "CSS102", courseName: "Course 102", facultyId: 2}];
// const initTags= [
//         {tagId: 1, tag: "Tough grader"},
//         {tagId: 2, tag: "Funny"},
//         {tagId: 3, tag: "Great explanations"},
//         {tagId: 4, tag: "Get Ready to Read"},
//         {tagId: 5, tag: "Participation Matters"},
//         {tagId: 6, tag: "Group Projects"},
//         {tagId: 7, tag: "Clear Grading Criteria"},
//       ];
const CreateReview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [professor, setProfessor] = useState(null);
  // const [professor, setProfessor] = useState(initProf);
  const [courses, setCourses] = useState([]);
  // const [courses, setCourses] = useState(initCourses);
  const {user, setUser} = useContext(UserContext);
  // const user = {id: 1, firstName: 'Name'};
  const [tags, setTags] = useState([]);
  // const [tags, setTags] = useState(initTags);
  
  const { register, setError, clearErrors, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {rating: 5, difficulty: 1, wouldTakeAgain: true, wasAttendanceMandatory: true, tags: [], courseId: -1}
  });
  const watchRating = watch('rating');
  const watchDifficulty = watch('difficulty');
  const watchTakeAgain = watch('wouldTakeAgain');
  const watchAttendance = watch('wasAttendanceMandatory');
  const watchCourse = watch('courseId');
  const watchTags = watch('tags');

  useEffect(() => {
    if(user === null) {
      navigate('/');
      return;
    }
    
    setValue('userId', user.id);
    
    if(location.state !== null) {
      loadProfessor(location.state)
      setValue('professorId', location.state);
    }
  }, [user]);

  useEffect(() => {
    if(professor !== null) {
      loadCourses(professor.professorId);
      loadTags();
    }
  }, [professor])

  async function loadProfessor(professorId) {
    await api_getProfessorById(professorId)
    .then((data) => {
      setProfessor(data);
    })
    .catch(err => console.log(err));
  }

  async function loadCourses(professorId) {
    await api_getCoursesOfProfessor(professorId)
    .then((data) => {
      console.log(data)
      setCourses(data)
    })
    .catch(err => console.log(err));
  }
  async function loadTags() {
    await api_getAllTags()
    .then(setTags)
    .catch(err => console.log(err));
  }

  async function handleSubmitReview(data) {
    
    if(watchCourse === -1) {
      setError('courseId',  { type: 'custom', message: 'Course is required' })
      return;
    }
    await api_CreateProfessorReview(data)
    .then(() => {
      navigate(-1);
    })
    .catch(err => console.log(err));
  }

  function selectTag(tag) {
    if(watchTags.some(s => s.tagId === tag.tagId)) {
      
      let index = watchTags.findIndex(s => s.tagId === tag.tagId);
      console.log(`includes ${index}`);
      setValue('tags', watchTags.filter(r => r.tagId !== tag.tagId));
      console.log(watchTags);
      return;
    }
    if(watchTags.length >= 3) {
      console.log('more than 3');
      return;
    }
    setValue('tags', [...watchTags, tag]);
    console.log(watchTags);
  }

  return (
    <>
    <Header/>
    <section className="flex justify-center pt-8 pb-32">
      <div className="flex flex-col items-center relative px-[24px] max-w-4xl">
        {professor &&
        <>
        <div className='self-start'>
          <BackArrow onBack={() => navigate(-1)} text={'Back'}/>
        </div>
        <div className="w-full text-[30px] font-bold border-b-2 border-black pb-10">
          Rate: {professor.firstName} {professor.lastName}
        </div>
        {courses.length ?
          <form onSubmit={handleSubmit(handleSubmitReview)}
            className='w-full relative my-6' autoComplete='off'>
            <img className="-z-50 h-40 w-40 absolute top-20 right-0" src={yellow_pen} />
            
            
            {/* COURSE CODE */}
            <div className='flex flex-col sm:flex-row gap-y-[8px] w-full gap-x-10 items-center'>
              <div className='w-80'>
                <p className="w-max text-[20px] font-semibold">Select Course Code:</p>
              </div>
              <select className="border-black border-[1px] px-[20px] py-[7px] cursor-pointer"
              value={watchCourse} onChange={(e) => {
                setValue('courseId', parseInt(e.target.value))
                clearErrors('courseId');
                }}>
                <option value={-1}>Course code: </option>

                {courses.map((c) => { 
                    return (<option key={c.courseId} value={c.courseId}>{c.courseName}</option>);
                })}
              </select>
            </div>
            <ErrorMessage errors={errors} name='courseId'
                render={({ message }) => <p className="text-red-500">{message}</p>}/>

            {/* RATE PROFESSOR */}
            <div className="flex flex-col sm:flex-row gap-y-[8px] my-8 w-full gap-x-10 items-start">
              <p className="w-80 text-[20px] font-semibold">Rate Your Professor:</p>
                <div>
                  <div className="flex justify-start gap-x-2 items-center cursor-pointer">
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchRating === 5 && `bg-[#97C1A9]`)}`} onClick={() => setValue('rating', 5)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchRating === 4 && `bg-[#CCE2CB]`)}`} onClick={() => setValue('rating', 4)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchRating === 3 && `bg-[#FBEAC2]`)}`} onClick={() => setValue('rating', 3)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchRating === 2 && `bg-[#FFDAC1]`)}`} onClick={() => setValue('rating', 2)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchRating === 1 && `bg-[#FFB8B1]`)}`} onClick={() => setValue('rating', 1)}></div>
                  </div>
                  <p className="text-center">
                    {watchRating === 5 && '5 - Awesome'}
                    {watchRating === 4 && '4 - Good'}
                    {watchRating === 3 && '3 - So so'}
                    {watchRating === 2 && '2 - Bad'}
                    {watchRating === 1 && '1 - Really Bad'}
                  </p>
                </div>
            </div>

            {/* DIFFICULITY */}
            <div className="flex flex-col sm:flex-row gap-y-[8px] my-8 w-full gap-x-10 items-start">
              <p className="w-80 text-[20px] font-semibold">How difficult was the professor?</p>
                <div>
                  <div className="flex justify-start gap-x-2 items-center cursor-pointer">
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchDifficulty === 1 && `bg-[#97C1A9]`)}`} onClick={() => setValue('difficulty', 1)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchDifficulty === 2 && `bg-[#CCE2CB]`)}`} onClick={() => setValue('difficulty', 2)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchDifficulty === 3 && `bg-[#FBEAC2]`)}`} onClick={() => setValue('difficulty', 3)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchDifficulty === 4 && `bg-[#FFDAC1]`)}`} onClick={() => setValue('difficulty', 4)}></div>
                    <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                    ${(watchDifficulty === 5 && `bg-[#FFB8B1]`)}`} onClick={() => setValue('difficulty', 5)}></div>
                  </div>
                  {watchDifficulty === 1 && <p className="text-center">1 - Very easy</p>}
                  {watchDifficulty === 2 && <p className="text-center">2 - Easy</p>}
                  {watchDifficulty === 3 && <p className="text-center">3 - Mid</p>}
                  {watchDifficulty === 4 && <p className="text-center">4 - Difficult</p>}
                  {watchDifficulty === 5 && <p className="text-center">5 - Very difficult</p>}
                </div>
            </div>

            {/* WOULD YOU TAKE AGAIN */}
            <div className="flex flex-col sm:flex-row gap-y-[8px] my-8 w-full gap-x-10 items-start">
              <p className="w-80 text-[20px] font-semibold">Would you take this professor again?</p>
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
            <div className="flex flex-col sm:flex-row gap-y-[8px] my-8 w-full gap-x-10 items-start">
              <p className="w-80 text-[20px] font-semibold">Was attendance mandatory?</p>
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
            <div className="flex flex-col sm:flex-row gap-y-[8px] my-8 w-full gap-x-10 items-center">
              <p className="w-80 text-[20px] font-semibold">Select grade recieved:</p>
                <select className="max-h-[60px]
                border-black border-[1px] px-[20px] py-[7px] cursor-pointer">
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
            {tags.length > 0 && (
              <div className="flex flex-col justify-start my-5 w-full gap-x-10">
                <p className="w-max text-[20px] font-semibold">Select up to 3 tags</p>
                <div className="flex flex-wrap justify-start my-5 gap-2 cursor-pointer">
                  {tags.map((t) => {
                    return (
                      <div key={t.tagId} onClick={() => selectTag(t)}
                      className={`border-[1px] border-black px-[10px] py-[5px] 
                      rounded-[20px] bg-[${watchTags.some(s => s.tagId === t.tagId) && '#F5E049'}]`}>
                        {t.tag}
                      </div>
                    );
                  })}
                  
                  
                  
                  {/* bg-[${(tags.includes('Great explanations') && `#F5E049`)}]`}
                  onClick={() => setTag('Great explanations')}>Great explanations</div> */}
                </div>
              </div>
            )}
            
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
                <ErrorMessage errors={errors} name='reviewExists'
                  render={({ message }) => <p className="text-red-500">{message}</p>}/>
              </div>
            </div>
          </form>
        : <>
        <p>Professor currently have no courses</p>
        </>}
        </>
        }
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