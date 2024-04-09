import { useContext, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { DomainRecordContext } from "../../contexts/DomainRecordContext";
import {getAllDomains} from "../../service/TaskService";
import {AuthContext} from "../../contexts/AuthContext";
import Loading from "../UI/Loading";

const DomainRecordChart = () => {
  const [chart, setChart] = useState(null);
  const {currentUser}=useContext(AuthContext);
  const [domain,setDomain]=useState([]);
  const [loading,setLoading]=useState(false);
  console.log("Hello World",domain);

  useEffect(()=>{
    (async () => {
      setLoading(true)
      const res = await getAllDomains(currentUser.user_id);
      if (res) {
        setDomain(res.userHostedZones);
      }
      setLoading(false);
    })();
  },[]);

  useEffect(() => {
    if (domain && domain.length > 0) {
      const domainNames = domain.map((record) => record.Name);
      const recordCounts = domain.map((record) => record.ResourceRecordSetCount);

      const ctx = document.getElementById("domainRecordBarChart");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: domainNames,
          datasets: [
            {
              label: "Record Count",
              data: recordCounts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              barThickness: "flex",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "x",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Domain Name",
              },
            },
            y: {
              title: {
                display: true,
                text: "Record Count",
              },
              min: 0,
            },
          },
        },
      });

      setChart(newChart);
    }
  }, [domain]);

  return (
    <div style={{ marginBlock: "4rem" }}>
      {loading && <Loading/>}
      {domain.length==0 && <h1 style={{color:"white",textAlign:"center"}}>No Domain Present</h1>}
      <canvas id="domainRecordBarChart" width={400} height={400}></canvas>
    </div>
  );
};

export default DomainRecordChart;
