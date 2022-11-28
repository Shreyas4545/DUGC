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
    value: 'BASIC ELECTRICAL ENGINEERING',
  },
  { label: 'ENGINEERING MECHANICS', value: 'ENGINEERING MECHANICS' },
  { label: 'SINGLE VARIABLE CALCULUS', value: 'SINGLE VARIABLE CALCULUS' },
  {
    label: 'ENGINEERING PHYSICS',
    value: 'ENGINEERING PHYSICS',
  },
  {
    label: 'DESIGN THINKING FOR SOCIAL INNOVATION',
    value: 'DESIGN THINKING FOR SOCIAL INNOVATION',
  },
  {
    label: 'C PROGRAMMING FOR PROBLEM SOLVING',
    value: 'C PROGRAMMING FOR PROBLEM SOLVING',
  },
]
const Course12 = [
  {
    label: 'PROBLEM SOLVING WITH DATA STRUCTURES',
    value: 'PROBLEM SOLVING WITH DATA STRUCTURES',
  },
  { label: 'MULTIVARIABLE CALCULUS', value: 'MULTIVARIABLE CALCULUS' },
  {
    label: 'BASIC MECHANICAL ENGINEERING  ',
    value: 'BASIC MECHANICAL ENGINEERING  ',
  },
  {
    label: 'PROFESSIONAL COMMUNICATION',
    value: 'PROFESSIONAL COMMUNICATION',
  },
  {
    label: 'BASIC ELECTRONICS',
    value: 'BASIC ELECTRONICS',
  },
  {
    label: 'ENGINEERING CHEMISTRY',
    value: 'ENGINEERING CHEMISTRY',
  },
  {
    label: 'ENGINEERING EXPLORATION',
    value: 'ENGINEERING EXPLORATION',
  },
]
const Course13 = [
  {
    label: 'GRAPH THEORY AND LINEAR ALGEBRA',
    value: 'GRAPH THEORY AND LINEAR ALGEBRA',
  },
  { label: 'DATABASE MANAGEMENT SYSTEM', value: 'DATABASE MANAGEMENT SYSTEM' },
  {
    label: 'DISCRETE MATHEMATICAL STRUCTURES',
    value: 'DISCRETE MATHEMATICAL STRUCTURES',
  },
  {
    label: 'DATA STRUCTURES AND ALGORITHMS',
    value: 'DATA STRUCTURES AND ALGORITHMS',
  }
]
const Course14 = [
  {
    label: 'APPLIED STATISTICS WITH R',
    value: 'APPLIED STATISTICS WITH R',
  },
  {
    label: 'OBJECT ORIENTED PROGRAMMING',
    value: 'OBJECT ORIENTED PROGRAMMING',
  },
  {
    label: 'PRINCIPLES OF COMPILER DESIGN',
    value: 'PRINCIPLES OF COMPILER DESIGN',
  },
  {
    label: 'OPERATING SYSTEM PRINCIPLES AND PROGRAMMING',
    value: 'OPERATING SYSTEM PRINCIPLES AND PROGRAMMING',
  },
  {
    label: 'MICROCONTROLLER: PROGRAMMING AND INTERFACING',
    value: 'MICROCONTROLLER: PROGRAMMING AND INTERFACING',
  },
  {
    label: 'OBJECT ORIENTED PROGRAMMING LAB',
    value: 'OBJECT ORIENTED PROGRAMMING LAB',
  },
  {
    label: 'EXPLORATORY DATA ANALYSIS',
    value: 'EXPLORATORY DATA ANALYSIS',
  },
]
const Course15 = [
  {
    label: 'SYSTEM SOFTWARE',
    value: 'SYSTEM SOFTWARE',
  },
  {
    label: 'WEB TECHNOLOGY',
    value: 'WEB TECHNOLOGY',
  },
  {
    label: 'MACHINE LEARNING',
    value: 'MACHINE LEARNING',
  },
  {
    label: 'INTERNET OF THINGS',
    value: 'INTERNET OF THINGS',
  },
  {
    label: 'COMUPUTER NETWORKING',
    value: 'COMUPUTER NETWORKING',
  },
  {
    label: 'SYSTEM SOFTWARE LAB',
    value: 'SYSTEM SOFTWARE LAB',
  },
  {
    label: 'MINI PROJECT',
    value: 'MINI PROJECT',
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
    const url = 'http://localhost:8080/api/uploadfile';
    const formData = new FormData();
    formData.append('profile', file);
    formData.append('course',course);
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
      console.log(response);
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