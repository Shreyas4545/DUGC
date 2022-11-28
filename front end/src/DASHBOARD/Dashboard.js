import pic from "../images/img1.jpg";
import axios from "axios";
import "./Dashboard.css";
// import { response } from "express";
import react, { useEffect, useState } from "react";

const Dashboard = () => {
  const [array, setArray] = useState([]);
  const [course,setCourse]=useState();
  const [generate,setGenerate]=useState(false);
  const generatedata = async () => {
    setGenerate(true);
    await axios.get("http://localhost:8080/courseCoordinator").then((res) => {
      console.log(res.data.data);
      setArray(res.data);
    });

    await axios.get("http://localhost:8080/getcourse").then((res) =>{
     console.log(res.data);
    })
  };
  return (
    <div class="container2">
      <div>
        <img src={pic} className="dashimg" />
      </div>
      <div>
      <h3 class='ineligible'>Ineligibility list</h3>
        <table className="table">
          <thead className="thead">
            <tr>
              <th>SL</th>
              <th>NAME</th>
              <th>USN</th>
              <th>RollNo</th>
              <th>DIVISION</th>
              <th>ATTENDANCE</th>
              <th>CIE</th>
            </tr>
          </thead>
          <tbody className="tableContent">
            {array.map((data, key) => {
              if (data.CIE < 40 || data.Attendance < 75) {
                return (
                  <tr>
                    <td>{data.Sl}</td>
                    <td>{data.Name}</td>
                    <td>{data.USN}</td>
                    <td>{data.Rollno}</td>
                    <td>{data.Division}</td>
                    <td>{data.Attendance}</td>
                    <td>{data.CIE}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <button onClick={() => generatedata()}>
        Generate the Ineligibility list
      </button>
    </div>
  );
};
export default Dashboard;
