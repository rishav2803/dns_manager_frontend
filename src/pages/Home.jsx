import {useContext, useEffect, useState} from "react";
import SideBar from "../components/SideBar";
import Task from "../components/Task";
import Container from "../components/UI/Container";
import Loading from "../components/UI/Loading";
import {AuthContext} from "../contexts/AuthContext";
import {DomainRecordContext} from "../contexts/DomainRecordContext";
import {TaskContext} from "../contexts/TaskContext";
import {getAllDomains} from "../service/TaskService";

export default function Home(){
  const [hamburger,setHamburger]=useState(false);
  const {addMultiDomain,getRecordTypes,clearHandler}=useContext(DomainRecordContext);
  const {currentUser}=useContext(AuthContext);
  const [loading,setLoading]=useState(false);


  function hamburgerHandler(val){
    setHamburger(val);
  }

  useEffect(()=>{
    (async () => {
      setLoading(true)
      const res = await getAllDomains(currentUser.user_id);
      if (res) {
        clearHandler();
        addMultiDomain(res);
        getRecordTypes()
      }
      setLoading(false);
    })();
  },[]);

  return(
      <Container>
        {loading && <Loading/>}
        <SideBar hamburger={hamburger} />
        <Task hamburger={hamburger} onHamburger={hamburgerHandler}/>
      </Container>
  )
}
