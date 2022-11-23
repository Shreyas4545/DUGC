import "./Login.css";
import pic from "../images/img1.jpg";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import axios from "axios"
import React from "react";
// import ReactDOM from "react-dom";

  
   const Shreyas= (props) => {
    const navigate=useNavigate();
    const form = useRef(null)
  const  initialValues = { username: "", email: "", role: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginerr,setLoginErr]=useState();
  const [isloggedin,setIsLoggedin] = useState(false);
  const [inputs,setInputs]=useState({
    uemail:"",
    upass:"",
    urole:""
  });
  
  //capturing the values of input from login form
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const newdata={...inputs};
    newdata[e.target.name]=e.target.value;
    setInputs(newdata);
    console.log(newdata);
  };
  
  //Function to check whether the given login details are correct or not
    const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
    axios.post('http://localhost:8080/login', {
      uemail:inputs.uemail,
      upass:inputs.upass,
      urole:inputs.urole
    }).then(res =>{
      setIsLoggedin(true);
      localStorage.setItem('token-info',JSON.stringify(formValues));
      if(inputs.urole==="Coordinator"){
      navigate("/Generate");
      }
      else if(inputs.urole==="Dugcmember"){
        navigate("/Dashboard1");
      }
    }).catch(err=>{
     setLoginErr("Invalid Username or password");
    })
  };

  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
    //Function to validate the form
   const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.uname) {
      errors.username = "Username is required!";
    }
    if (!values.uemail) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.uemail)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.upass) {
      errors.password = "Password is required";
    }
    return errors;
  };

   return (
    <div className="container form">
    <div className="img1">
    <img className="" src={pic} />
    </div>
      <form ref={form} className="begin">
       <h1>Login</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="uname"
              placeholder="Username"
              onChange={handleChange}
              required
              autocomplete="off"
            />
            <p>{formErrors.username}</p>
          </div>
          <div className="field">
          <label>Role</label>
          <input type="text"
          name="urole"
          placeholder="Role"
          required 
          onChange={(e) => handleChange(e)}
          autocomplete="off"
          />
          
           <p>{formErrors.role}</p>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="uemail"
              value={inputs.uemail}
              placeholder="Email"
              onChange={(e) => handleChange(e)}
              required
              autocomplete="off"
            />
            <p>{formErrors.email}</p>
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="upass"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              required
            />
            <p>{formErrors.password}</p>
            <p>{loginerr}</p>
            <button className="fluid ui button blue" onClick={(e) => handleSubmit(e)}>Submit</button>
          </div>
          </div>
          </form>
    </div>
  );
}
export default Shreyas;