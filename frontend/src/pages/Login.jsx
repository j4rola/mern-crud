import { useState, useEffect } from 'react'   
import { FaSignInAlt } from 'react-icons/fa'  

function Login() {  

    const [formData, setFormData] = useState({    
        
        email: '',  
        password: '',
        
    })

    const { email, password } = formData 

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
                <FaSignInAlt/> Login
            </h1>
            <p>Login and start creating goals</p>
        </section>
        <section className="form">
            
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
                <button type="submit" className="btn btn-block">
                    Submit
                </button>
            </div>
        </section>
    </>
  )
}

export default Login