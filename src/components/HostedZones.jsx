import React, { useContext, useState } from "react";
import { DomainRecordContext } from "../contexts/DomainRecordContext";
import s from "./HostedZones.module.css";
import {Link} from "react-router-dom";
import Modal from "./UI/Modal";



const HostedZones = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState("");
  const { domain } = useContext(DomainRecordContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function getHostedZoneId(hostedZoneString){
    const parts = hostedZoneString.split("/");
    const hostedZoneId = parts[2];  
    return hostedZoneId;
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
    console.log(option);
  };

  return (
    <section className={s.container}>
      <div className={s.header}>
        <h2>Hosted Zones ({domain.length})</h2>
        <div className={s.dropdown}>
          <button className={s.btn} onClick={toggleOptions}>
            <i className="fa fa-plus" style={{ fontSize: ".7rem", marginRight: ".4rem" }}></i>
            Create Hosted Zone
          </button>
          {showOptions && (
            <div className={s.options}>
              <div className={s.option} onClick={() => handleOptionClick("Single")}>
                Single Hosted Zone
              </div>
              <div className={s.option} onClick={() => handleOptionClick("Multiple")}>
                 Multi Hosted Zones
              </div>
            </div>
          )}
        </div>
      </div>
      {isDialogOpen && <Modal option={option} type={"Domain"} onDialogClose={modalCloseHandler} />}
      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.cell}>Hosted Zone Name</th>
              <th className={s.cell}>Type</th>
              <th className={s.cell}>Record Count</th>
            </tr>
          </thead>
          <tbody>
            {domain.map((zone, index) => (
              <tr key={index}>
                <td className={s.cell}>
                  <Link to={`record?id=${getHostedZoneId(zone.Id)}&name=${zone.Name}`}>
                    {zone.Name}
                  </Link>
                </td>
                <td className={s.cell}>{zone.Config.PrivateZone?"Private":"Public"}</td>
                <td className={s.cell}>{zone.ResourceRecordSetCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HostedZones;
