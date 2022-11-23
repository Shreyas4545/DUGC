import pic from "../images/img1.jpg";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import "./Dashboard1.css"
      const Dashboard1 = () => {

        const [data, setData] = useState([])

const getData = () => {
  var config = {
    method: 'get',
    url: 'http://localhost:8080/dugcCoordinator',
    headers: {
    },
  };
  axios(config).then((response) => {
console.log(response.data)
    setData(response.data)
  }).catch(err => {
    console.log(err);
  });
}


useEffect(() => {
  getData()
}, [])

        return (
          <div class="container1">
          <img className="" src={pic} />
            <table class="table1" style={{maxHeight: "500px", height: "500px", overflow: "scroll", display: 'block'}}>
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Sl.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">USN</th>
                  <th scope="col">Division</th>
                  <th scope="col">Course 1</th>
                  <th scope="col">Course 2</th>
                  <th scope="col">Course 3</th>
                  <th scope="col">Course 4</th>
                  <th scope="col">Course 5</th>
                </tr>
              </thead>
              <tbody>
              {
                data && data?.map((item, key) => {
                  return <tr>
                  <th scope="row">{item[0]?.SL}</th>
                  <td>{item[0]?.Name}</td>
                  <td>{item[0]?.Usn}</td>
                  <td>{item[0]?.Division}</td>
                  <td>Yes</td>
                  <td>No</td>
                  <td>No</td>
                  <td>No</td>
                  <td>No</td>
                </tr>
                })
              }
                
               
              </tbody>
            </table>
          </div>
        )
      };
export default Dashboard1;