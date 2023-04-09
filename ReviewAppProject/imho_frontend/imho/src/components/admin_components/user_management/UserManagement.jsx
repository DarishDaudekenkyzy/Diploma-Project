import { useEffect, useState } from "react";
import { api_deleteUser, api_getAllUsers, api_searchUser } from "../../../api/UserApi";
import eye from '../../../assets/eye.svg';
import pen from '../../../assets/pen.svg';
import trash from '../../../assets/trash.svg';
import BackArrow from "../BackArrow";
import AdminSearchInput from "../AdminSearchInput";
import Loading from "../../Loading";
import AdminUserView from "./AdminUserView";

export default function UserManagement() {
    const [viewUser, setViewUser] = useState(false);
    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        loadAllUsers();
    }, [])

    async function loadAllUsers() {
        setLoading(true);
        await api_getAllUsers()
        .then((data) => {
            setUsers(data);
            console.log(data);
        })
        .catch(err => console.log(err));
        setLoading(false);
    }
    async function handleDeleteUser(userId) {
        await api_deleteUser(userId)
        .then(loadAllUsers)
        .catch(err => console.log(err));
    }
    async function handleSearch(searchInput) {
        if(searchInput !== '') {
            setLoading(true);
            await api_searchUser(searchInput)
            .then(setUsers)
            .catch(err => console.log(err));
            setLoading(false);
        } else {
            loadAllUsers();
        }
    }
    return (
        <div className="flex flex-col px-8">
            <p className={`md:text-[35px] mb-6`}>User Management</p>

            {viewUser && user && 
            <>
            <BackArrow onBack={() => {setUser(null); setViewUser(false)}} text={`Back`}/>
            <AdminUserView user={user}/>
            </>
            }
            { loading && <Loading/> }
            {!viewUser && !user &&
            <div className='mt-4'>
            <AdminSearchInput onChange={handleSearch} placeholder={'Search Users'}/>
                {users.length > 0 ?
                <table className='table-fixed w-full border-collapse'>
                    <thead>
                        <tr className=''>
                            <th className='py-2 text-start'>Name</th>
                            <th className='py-2 text-start'>Email</th>
                            <th className='py-2 text-start'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return <UserListItemView key={index} user={user}
                            handleViewUser={() => {setViewUser(true); setUser(user)}}
                            handleDeleteUser={() => {handleDeleteUser(user.userId)}}/>
                        })}
                    </tbody>
                </table>
                :
                <div className="my-4">
                    <p className="text-lg">Users Not Found</p>
                </div>
                }
                
            </div>
            }
        </div>
    );
}

function UserListItemView({user, handleViewUser, handleDeleteUser}) {
    return(
        <tr className=''>
            <td className='py-3 border-y border-gray-400'>{user.firstName} {user.lastName}</td>
            <td className='py-3 border-y border-gray-400'>{user.email}</td>
            <td className='py-3 border-y border-gray-400'>
                <div className='flex items-center gap-2'>
                    <img className='h-8 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={eye} alt="viewImg" onClick={handleViewUser}/>
                    <img className='h-6 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={trash} alt="trashImg" onClick={handleDeleteUser}/>
                </div>
            </td>
        </tr>
    );
}