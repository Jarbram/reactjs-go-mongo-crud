import React, {useState} from 'react'
import './form.css'


function Form  () {
  const [username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");


  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch("/api/users",{
      method: 'POST',
      body: JSON.stringify({username,email,password}),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()
    console.log(data);

  };


  return (
    <div className="form_container">
    
      <form className="form" onSubmit={handleSubmit}>
      <h1>REGISTER</h1>
<div className="input_container">
        <h3>Username</h3>
        <input 
        className="form_input"
        type="username" 
        placeholder="Write your username" 
        onChange={e => setUsername(e.target.value)       
        }
        pattern="^[A-Za-z0-9]{3,16}$"
        required={true}
        />
        <span>Username should be 3-16 characters and shouldn't include any special characters!</span>
</div>

<div className="input_container">
<h3>Email</h3>
        <input className="form_input"
        type="email"
        placeholder="Write your email"
        onChange={e => setEmail(e.target.value)}
        required={true}
        />
        <span>It should be a valid email address!</span>
</div>

<div className="input_container">
<h3>Password</h3>
        <input className="form_input"
        type="password"
        placeholder="Write your password"
        onChange={e => setPassword(e.target.value)}
        pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
        required={true}
        />
        <span>Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</span>
</div>

      <button type="submit" className="btn btn-primary">Submit</button>

      </form>
      
    
    
    </div>
  )
}

export default Form