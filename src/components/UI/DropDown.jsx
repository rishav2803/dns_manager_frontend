import {useContext} from "react"
import {AuthContext} from "../../contexts/AuthContext";
import styles from "./DropDown.module.css"

export default function DropDown(){
  const {logout}=useContext(AuthContext);

  return(
    <div className={styles.dropDown}>
      <p onClick={()=>{logout()}}><i className="fa fa-sign-out"></i>LogOut</p>
    </div>
  )
}
