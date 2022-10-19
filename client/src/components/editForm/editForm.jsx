import React,{useState} from 'react'
import './editForm.css'

function EditForm(props){
    const [username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
    
    const handleEditSubmit= async(e,id)=>{
        e.preventDefault();
        console.log(id)
        const response = await fetch('api/users/' + id, {
        method: 'PUT',
        body: JSON.stringify({username,email,password}),
        headers: {
            'Content-Type': 'application/json',
        }
        })

        const data = await response.json()
        console.warn(data)
    }

    return(
        <div className="edit_container">
        <h1 className="edit_title">EDIT USER</h1>

        <form className="editForm" onSubmit={()=>handleEditSubmit(props.user._id)} >
    <div className="input_editContainer">
        <h3>Username:{props.user.username}</h3>
        <input 
        className="editForm_input"
        type="username" 
        placeholder="Write your username" 
        onChange={e => setUsername(e.target.value)       
        }
        />
    </div>

    <div className="input_editContainer">
        <h3>Email:{props.user.email}</h3>
        <input className="editForm_input"
        type="email"
        placeholder="Write your email"
        onChange={e => setEmail(e.target.value)}
        />

    </div>

    <div className="input_editContainer">
        <h3>Password:{props.user.password}</h3>
        <input className="editForm_input"
        type="password"
        placeholder="Write your password"
        onChange={e => setPassword(e.target.value)}
        />
    </div>
        <button className="btn btn-primary" >Submit</button>
        </form>
        
        </div>
        
    )
}

export default EditForm