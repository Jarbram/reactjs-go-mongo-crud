import React, {useEffect, useState} from 'react'
import './users.css'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BiEdit} from 'react-icons/bi'
import EditForm from '../editForm/editForm'


function Users  ()  {
    const [users, setUsers] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [editUser,setEditUser] = useState('')

    const handleClick = (user) => {
        setEditUser(user);
        setIsShown(current => !current);
        
    };


    async function loadUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data.users);
    }

    async function DeleteData(id)
    {
        let result = await fetch("/api/users" + id, {
            method: 'DELETE'
        });
        const data = await result.json();
        console.warn(data);
        loadUsers()
    }

    useEffect(() => {
    loadUsers();
    });


    
    return (
        <div className="participants_container">
        <h1 className="participants_title">USERS IN DATABASE</h1>
        {isShown && (<EditForm user={editUser}/>)}


        <div className="users_container">
        {users.map(user => (
            
            <ul className="users" key={user._id}>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>Password:{user.password}</li>

            <li>
            <a 
            className="delete"
            onClick={()=>DeleteData(user._id)}
            >
            <AiTwotoneDelete />
            </a>

            <a
            className="edit"
            onClick={()=>handleClick(user)}
            >
            <BiEdit />
            </a>
            </li>

            </ul>
        ))}

        
        
        </div>
        
        </div>
    )
}



export default Users