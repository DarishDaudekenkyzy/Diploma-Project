import { useEffect, useState } from "react";
import { api_getProfessorReviewsOfUser } from "../../../api/ProfessorReviewsApi";

export default function AdminUserView({user}) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadUserReviews(user.userId);
    }, [])

    async function loadUserReviews(userId) {
        await api_getProfessorReviewsOfUser(userId)
        .then((data) => {
            console.log(data)
            setReviews(data)
        })
        .catch(err => console.log(err));
    }

    return(
        <>
        <p className="my-4 text-2xl">{user.firstName} {user.lastName}</p>
        <table className="my-4 border-collapse max-w-lg">
            <tbody className="my-2">
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Firstname</td>
                    <td className="py-2 px-4 border border-slate-400">{user.firstName}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Lastname</td>
                    <td className="py-2 px-4 border border-slate-400">{user.lastName}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Email</td>
                    <td className="py-2 px-4 border border-slate-400">{user.email}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Year</td>
                    <td className="py-2 px-4 border border-slate-400">{user.year}</td>
                </tr>
            </tbody>            
        </table>
        {reviews.length > 0 ?
        <div className="my-4">
            <p className="font-semibold text-xl mb-4">Reviews</p>
            <p>{reviews.length} by {user.firstName} {user.lastNmae}</p>

            <div className='my-2 border border-slate-400 overflow-scroll max-h-72 max-w-xl'>
                {reviews.map((review, index) => {
                return (
                    <div key={index} className={`py-2 px-4 ${index!==0 && 'border-t'}
                    flex gap-2 border-slate-400`}>
                        <span className='font-semibold'>{review.courseCode}</span>
                        <span>{review.courseName}</span>
                    </div>
                );
                })}
            </div>
        </div>
        : 
        <div className="my-4">
            <p className="font-semibold text-xl mb-4">Reviews</p>
            <p>No Reviews by {user.firstName} {user.lastName}</p>
        </div>}
        </>
    );
}