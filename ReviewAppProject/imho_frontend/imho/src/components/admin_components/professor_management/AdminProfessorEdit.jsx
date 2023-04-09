import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from "react";
import { api_updateProfessor } from "../../../api/ProfessorsApi";

export default function AdminProfessorEdit({professor, onEdit}) {
    
    const { register, watch,setError, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            'firstName': professor.firstName,
            'lastName': professor.lastName,
            'email': professor.email,
            'facultyId': professor.facultyId,
            'universityId': professor.universityId,
        }
    });

    useEffect(() => {
        console.log(professor)
    }, [])


    async function handleApplyChanges(data) {
        await api_updateProfessor(professor.professorId, data)
        .then((data) => {
            onEdit()
        })
        .catch((err) => {
            console.log(err.response)
            if(err.response.data === 'Professor with provided email exists.')
                setError('email', { type: 'custom', message: 'Professor with provided email exists.' });
        })
    }

    return (
        <form onSubmit={handleSubmit(handleApplyChanges)}>
            {/* NAME */}
            <div className='my-4 flex flex-col gap-2'>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName"
                className='border-2 py-1 px-2 border-black max-w-md'
                {...register('firstName',
                {required: 'First Name is Required'})}/>
                <ErrorMessage errors={errors} name='firstName'
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className='my-4 flex flex-col gap-2'>
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName"
                className='border-2 py-1 px-2 border-black max-w-md'
                {...register('lastName',
                {required: 'Last Name is Required'})}/>
                <ErrorMessage errors={errors} name='lastName'
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className='my-4 flex flex-col gap-2'>
                <label htmlFor="email">E-mail: </label>
                <input type="text" name="email"
                className='border-2 py-1 px-2 border-black max-w-md'
                {...register('email',{required: 'Email is Required'})}/>
                <ErrorMessage errors={errors} name='email'
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>
    
            <div>
            <button type="submit" 
            className='py-2 px-4 border-2 border-black 
            hover:bg-black hover:text-white hover:px-12 transition-all ease-linear '>Apply Changes</button>
            </div>
        </form>
    );
}