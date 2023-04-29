import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { api_getUniversityById } from "../api/UniversityApi";
import { Header, Footer } from "../components";
import BackArrow from "../components/admin_components/BackArrow";
import thumb_up from '../assets/thumb_up.svg'
import thumb_down from '../assets/thumb_down.svg'

// ICONS
import ReputationIcon from '../assets/uni_rating/reputation_icon.png';
import OpportunitiesIcon from '../assets/uni_rating/opportunities_icon.png';
import InternetIcon from '../assets/uni_rating/internet_icon.png';
import SafetyIcon from '../assets/uni_rating/safety_icon.png';
import LocationIcon from '../assets/uni_rating/location_icon.png';
import HappinessIcon from '../assets/uni_rating/happiness_icon.png';
import ClubsIcon from '../assets/uni_rating/clubs_icon.png';
import FacilitiesIcon from '../assets/uni_rating/facilities_icon.png';
import SocialIcon from '../assets/uni_rating/social_icon.png';
import FoodIcon from '../assets/uni_rating/food_icon.png';
import { api_DislikeUniversityReview, api_LikeUniversityReview, api_getReviewsOfUniversity } from "../api/UniversityReviewsApi";

// const initUni = {
//     id: 1,
//     name: "Suleymen Demirel University",
//     rating: 3.9,
//     overalRate: {
//         reputation: 4,
//         opportunities: 4,
//         internet: 5,
//         safety: 2,
//         location: 4,
//         happiness: 4,
//         clubs: 5,
//         facilities: 3,
//         social: 3,
//         food: 2,
//     },
// };

// const initReviews = [
//     {
//         id: 1,
//         rating: 5.0,
//         createdOn: "28th September, 2022",
//         content: 'Amazing school. I love it here but it is difficult and the food is kinda bad. Parties are good too.',
//         likes: 5,
//         dislikes: 3,

//         reputation: 5,
//         opportunities: 4,
//         internet: 5,
//         safety: 2,
//         location: 4,
//         happiness: 4,
//         clubs: 5,
//         facilities: 3,
//         social: 3,
//         food: 2,
//     },
//     {
//         id: 1,
//         rating: 5.0,
//         createdOn: "28th September, 2022",
//         content: 'Amazing school. I love it here but it is difficult and the food is kinda bad. Parties are good too.',
//         likes: 5,
//         dislikes: 3,

//         reputation: 5,
//         opportunities: 4,
//         internet: 5,
//         safety: 2,
//         location: 4,
//         happiness: 4,
//         clubs: 5,
//         facilities: 3,
//         social: 3,
//         food: 2,
//     }

// ];

const rateColor = ['#DADADA', '#FFB8B1', '#FFDAC1', '#FBEAC2', '#CCE2CB', '#97C1A9'];

const UniReviewInfo = () => {
    const {user, setUser} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    // const [reviews, setReviews] = useState(initReviews);
    const [reviews, setReviews] = useState([]);
    // const [uni, setUni] = useState(initUni);
    const [uni, setUni] = useState(null);

    useEffect(() => {
        if(location.state)
            loadUni(location.state);
    }, []);
    useEffect(()=>{
        if(uni !== null) {
            loadReviews();
            console.log(uni)
        }
    }, [uni]);

    function handleRateClick() {
        if(user !== null)
            navigate('/new-uni-review', {state:uni.id});
    }

    async function loadUni(id) {
        await api_getUniversityById(id)
            .then((data) => {
                console.log(data);
                setUni(data);
            });
    };

    // IMPORTANT
    // LOAD UNIVERSITY REVIEWS
    async function loadReviews() {
        await api_getReviewsOfUniversity(uni.id)
        .then(setReviews)
        .catch(err => console.log(err))

    }

    return(
        <>
            <Header/>
            {uni && 
                <section id="uni_review_info" className=" px-[24px] flex flex-col justify-center items-center">
                    <div className='flex flex-col w-full md:w-[850px] items-left py-16 gap-y-16'>
                        <div>
                            <BackArrow onBack={()=>navigate(-1) } text={'Back'} />    
                            <p className="text-[33px] font-bold">{uni.name}</p>
                            <div className='w-full md:w-[850px] flex justify-center sm:justify-start'>            
                                <button className="w-[200px] border-black border-[1px] rounded-[10px] bg-[#F5E049] px-[20px] py-[7px]" onClick={handleRateClick}>Rate University</button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full gap-x-[32px] gap-y-[8px]">
                            <div className="w-full sm:w-[200px] flex flex-col justify-center items-center md:items-start">
                                <p className="text-[64px]">{uni.rating}</p>
                                <p className="font-bold">overall quality</p>
                            </div>
                            <div className="flex flex-col gap-y-[8px] items-center gap-y-[8px] sm:w-[240px]">
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={ReputationIcon} alt="" />
                                    </div>
                                    <p className="grow">Reputation</p>
                                    <RatingCell value={uni.reputation}/>                                
                                </div>
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={OpportunitiesIcon} alt="" />
                                    </div>
                                    <p className="grow">Opportunities</p>
                                    <RatingCell value={uni.opportunities}/>                                      
                                </div>
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={InternetIcon} alt="" />
                                    </div>
                                    <p className="grow">Internet</p>
                                    <RatingCell value={uni.internet}/>                                        
                                </div>
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={SafetyIcon} alt="" />
                                    </div>
                                    <p className="grow">Safety</p>
                                    <RatingCell value={uni.safety}/>                                      
                                </div>
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={LocationIcon} alt="" />
                                    </div>
                                    <p className="grow">Location</p>
                                    <RatingCell value={uni.location}/>                                       
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-[8px] items-center gap-y-[8px] sm:w-[240px]">
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={HappinessIcon} alt="" />
                                    </div>
                                    <p className="grow">Happiness</p>
                                    <RatingCell value={uni.happiness}/>                                 
                                </div>
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={ClubsIcon} alt="" />
                                    </div>
                                    <p className="grow">Clubs</p>
                                    <RatingCell value={uni.clubs}/>                                       
                                </div>
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={FacilitiesIcon} alt="" />
                                    </div>
                                    <p className="grow">Facilities</p>
                                    <RatingCell value={uni.facilities}/>                                       
                                </div>
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={SocialIcon} alt="" />
                                    </div>
                                    <p className="grow">Social</p>
                                    <RatingCell value={uni.social}/>
                                </div>
                                <div className="flex flex-row gap-x-[16px] w-full">
                                    <div className="flex w-[36px] h-[36px] items-center justify-center">
                                        <img className="" src={FoodIcon} alt="" />
                                    </div>
                                    <p className="grow">Food</p>
                                    <RatingCell value={uni.food}/>                                       
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
            <section id="uni_review_info2" className="w-full sm:w-[850px] sm:m-auto flex flex-col items-center gap-y-5 px-[24px] md:px-0 py-[50px] border-b-2 border-black">
                <div className="w-full flex justify-start border-b-2 border-black">
                <p className="border-b-2 border-black pb-[10px]">{reviews.length} students ratings</p>
                </div>
                <div className="w-full flex items-start">
                    <select className="w-[200px] border-black border-[1px] px-[10px] py-[5px]">
                        <option value="all">All courses</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="w-full flex flex-col mt-[30px] gap-y-[20px]">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => {
                        return (
                            <ReviewListItem key={index} review={review} index={index} loadReviews={loadReviews}/>
                        );
                        })
                    ) : <></>}
                </div>
            </section>
            <Footer />
        
        </>
    );
}

