import { useEffect } from "react";

export default function AdminReviewView({review}) {
    useEffect(() => console.log(review), [])
    return (
        <>
        <table className="my-4 border-collapse max-w-xl">
            <tbody className="my-2">
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Title:</td>
                    <td className="py-2 px-4 border border-slate-400">{review.title}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Content</td>
                    <td className="py-2 px-4 border border-slate-400">{review.content}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Rating</td>
                    <td className="py-2 px-4 border border-slate-400">{review.rating}/5</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Difficulty</td>
                    <td className="py-2 px-4 border border-slate-400">{review.difficulty}/5</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Would Take Again</td>
                    <td className="py-2 px-4 border border-slate-400">{review.wouldTakeAgain ? 'Yes' : 'No'}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Mandatory Attendance</td>
                    <td className="py-2 px-4 border border-slate-400">{review.wasAttendanceMandataory ? 'Yes' : 'No'}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">User</td>
                    <td className="py-2 px-4 border border-slate-400">{review.user.firstName} {review.user.lastName}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Professor</td>
                    <td className="py-2 px-4 border border-slate-400">{review.professor.firstName} {review.professor.lastName}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Course</td>
                    <td className="py-2 px-4 border border-slate-400">{review.course.courseCode} -  {review.course.courseName}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Created On</td>
                    <td className="py-2 px-4 border border-slate-400">{review.createdOn}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Likes</td>
                    <td className="py-2 px-4 border border-slate-400">{review.likes}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Dislikes</td>
                    <td className="py-2 px-4 border border-slate-400">{review.dislikes}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Tags</td>
                    <td className="py-2 px-4 border border-slate-400">
                    {review.tags && review.tags.map((tag, index) => {
                        return(
                            <span key={index}>{index !== 0 && ', '}{tag.tag}</span>
                        );
                    })}
                    </td>
                </tr>
            </tbody>            
        </table>
        </>
    );
}