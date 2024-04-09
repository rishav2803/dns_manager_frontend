import React from "react";
import s from "./Dashboard.module.css";

const Dashboard = ({totalRecord,totalHostedZone}) => {


  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2>Dashboard </h2>
      </div>
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.card}>
            <h3>Total Records</h3>
            <p>{totalRecord}</p>
          </div>
        </div>
        <div className={s.column}>
          <div className={s.card}>
            <h3>Total Hosted Zones</h3>
            <p>{totalHostedZone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
