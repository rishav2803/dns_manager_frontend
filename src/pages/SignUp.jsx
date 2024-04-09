import {useContext, useState} from "react";
import { Link,useNavigate } from 'react-router-dom'
import {AuthContext} from "../contexts/AuthContext";
import styles from "./SignUp.module.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {registerUser} from "../service/AuthService";

export default function SignUp(){
  const {signup} = useContext(AuthContext);
  const navigate=useNavigate();

  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: ''
  })

 const toastOptns = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

  const handleValidation = () => {
    const { userName, email, password } = values;
    if (userName == '') {
      toast.error("Name should be present", toastOptns);
      return false;
    }
    if (userName.length < 3) {
      toast.error("Name should of more than 3 characters", toastOptns);
      return false;
    }
    if (email === '') {
      toast.error("Email should be present", toastOptns);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", toastOptns);
      return false;
    }

    if (password === '') {
      toast.error("Password should be present", toastOptns);
      return false;
    }
    if (password.length < 6) {
      toast.error("Password should be greater than 6 characters", toastOptns);
      return false;
    }
    return true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { userName,email, password } = values;
      try {
        const data=await registerUser(userName, email, password);
        if (!data.status) {
          toast.error("SignUp Failed,Please try again", toastOptns);
          return;
        }
        navigate("/login?registered=true");
      } catch (error) {
        console.log(error.message);
        toast.error("SignUp Failed,Please try again", toastOptns);
      }     

    }
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return(
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <i className="fa fa-user"></i>
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className={styles.form_group}>
            <label>Username</label>
            <input type='text'  placeholder={"Enter your name here"} className={styles.input} name='userName' onChange={(e) => handleChange(e)} value={values.userName}></input>
          </div>
          <div className={styles.form_group}>
            <label>Email</label>
            <input type='email'  placeholder={"Enter your Email here"} className={styles.input} name='email' onChange={(e) => handleChange(e)} value={values.email}></input>
          </div>
          <div className={styles.form_group}>
            <label>Password</label>
            <input type='password'  className={styles.input} name='password' onChange={(e) => handleChange(e)} value={values.password} placeholder={"Enter your Password here"}></input>
          </div>
          <button className={styles.btn} >Submit</button>
          <div className={styles.meta}>
            <p>Already have an account?<Link to="/login">LogIn Here</Link>.</p>
          </div>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
