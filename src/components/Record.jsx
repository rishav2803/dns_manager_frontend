import React, { useContext, useEffect, useState } from "react";
import { getAllRecords, deleteRecord } from "../service/TaskService";
import s from "./Record.module.css";
import { useLocation, Link } from "react-router-dom";
import { DomainRecordContext } from "../contexts/DomainRecordContext";
import Loading from "./UI/Loading";
import Modal from "./UI/Modal";

const Records = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState("Record");
  const [loading, setLoading] = useState(false);
  const { record, deleteDomainRecord, clearHandler, addMultiRecords } = useContext(DomainRecordContext);
  const [isUpdate, setIsUpdate] = useState({
    name: "",
    type: "",
    ttl: "",
    value: [""],
  });
  const [type, setType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterType, setFilterType] = useState("All");

  function handleDelete(recordName, recordType, domainId, ttl, values) {
    (async () => {
      setLoading(true);
      const res = await deleteRecord(domainId, recordName, recordType, ttl, values);
      if (res && res.message) {
        clearHandler();
        (async () => {
          setLoading(true);
          const res = await getAllRecords(name, id);
          if (res) {
            console.log(res.domainRecords);
            clearHandler();
            addMultiRecords(res.domainRecords);
          }
        })();
      }
      setLoading(false);
    })();
  }

  function modalCloseHandler(val) {
    setIsDialogOpen(val);
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    setIsDialogOpen(true);
    setOption(option);
    setShowOptions(false);
    setType("Record");
    console.log(option);
  };

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");
  const name = queryParams.get("name");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllRecords(name, id);
      if (res) {
        console.log(res.domainRecords);
        clearHandler();
        addMultiRecords(res.domainRecords);
      }
      setLoading(false);
    })();
  }, []);

  console.log(record);

  // Filter records based on selected type
  const filteredRecords = filterType === "All" ? record : record.filter((rec) => rec.type === filterType);

  // Get unique types for dropdown
  const types = ["All", ...new Set(record.map((rec) => rec.type))];

  return (
    <section className={s.container}>
      {loading && <Loading />}
      <div className={s.header}>
        <h2>Records ({record.length})</h2>
        <div className={s.dropdown}>
          <button className={s.btn} onClick={toggleOptions}>
            <i className="fa fa-plus" style={{ fontSize: ".7rem", marginRight: ".4rem" }}></i>
            Create Records
          </button>
          {showOptions && (
            <div className={s.options}>
              <div className={s.option} onClick={() => handleOptionClick("Single")}>
                Single Record
              </div>
              <div className={s.option} onClick={() => handleOptionClick("Multiple")}>
                Multi Record
              </div>
            </div>
          )}
        </div>
      </div>
      {isDialogOpen && <Modal option={option} update={isUpdate} type={type} onDialogClose={modalCloseHandler} />}
      <div className={s.filter}>
        <label htmlFor="typeFilter">Filter by Type:</label>
        <select id="typeFilter" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.cell}>Record Name</th>
              <th className={s.cell}>Type</th>
              <th className={s.cell}>TTL</th>
              <th className={s.cell}>Values</th>
              <th className={s.cell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((zone, index) => (
              <tr key={index} onClick={() => handleRowClick(index)} className={index === selectedRow ? s.selected : ""}>
                <td className={s.cell}>{zone.name}</td>
                <td className={s.cell}>{zone.type}</td>
                <td className={s.cell}>{zone.ttl}</td>
                <td className={s.cell}>
                  <ul>
                    {zone.value.map((value, idx) => (
                      <li key={idx}>{value}</li>
                    ))}
                  </ul>
                </td>
                <td className={s.cell}>
                  <button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setIsUpdate({
                        name: zone.name,
                        type: zone.type,
                        ttl: zone.ttl,
                        value: zone.value,
                      });
                      setType("Update");
                    }}
                    className={s.actionBtn}
                  >
                    Update
                  </button>
                  <button onClick={() => handleDelete(zone.name, zone.type, id, zone.ttl, zone.value)} className={s.actionBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Records;
