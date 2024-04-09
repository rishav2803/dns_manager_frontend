import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import styles from "./SideBar.module.css"
import DropDown from "./UI/DropDown";
import Logo from "./UI/Logo";
import {Link} from "react-router-dom";

export default function SideBar({hamburger}){
  const [dropDown,setDropDown]=useState(false);
  const {currentUser}=useContext(AuthContext);
  const [selected,setSelected]=useState("")
  const links=[
    {
      name:"Home",
      linkTo:'/dashboard'
    },
    {
      name:"RecordtypeChart",
      linkTo:'/dashboard/record/chart'
    },
    {
      name:"RecordCountChart",
      linkTo:'/dashboard/domain/chart'
    }
  ]

  function selectHandler(id){
    setSelected(id);
  }

  return(
    <div className={`${styles.container} ${hamburger ? styles.show : ""}`}>
      <header className={styles.header}>
        <Logo/>
        <h1>DomainOps</h1>
      </header>
      <div className={styles.test_container}>
        <div className={styles.task_container}>
          {dropDown && <DropDown/>}
          <ul className={styles.list_container}>
          {links.map((link,index) => {
            return (
              <Link key={index} to={link.linkTo} style={{ textDecoration: 'none', color: 'white' }}>
                <li  onClick={()=>{selectHandler(index)}} className={`${styles.list_items}`}>
                  {link.name}
                </li>
              </Link>
            );
          })}
          </ul>
        </div>
        <footer className={styles.footer}>
          <div className={styles.profile}>
            <i className="fa fa-user"></i>
            <p style={{textTransform:"capitalize"}}>{currentUser.userName}</p>
          </div>
          <i className="fa fa-ellipsis-h" onClick={()=>{setDropDown(!dropDown)}}></i>
        </footer>
      </div>
    </div>
  );
}
