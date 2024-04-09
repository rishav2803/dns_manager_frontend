import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styles from "./Login.module.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import {loginUser} from "../service/AuthService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useContext(AuthContext);
  const[loading,setLoading]=useState(false);

  // This is use to check whether the login page is rendred from register or directly
  // If from register we are coming then we will give a notif to user to login using new account
  const queryParmas = new URLSearchParams(location.search);

  const isRegistered = queryParmas.get("registered");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptns = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email == "") {
      toast.error("Name should be present", toastOptns);
      return false;
    }
    if (password === "") {
      toast.error("Password should be present", toastOptns);
      return false;
    }
    return true;
  };

  const formHandler = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      try {
        const data=await loginUser(email, password);
        if (!data.status) {
          toast.error("LogIn Failed,Please try again", toastOptns);
          return;
        }
        setCurrentUser(data.user);
        navigate("/dashboard")
      } catch (error) {
        console.log(error);
        toast.error("LogIn Failed,Please try again", toastOptns);
      }
    }

  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (isRegistered) {
      toast.info("Registration Successful! Please Login!", toastOptns);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <i className="fa fa-user"></i>
        </div>
        <div className={styles.form_group}>
          <label>Email</label>
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            type="text"
            placeholder={"Enter your email here"}
            className={styles.input}
            name="email"
          ></input>
        </div>
        <div className={styles.form_group}>
          <label>Password</label>
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            type="password"
            placeholder={"Enter your Password here"}
            className={styles.input}
            name="password"
          ></input>
        </div>
        <button className={styles.btn} onClick={formHandler}>
          Submit
        </button>
        <div className={styles.meta}>
          <p>
            Don't have an account?<Link to="/register">Register Here</Link>.
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
