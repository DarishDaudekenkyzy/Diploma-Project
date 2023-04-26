import React, { useContext, useEffect, useState } from "react";
import yellow_pen from '../assets/yellow_pen.png'
import { Footer, Header } from '../components'
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { api_getUniversityById } from "../api/UniversityApi";
import BackArrow from "../components/admin_components/BackArrow";
import { api_CreateUniversityReview } from "../api/UniversityReviewsApi";

// const initUniversity = {
//     id: 1,
//     name: 'Suleyman Demirel University',
// }

const CreateUniReview = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [uni, setUni] = useState(null);
    // const [uni, setUni] = useState(initUniversity);
    const {user, setUser} = useContext(UserContext);

    const { register, setError, clearErrors, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm(
        {defaultValues: 
            {
                review: '',
                reputation: 1,
                opportunities: 1,
                internet: 1,
                safety: 1,
                location: 1,
                happiness: 1,
                clubs: 1,
                facilities: 1,
                social: 1,
                food: 1,
            }
        }
    );
    // const watchContent = watch('content');    
    const watchReputation = watch('reputation');
    const watchOpportunities = watch('opportunities');
    const watchInternet = watch('internet');
    const watchSafety = watch('safety');
    const watchLocation = watch('location');
    const watchHappiness = watch('happiness');
    const watchClubs = watch('clubs');
    const watchFacilities = watch('facilities');
    const watchSocial = watch('social');
    const watchFood = watch('food');
    useEffect(() => {
        if(user === null){
            navigate('/uni-review-info', {state:location.state});
            return;
        }

        setValue('userId', user.id);
        if(location.state !== null){
            loadUniversity(location.state);
            setValue('universityId', location.state);
        }
    }, [user]);

    async function loadUniversity(id){
        await api_getUniversityById(id)
        .then((data)=>{
            console.log(data);
            setUni(data);
        })
        .catch(err => console.log(err));
    }

    async function handleSubmitReview(data) {
        await api_CreateUniversityReview(data)
        .then((data) => {
            navigate('/uni-review-info', {state:location.state});
        })
        .catch(err => console.log(err));
    }


    return (
        <>
            <Header />
            <section className="flex justify-center pt-8 pb-32">
                <div className="flex flex-col items-center relative px-[24px] w-full  md:w-[850px]">
                    {uni && 
                    <>
                        <div className="self-start">
                            <BackArrow onBack={() => navigate(-1)} text={'Back'} />
                        </div>
                        <div className="w-full text-[30px] font-bold border-b-2 border-black pb-10">
                            Rate: {uni.name}
                        </div>
                        <form onSubmit={handleSubmit(handleSubmitReview)} className='w-full relative my-6' autoComplete='off'>
                            <img className="hidden sm:block -z-50 h-[150px] absolute top-20 right-0" src={yellow_pen} />
                            <div className="w-full sm:w-[500px]">                            
                                <RateInput label="Reputation" name="reputation" setValue={setValue} watch={watchReputation} />
                                <RateInput label="Opportunities" name="opportunities" setValue={setValue} watch={watchOpportunities} />
                                <RateInput label="Internet" name="internet" setValue={setValue} watch={watchInternet} />
                                <RateInput label="Safety" name="safety" setValue={setValue} watch={watchSafety} />
                                <RateInput label="Location" name="location" setValue={setValue} watch={watchLocation} />
                                <RateInput label="Happiness" name="happiness" setValue={setValue} watch={watchHappiness} />
                                <RateInput label="Clubs" name="clubs" setValue={setValue} watch={watchClubs} />
                                <RateInput label="Facilities" name="facilities" setValue={setValue} watch={watchFacilities} />
                                <RateInput label="Social" name="social" setValue={setValue} watch={watchSocial} />
                                <RateInput label="Food" name="food" setValue={setValue} watch={watchFood} />
                            </div>
                            {/* REVIEW */}
                            <div className="flex flex-col justify-start my-5 w-full gap-y-3">
                                <p className="w-max text-[20px] font-semibold">Write a review</p>
                                <p className="w-[80&]">(Discuss the professor's professional abilities including teaching style and ability to convey the material clearly)</p>
                                <div className="flex flex-col gap-y-5">
                                    <div>
                                        <textarea  className="border-[1px] border-black h-[150px] p-4 w-full"
                                            placeholder='What you want other students to know about the teacher?' 
                                            {...register('review', {required: 'This field is required'})}>
                                        </textarea>
                                        <ErrorMessage errors={errors} name='content' render={({ message }) => <p className="text-red-500">{message}</p>}/>
                                    </div>
                                    <button className="w-[200px] text-white bg-black px-[20px] py-[7px]" type="submit">Submit</button>
                                    <ErrorMessage errors={errors} name='reviewExists' render={({ message }) => <p className="text-red-500">{message}</p>}/>
                                </div>
                            </div>
                        </form>
                    </>
                    }
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CreateUniReview;

function RateInput({label='',setValue, name='', watch}) {
    return (
        <div className="flex flex-col xs:flex-row gap-y-[8px] justify-between my-5 w-full gap-x-10 items-center">
            <p className="w-max text-[20px] font-semibold">{label}:*</p>
            <div>
                <div className="flex justify-start gap-x-2 items-center cursor-pointer">
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${(watch > 0 && `bg-[#FFB8B1]`)}`} onClick={() => setValue(name, 1)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${(watch > 1 && `bg-[#FFDAC1]`)}`} onClick={() => setValue(name, 2)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${(watch > 2 && `bg-[#FBEAC2]`)}`} onClick={() => setValue(name, 3)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${(watch > 3 && `bg-[#CCE2CB]`)}`} onClick={() => setValue(name, 4)}></div>
                <div className={`w-[30px] h-[30px] rounded-[50%] border-[1px] border-black
                ${(watch === 5 && `bg-[#97C1A9]`)}`} onClick={() => setValue(name, 5)}></div>
                </div>
                <p className="text-center">
                {watch === 5 && '5 - Awesome'}
                {watch === 4 && '4 - Good'}
                {watch === 3 && '3 - So so'}
                {watch === 2 && '2 - Bad'}
                {watch === 1 && '1 - Really Bad'}
                </p>
            </div>
        </div>
    );
}