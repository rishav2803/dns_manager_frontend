import  { useContext, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import {getAllDomainRecordTypes} from "../../service/TaskService";
import {AuthContext} from "../../contexts/AuthContext";
import Loading from "../Ui/Loading";


 const RecordTypeDistributionChart = () => {
   const [chart, setChart] = useState(null);
   const [loading,setLoading]=useState(false);
   const [recordTypes,setRecordTypes]=useState({});
  const {currentUser}=useContext(AuthContext);

   useEffect(()=>{
     (async () => {
       setLoading(true)
       const res = await getAllDomainRecordTypes(currentUser.user_id);
       if (res) {
         setRecordTypes(res);
       }
       setLoading(false);
     })();
   },[]);

   useEffect(() => {
     if (recordTypes && recordTypes.length > 0) {
       const labels = recordTypes.map((record) => record.type);
       const data = recordTypes.map((record) => record.count);

       const ctx = document.getElementById("domainTypeBarChart");
       const newChart = new Chart(ctx, {
         type: "bar",
         data: {
           labels: labels,
           datasets: [
             {
               label: "Record Type Count",
               data: data,
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
                 text: "Record Type",
               },
             },
             y: {
               title: {
                 display: true,
                 text: "Count",
               },
               min: 0,
             },
           },
         },
       });

       setChart(newChart);
     }
   }, [recordTypes]);

   return (
     <div style={{marginBlock:"5rem"}}>
       {loading && <Loading/>}
       <canvas id="domainTypeBarChart" width={400} height={400}></canvas>
     </div>
   );
 };

export default RecordTypeDistributionChart;
