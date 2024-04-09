import DomainForm from "../Form";
import RecordForm from "../RecordForm";
import UpdateForm from "../UpdateForm";
import styles from "./Modal.module.css";

export default function Modal({onDialogClose,update,type,option}){
  console.log(update);
  return(
      <div className={styles.dialog_overlay}>
        <div className={styles.dialog_box}>
          <i className="fa fa-times" onClick={() => onDialogClose(false)}></i>
          {type==="Domain" && <DomainForm option={option} onClose={onDialogClose}/>}
          {type==="Record"   &&<RecordForm option={option} onClose={onDialogClose}/>}
          {type==="Update"   &&<UpdateForm record={update} onClose={onDialogClose}/>}
        </div>
      </div>
  );

}
