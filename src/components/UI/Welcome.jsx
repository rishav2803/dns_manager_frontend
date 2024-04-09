import {useEffect, useState,useContext} from 'react';
import styles from './Welcome.module.css'
import {AuthContext} from "../../contexts/AuthContext";

const Welcome=()=>{
    const [typedText, setTypedText] = useState("");
    const {currentUser}=useContext(AuthContext);
    const text = currentUser.displayName;

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setTypedText(text.slice(0, index));
            index += 1;
            if (index > text.length) {
                clearInterval(intervalId);
            }
        }, 90);
        return () => clearInterval(intervalId);
    }, [text]);

  return (
    <div className={styles.container}>
        <div className={styles.name_container}>
            <p>Hello,</p><h1 style={{textTransform:"capitalize"}}>{typedText}</h1>
        </div>
        <p>Welcome to Taskerr <i className="fa fa-tasks"></i></p>
    </div>
  )
}



export default Welcome;
