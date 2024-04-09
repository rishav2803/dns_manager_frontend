import { useContext, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from '../contexts/AuthContext';
import { DomainRecordContext } from '../contexts/DomainRecordContext';
import { createSingleDomain, createMultipleDomain } from '../service/TaskService';
import styles from "./Form.module.css";
import Loading from "./Ui/Loading";
import "react-toastify/dist/ReactToastify.css";

function DomainForm({ onClose, option }) {
  const [domainName, setDomainName] = useState('');
  const [type, setType] = useState('Public');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { addSingleDomain, addMultipleDomain } = useContext(DomainRecordContext);

  const [jsonData, setJsonData] = useState(`{
  "records": [
    {
      "domainName": "",
      "type": "",
      "desc": ""
    }
  ]
}`);
  const toastOpts = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleJsonChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split(/\r?\n/);
      const headers = lines[0].split(',');
      const records = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
          const record = {};
          for (let j = 0; j < headers.length; j++) {
            record[headers[j].trim()] = values[j].trim();
          }
          records.push(record);
        }
      }

      const newJsonData = {
        records: [...records]
      };

      setJsonData(JSON.stringify(newJsonData, null, 2));
      toast.success("CSV uploaded successfully!", toastOpts);
    };

    reader.readAsText(file);
  };

  const handleDomainNameChange = (e) => {
    setDomainName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (option === "Single") {
      const hostedZone = {
        domainName,
        type,
        desc
      };
      try {
        console.log(hostedZone);
        setLoading(true)
        const data = await createSingleDomain(hostedZone, currentUser.user_id);
        if (data && data.mssg) {
          toast.success("Successfully created domain", toastOpts);
          addSingleDomain(data.mssg)
          onClose(false);
        }
        setLoading(false)
      } catch (error) {
        console.log("Error inserting tasks:", error);
      }
    }
    if (option === "Multiple") {
      try {
        setLoading(true)
        console.log(jsonData);
        const parsedJsonData = JSON.parse(jsonData);
        const data = await createMultipleDomain(parsedJsonData, currentUser.user_id);
        if (data && data.mssg) {
          toast.success(`Successfully created ${data.mssg.length} domains`, toastOpts);
          addMultipleDomain(data.mssg)
          onClose(false);
          setLoading(false)
        }
        setLoading(false)
      } catch (error) {
        console.log("Error inserting tasks:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {loading && <Loading />}
      {option === "Single" &&
        <>
          <div className={styles.form_input}>
            <label>Domain Name:</label>
            <input type="text" required value={domainName} onChange={handleDomainNameChange} />
          </div>
          <div className={styles.form_input}>
            <div className={styles.form_input}>
              <label>Description</label>
              <textarea required onChange={handleDescChange} />
            </div>
            <div>
              <label>Type:</label>
              <select required value={type} onChange={handleTypeChange}>
                <option value="Public">Public</option>
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
      "domainName": "",
      "type": "",
      "desc": ""
    }
  ]
}`}
              style={{ fontFamily: "monospace", fontSize: "14px" }}
            />
          </div>
          <p style={{ color: "white",textAlign:"center" }}>----------------Or---------------</p>
          <div className={`${styles.btn} ${styles.light} ${styles.csv}`}>
            <label htmlFor="csvFile">
              <strong>Upload CSV</strong>
            </label>
            <input
              type="file"
              id="csvFile"
              accept=".csv"
              style={{ display: "none" }}
              onChange={handleCsvUpload}
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

export default DomainForm;
