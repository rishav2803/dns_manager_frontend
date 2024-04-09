import { useContext, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import styles from "./Form.module.css";
import Loading from "./ui/Loading";
import "react-toastify/dist/ReactToastify.css";
import {useLocation ,useParams } from 'react-router-dom';
import {DomainRecordContext} from '../contexts/DomainRecordContext';
import {getAllRecords, updateRecord} from '../service/TaskService';

function UpdateForm({onClose,record}) {
  const [recordName,setRecordName] = useState(record.name);
  const [type, setType] = useState(record.type);
  const [ttl,setTTL] = useState(record.ttl);
  const [value, setValue] = useState(record.value);
  const [loading,setLoading]=useState(false);
  const {clearHandler, addMultiRecords} = useContext(DomainRecordContext);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const name = queryParams.get('name');

  const handleRecordNameChange = (e) => {
    setRecordName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleTTLChange = (e) => {
    setTTL(e.target.value);
  };


  const handleValueChange = (index, e) => {
    const updatedValue = [...value];
    updatedValue[index] = e.target.value;
    setValue(updatedValue);
  };

  const handleDeleteValue = (index) => {
    if (value.length==1) {
      toast.error("Cannot delete Value",toastOpts);
      return;
    }
    const updatedValue = [...value];
    updatedValue.splice(index, 1);
    setValue(updatedValue);
  };

  function isSingle(type){
    if (type=="A" || type=="AAAA" || type=="MX" || type=="TXT") {
      return false;
    }
    return true;
  }

  const handleAddValue = () => {
    if (value.length ==1 && isSingle(type)) {
      toast.success(`${type} suppors single Value`,toastOpts);
      return;
    }
    if (value.length < 4) {
      setValue([...value, '']);
    }
  };




  const toastOpts={
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const record = {
      recordName,
      type,
      ttl,
      value
    };
    console.log(record);
    try {
      setLoading(true);
      const data=await updateRecord(id, recordName, type, ttl, value) 
      if (data && data.mssg) {
        clearHandler();
        (async () => {
          setLoading(true);
          const res = await getAllRecords(name, id);
          if (res) {
            onClose(false)
            clearHandler();
            addMultiRecords(res.domainRecords);
          }
        })();
      }
      setLoading(false);
    } catch (error) {
      console.log("Error inserting record:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {loading && <Loading/>}
      <>
        <div className={styles.form_input}>
          <label>Record Name:</label>
          <input type="text" required value={recordName} onChange={handleRecordNameChange} />
        </div>
        <div className={styles.form_input}>
          <div className={styles.form_input}>
            <label>Values:</label>
            {value.map((subtask, index) => (
              <div key={index} className={styles.subtask}>
                <input
                  type="text"
                  value={subtask}
                  placeholder={"192.0.2.1"}
                  required
                  onChange={(e) => handleValueChange(index, e)}
                />
                <i className="fa fa-times"  onClick={() => handleDeleteValue(index)}></i>
              </div>
            ))}

            {value.length < 4 && (
              <button type="button" onClick={handleAddValue} className={`${styles.btn} ${styles.light}`}>
                Add Value
              </button>
            )}
          </div>
          <div className={styles.form_input}>
            <label>TTL:</label>
            <input type="text" required value={ttl} onChange={handleTTLChange} />
          </div>
          <div>
            <label>Type:</label>
            <select required value={type} onChange={handleTypeChange}>
              <option value="">Select Record Type</option>
              <option value="A">A (Address) Record</option>
              <option value="AAAA">AAAA (IPv6 Address) Record</option>
              <option value="CNAME">CNAME (Canonical Name) Record</option>
              <option value="MX">MX (Mail Exchange) Record</option>
              <option value="NS">NS (Name Server) Record</option>
              <option value="PTR">PTR (Pointer) Record</option>
              <option value="SOA">SOA (Start of Authority) Record</option>
              <option value="SRV">SRV (Service) Record</option>
              <option value="TXT">TXT (Text) Record</option>
              <option value="DNSSEC">DNSSEC</option>
            </select>
          </div>
        </div>
      </>
      <button type="submit" className={`${styles.btn} ${styles.dark}`}>Update</button>
      <ToastContainer/>
    </form>
  );
}

export default UpdateForm;
