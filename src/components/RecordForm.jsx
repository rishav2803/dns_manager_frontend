import { useContext, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { createSingleRecord, createMultipleRecords } from '../service/TaskService';
import styles from "./Form.module.css";
import Loading from "./UI/Loading";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';
import { DomainRecordContext } from '../contexts/DomainRecordContext';

function RecordForm({ onClose, option }) {
  const [recordName, setRecordName] = useState('');
  const [type, setType] = useState('CNAME');
  const [ttl, setTTL] = useState('');
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addSingleRecords, addMultiRecords } = useContext(DomainRecordContext);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const name = queryParams.get('name');

  const [jsonData, setJsonData] = useState(`{
  "records": [
    {
      "recordName": "",
      "type": "",
      "ttl": "",
      "value": [""]
    }
  ]
}`);

  const handleJsonChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonContent = e.target.result;
      setJsonData(jsonContent);
      toast.success("JSON file uploaded successfully!", toastOpts);
    };

    reader.readAsText(file);
  };

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
    const updatedValue = [...value];
    updatedValue.splice(index, 1);
    setValue(updatedValue);
  };

  function isSingle(type){
    if (type === "A" || type === "AAAA" || type === "MX" || type === "TXT") {
      return false;
    }
    return true;
  }

  const handleAddValue = () => {
    if (value.length === 1 && isSingle(type)) {
      toast.success(`${type} supports single Value`, toastOpts);
      return;
    }
    if (value.length < 4) {
      setValue([...value, '']);
    }
  };

  const toastOpts = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (option === 'Single') {
      const record = {
        recordName,
        type,
        ttl,
        value
      };
      try {
        setLoading(true);
        const data = await createSingleRecord(record, id, name);
        if (data && data.msg) {
          addSingleRecords(data.msg);
          toast.success(`Successfully created record`, toastOpts);
          onClose(false);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error inserting record:", error);
      }
    }
    if (option === 'Multiple') {
      try {
        setLoading(true);
        const parsedJsonData = JSON.parse(jsonData);
        const data = await createMultipleRecords(parsedJsonData, id, name);
        console.log(data);
        if (data && data.msg) {
          addMultiRecords(data.msg);
          toast.success(`Successfully created ${data.msg.length} records`, toastOpts);
          onClose(false);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error inserting records:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {loading && <Loading />}
      {option === "Single" &&
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
                    required
                    onChange={(e) => handleValueChange(index, e)}
                  />
                  <i className="fa fa-times" onClick={() => handleDeleteValue(index)}></i>
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
      }
      {option === "Multiple" && (
        <>
          <div>
            <textarea
              rows={10}
              cols={50}
              value={jsonData}
              onChange={handleJsonChange}
              placeholder={`{
  "records": [
    {
      "recordName": "",
      "type": "",
      "ttl": "",
      "value": [""]
    }
  ]
}`}
              style={{ fontFamily: "monospace", fontSize: "14px" }}
            />
          </div>
          <p style={{ color: "white", textAlign: "center" }}>Follow the above structure for the JSON</p>
          <div className={`${styles.btn} ${styles.light} ${styles.csv}`}>
            <label htmlFor="jsonFile">
              <strong>Upload JSON</strong>
            </label>
            <input
              type="file"
              id="jsonFile"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              value=""
            />
          </div>
        </>
      )}
      <button type="submit" className={`${styles.btn} ${styles.dark}`}>Submit</button>
      <ToastContainer />
    </form>
  );
}

export default RecordForm;
