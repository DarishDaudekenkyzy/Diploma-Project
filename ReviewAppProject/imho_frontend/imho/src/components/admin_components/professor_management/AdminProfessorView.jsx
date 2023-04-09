import { useEffect, useState } from "react";
import { api_getCoursesOfProfessor } from "../../../api/CourseApi";

export default function AdminProfessorView({professor, university, faculty}) {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        loadCoursesOfProfessor()
    }, [])

    async function loadCoursesOfProfessor() {
        await api_getCoursesOfProfessor(professor.professorId)
        .then(setCourses)
        .catch(err => console.log(err));
    }
    return (
        <>
        <p className="font-semibold text-xl">
                Information</p>
        <table className="my-4 border-collapse max-w-xl">
            <tbody className="my-2">
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">University:</td>
                    <td className="py-2 px-4 border border-slate-400">{university.name}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Faculty</td>
                    <td className="py-2 px-4 border border-slate-400">{faculty.facultyName}</td>
                </tr>
                <tr className="">
                    <td className="w-64 py-2 px-4 border border-slate-400">Email</td>
                    <td className="py-2 px-4 border border-slate-400">{professor.email}</td>
                </tr>
                <tr>
                    <td className="w-64 py-2 px-4 border border-slate-400">Would Take Again Percentage:</td>
                    <td className="py-2 px-4 border border-slate-400">{professor.wouldTakeAgainPercentage}%</td>
                </tr>
                <tr>
                    <td className="w-64 py-2 px-4 border border-slate-400">Difficulty Percentage:</td>
                    <td className="py-2 px-4 border border-slate-400">{professor.difficultyPercentage}%</td>
                </tr>
                <tr>
                    <td className="w-64 py-2 px-4 border border-slate-400">Rating:</td>
                    <td className="py-2 px-4 border border-slate-400">{professor.rating}/5</td>
                </tr>
                <tr>
                    <td className="w-64 py-2 px-4 border border-slate-400">Reviews Count:</td>
                    <td className="py-2 px-4 border border-slate-400">{professor.reviewsCount}</td>
                </tr>
            </tbody>            
        </table>
        {courses.length > 0 &&
        <div className="my-4">
            <p className="font-semibold text-xl mb-4">
                Courses of {professor.firstName} {professor.lastName} ({courses.length})</p>

            <div className='my-2 border border-slate-400 overflow-scroll max-h-72 max-w-xl'>
                {courses.map((course, index) => {
                return (
                    <div key={index} className={`py-2 px-4 ${index!==0 && 'border-t'}
                    flex gap-2 border-slate-400`}>
                        <span className='font-semibold'>{course.courseCode}</span>
                        <span>{course.courseName}</span>
                    </div>
                );
                })}
            </div>
        </div>
        }
        </>
    );
}