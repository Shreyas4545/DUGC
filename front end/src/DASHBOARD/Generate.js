import React, { useState } from 'react';
import styled from 'styled-components';
import pic from "../images/img1.jpg";
import { useNavigate } from 'react-router-dom';
import "./Generate.css"
import Select from 'react-select';
import axios from 'axios';
const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
`;

//options for sem 
const Sem = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];


const Course11 = [
  {
    label: 'BASIC ELECTRICAL ENGINEERING',
    value: 'bee',
  },
  { label: 'ENGINEERING MECHANICS', value: 'em' },
  { label: 'SINGLE VARIABLE CALCULUS', value: 'svc' },
  {
    label: 'ENGINEERING PHYSICS',
    value: 'ep',
  },
  {
    label: 'DESIGN THINKING FOR SOCIAL INNOVATION',
    value: 'si',
  },
  {
    label: 'C PROGRAMMING FOR PROBLEM SOLVING',
    value: 'c',
  },
]
const Course12 = [
  {
    label: 'PROBLEM SOLVING WITH DATA STRUCTURES  ',
    value: 'pdsa  ',
  },
  { label: 'MULTIVARIABLE CALCULUS', value: 'mvc' },
  {
    label: 'BASIC MECHANICAL ENGINEERING  ',
    value: 'bme  ',
  },
  {
    label: 'PROFESSIONAL COMMUNICATION',
    value: 'pc',
  },
  {
    label: 'BASIC ELECTRONICS',
    value: 'be',
  },
  {
    label: 'ENGINEERING CHEMISTRY',
    value: 'ec',
  },
  {
    label: 'ENGINEERING EXPLORATION',
    value: 'exp',
  },
]
const Course13 = [
  {
    label: 'GRAPH THEORY AND LINEAR ALGEBRA',
    value: 'gtla',
  },
  { label: 'DATABASE MANAGEMENT SYSTEM', value: 'dbms' },
  {
    label: 'DISCRETE MATHEMATICAL STRUCTURES',
    value: 'dms',
  },
  {
    label: 'DATA STRUCTURES AND ALGORITHMS',
    value: 'dsa',
  }
]
const Course14 = [
  {
    label: 'APPLIED STATISTICS WITH R',
    value: 'r',
  },
  {
    label: 'OBJECT ORIENTED PROGRAMMING',
    value: 'oop',
  },
  {
    label: 'PRINCIPLES OF COMPILER DESIGN',
    value: 'pocd',
  },
  {
    label: 'OPERATING SYSTEM PRINCIPLES AND PROGRAMMING',
    value: 'os',
  },
  {
    label: 'MICROCONTROLLER: PROGRAMMING AND INTERFACING',
    value: 'mcp',
  },
  {
    label: 'OBJECT ORIENTED PROGRAMMING LAB',
    value: 'oopl',
  },
  {
    label: 'EXPLORATORY DATA ANALYSIS',
    value: 'eda',
  },
]

const Course15 = [
  {
    label: 'SYSTEM SOFTWARE',
    value: 'ss',
  },
  {
    label: 'WEB TECHNOLOGY',
    value: 'wt',
  },
  {
    label: 'MACHINE LEARNING',
    value: 'ml',
  },
  {
    label: 'INTERNET OF THINGS',
    value: 'iot',
  },
  {
    label: 'COMUPUTER NETWORKING',
    value: 'cn',
  },
  {
    label: 'SYSTEM SOFTWARE LAB',
    value: 'ss',
  },
  {
    label: 'MINI PROJECT',
    value: 'mp',
  }
]


const courseArray = [
  Course11,
  Course12,
  Course13,
  Course14,
  Course15,
]
const Generate = props => {
  const [semester, setSemester] = useState();
  const [course, setCourse] = useState(" ");

  const [file,setFile] =useState();

  const handleChange1 = (value) => {
    setSemester(value)
  }
  const handleChange2 = (value) => {
    setCourse(value)
  }
  
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  const navigate=useNavigate();
  function handleSubmit(event) {
    
    event.preventDefault()
    console.log("Hello")
    const url = 'http://localhost:8080/api/uploadfile';
    const formData = new FormData();
    formData.append('profile', file);
    // formData.append('fileName', file?.name);
    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/uploadfile',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data : formData
    };
    axios(config).then((response) => {
      console.log(response.data);
    }).catch(err => {
      console.log(err);
    });

    var config1 = {
      method: 'post',
      url: 'http://localhost:8080/courseCoordinator',
      headers: {
        "Content-Type": "application/json"
      },
      data : {
        courseData : course,
        semData:semester
      }
    };

    axios(config1).then((response)=>{
      console.log(response);
    }).catch(err=>{
      console.log(err);
    })

    console.log(course);
    navigate("/Dashboard");
  }
  return (
    <div id="abc">
      <div className='img'>
        <img className="" src={pic} />
      </div>
      <div className="select2" style={{display:"flex"}}>
        <div className="courses">
          <h3 className="component">Sem</h3>
          <Select className="sem" placeholder="Sem" options={Sem} onChange={(item) =>{
            handleChange1(item.value)
          }}/>
        </div>
        <div className='courses'>
          <h3 class="component">Course</h3>
          <Select className="course" placeholder="Course" options={courseArray[semester-1]} 
          onChange={(item) => {
            handleChange2(item.value)
          }
          }
           />
        </div>
      </div>
      <div className='submitform'>
      <form>
          <h3 style={{padding:"25px"}}>Please Select a file to Upload</h3>
          <input type="file" onChange={handleChange}/>
          <button onClick={handleSubmit}>Upload</button>
        </form>
        </div>
    </div>
  );
};

export default Generate;