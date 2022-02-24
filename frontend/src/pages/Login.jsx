import { useState, useEffect } from 'react'   
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify' 
import { login, reset } from '../features/auth/authSlice' 
import Spinner from '../components/Spinner'
import { FaSignInAlt } from 'react-icons/fa'  

function Login() {  

    const [formData, setFormData] = useState({    
        
        email: '',  
        password: '', 
        
    })

    const { email, password } = formData 

    const navigate = useNavigate()
    const dispatch = useDispatch() 

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(
        () => {
            if(isError){ toast.error(message) } 

            if(isSuccess || user) {
                navigate('/')
            }

            dispatch(reset())
        }, [ user, isError, isSuccess, message, navigate, dispatch] 
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

        const userData = {
            email,
            password
        }

        dispatch(login(userData))

    }

    if (isLoading) {
        return <Spinner/> 
    } 

  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt/> Login
            </h1>
            <p>Login and start creating goals</p>   
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                        <input type="email" className="form-control" id="email" 
                        name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
                </div>
                <div className="form-group">
                        <input type="password" className="form-control" id="password" 
                        name="password" value={password} placeholder="Enter a password" onChange={onChange}/>
                </div>
            
            
                <div className="form-group">  
                    <button type="submit" className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login