export default UniReviewInfo;


function ReviewListItem({review, index, loadReviews}) {
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        console.log(review)
    }, [])
  
    async function handleDislike() {
        if(user !== null) {
            await api_DislikeUniversityReview(review.id, user.id)
                .then((data) => {
                    loadReviews();
                })
                .catch(err => console.log(err))
        }
    }
  
    async function handleLike() {
        if(user !== null) {
            await api_LikeUniversityReview(review.id, user.id)
                .then((data) => {
                    console.log(data);
                    loadReviews();
                })
                .catch(err => {
                    console.log(err)
                    return
                })
        }
    }
  
    return (
        <div className={`flex w-full bg-[#F9F9F9] border-black border-[1px] p-[20px]`}>
            <div className="flex flex-col gap-y-2 items-center">
                <p className="text-[12px] sm:text-[15px] font-semibold">OVERALL</p>
                <div className="flex justify-center items-center font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
                    {review.rating}
                </div>
            </div>
            <div className="flex flex-col w-full min-h-max ml-[20px] gap-y-[5px]">
                <div className="flex flex-row justify-between">
                    <p className="font-semibold">{review.user.firstName} {review.user.lastName}</p>
                    <p className="text-[13px]">{review.createdOn}</p>
                </div>
  
                <div className="my-[10px] grow">
                    <p className="text-[13px]">{review.review}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-y-[16px] gap-x-[32px]">
                    <div className="flex flex-col w-[240px] gap-y-[16px]">            
                        <RatingValue name="Repuitation" value={review.reputation}/>
                        <RatingValue name="Opportunities" value={review.opportunities}/>
                        <RatingValue name="Internet" value={review.internet}/>
                        <RatingValue name="Safety" value={review.safety}/>
                        <RatingValue name="Location" value={review.location}/>
                    </div>
                    <div className="flex flex-col w-[240px] gap-y-[16px]">            
                        <RatingValue name="Happiness" value={review.happiness}/>
                        <RatingValue name="Clubs" value={review.clubs}/>
                        <RatingValue name="Facilities" value={review.facilities}/>
                        <RatingValue name="Social" value={review.social}/>
                        <RatingValue name="Food" value={review.food}/>
                    </div>
                    <div className="grow flex flex-col h-full justify-end">
                        <div className="flex justify-end w-full">
                            <div className="flex justify-start w-[100px] gap-[16px]">
                                <div className='cursor-pointer flex items-center' onClick={handleLike}>
                                    <p className="text">{review.likes}</p>
                                    <img className="mr-[5px] h-[20px]" src={thumb_up} />
                                </div>
                                <div className='cursor-pointer flex items-center' onClick={handleDislike}>
                                    <p className="text">{review.dislikes}</p>
                                    <img className="mr-[5px] h-[20px]" src={thumb_down} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function RatingValue({name='',value=0}) {
    return (
        <div className="flex flex-row w-full flex-wrap">
            <div className="grow">{name}</div>
            <div className="flex flex-row gap-x-[4px]">
                {[1,2,3,4,5].map((item)=>
                    <div key={item} className={`w-[24px] h-[24px] rounded-[50%] bg-[${item<=value ? rateColor[value] : rateColor[0]}]`}/>
                )}
            </div>
        </div>
    );
}

function RatingCell({value}) {
    return (
        <div className={`flex font-semibold text-sm items-center justify-center w-[40px] h-[40px] bg-[${rateColor[Math.round(value)]}]`}>
            <p>{value}</p>
        </div>
    );
}