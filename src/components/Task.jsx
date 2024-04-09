import {useContext, useState} from "react";
import {DomainRecordContext} from "../contexts/DomainRecordContext";
import Dashboard from "./Dashboard";
import HostedZones from "./HostedZones";
import Records from "./Record";
import styles from "./Task.module.css"
import Modal from "./UI/Modal";
export default function Task({hamburger,onHamburger}){
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {domain}=useContext(DomainRecordContext);
  console.log(domain);

  function getTotalRecord(){
    let totalRecordCount=0;
    domain.forEach(d=>{
      totalRecordCount+=d.ResourceRecordSetCount;
    });
    return totalRecordCount;
  }


  function modalCloseHandler(val){
    setIsDialogOpen(val);
  }


  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.hamburger}
          onClick={() => {
            onHamburger(!hamburger);
          }}
        >
          <i className={`fa fa-bars ${hamburger === false ? "" : styles.hid} `}></i>
          <i className={`fa fa-times ${hamburger === true ? styles.z : styles.hid}`}></i>
        </div>
        {isDialogOpen && <Modal taskStatus={""} onDialogClose={modalCloseHandler}/>}
      </div>
        <Dashboard
          totalHostedZone={domain.length}
          totalRecord={getTotalRecord()}
        />

        <HostedZones/>
    </div>
  );
}
