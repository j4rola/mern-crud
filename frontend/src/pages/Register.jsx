import { useState, useEffect } from 'react'   
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify' 
import { FaUser } from 'react-icons/fa'  
import { register, reset } from '../features/auth/authSlice'


function Register() {  

    const [formData, setFormData] = useState({    
        name: '',
        email: '',  
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData 

    const navigate = useNavigate()
    const dispatch = useDispatch() 

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    const onChange = (e) => {
        setFormData(
            (prevState) => ({ 
                ...prevState, //<- This line creates a copy of the formData variable called 'prevState'. 
                [e.target.name]: e.target.value, //<- This line gets the name of the input tag from the input event and sets 
                //it to the value of the input. For example if I type 'John@gmail.com' in the name input, this line 
                //would effectively read: email: "John@gmail.com". This overides the value for email in the state object.
            })    
        )
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaUser/> Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <div className="form-group">
                <form >
                    <input type="text" className="form-control" id="name" 
                    name="name" value={name} placeholder="Enter your name" onChange={onChange}/>
                </form>
            </div>
            <div className="form-group">
                <form >
                    <input type="email" className="form-control" id="email" 
                    name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
                </form>
            </div>
            <div className="form-group">
                <form >
                    <input type="password" className="form-control" id="password" 
                    name="password" value={password} placeholder="Enter a password" onChange={onChange}/>
                </form>
            </div>
            <div className="form-group">
                <form >
                    <input type="password" className="form-control" id="password2" 
                    name="password2" value={password2} placeholder="Confirm your password" onChange={onChange}/>
                </form>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-block">
                    Submit
                </button>
            </div>
        </section>
    </>
  )
}

export default Register