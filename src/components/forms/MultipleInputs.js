import React, { useState, useEffect } from "react";
import ImageCropper from "../ImageCropper";

const MultipleInputs = () => {
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });

    console.log(name, userRegistration);
  };
  const [userRegistration, setUserRegistration] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    cPassword: "",
    bSalary: "",
    allowances: "",
    totalSalary: "",
    contactNumber: "",
    address: "",
    date: "",
    department: "",
    maritalStatus: "",
    probation: "",
    emergencyNumber: "",
    emergencyRelationship: "",
  });
  const [records, setrecord] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.fname) {
      errors.fname = "First Name is required!";
    }
    if (!values.lname) {
      errors.lname = "Last Name is required!";
    }
    if (!values.email) {
      errors.email = "email  is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "email format not valid";
    }
    if (!values.password) {
      errors.password = "password  is required!";
    } else if (!strongRegex.test(values.password)) {
      errors.password = "password format not valid";
    }
    if (!values.cPassword) {
      errors.cPassword = "cPassword  is required!";
    } else if (!strongRegex.test(values.cPassword)) {
      errors.cPassword = "cPassword format not valid";
    }
    if (!values.cPassword === !values.password) {
      errors.cPassword = "password not match";
    } 
    return errors;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(userRegistration));

    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    setrecord([...records, newRecord]);

    // console.log(records);

    // console.log(records);
    setUserRegistration({
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      cPassword: "",
      bSalary: "",
      allowances: "",
      totalSalary: "",
      contactNumber: "",
      address: "",
      date: "",
      department: "",
      maritalStatus: "",
      probation: "",
      emergencyNumber: "",
      emergencyRelationship: "",
    });
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(userRegistration);
    }
  }, [formErrors]);
  return (
    <div className="container my-5">
      <form className="row g-3" action="" onSubmit={handleSubmit}>
        {/* ======================First Name====Last Name=====Username========================================== */}
        <h1>Registration Form</h1>
        <div className="col-md-4">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            autoComplete="off"
            name="fname"
            className="form-control"
            id="fname"
            value={userRegistration.fname}
            onChange={handleInput}
          />
          <p>{formErrors.fname}</p>
        </div>
        <div className="col-md-4">
          <label htmlFor="lname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            autoComplete="off"
            name="lname"
            className="form-control"
            id="lname"
            value={userRegistration.lname}
            onChange={handleInput}
          />
          <p>{formErrors.lname}</p>
        </div>
        <div className="col-md-4">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            value={userRegistration.username}
            autoComplete="off"
            onChange={handleInput}
          />
          <p>{formErrors.username}</p>
        </div>
        {/* ===============Email===Password====Confirm Password============================ */}
        <div className="col-md-4 ">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={userRegistration.email}
            id="email"
            onChange={handleInput}
            autoComplete="off"
          />
          <p>{formErrors.email}</p>
        </div>
        <div className="col-md-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={userRegistration.password}
            autoComplete="off"
            onChange={handleInput}
          />
          <p>{formErrors.password}</p>
        </div>
        <div className="col-md-4">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cPassword"
            className="form-control"
            id="cPassword"
            value={userRegistration.cPassword}
            autoComplete="off"
            onChange={handleInput}
          />
          <p>{formErrors.cPassword}</p>
        </div>
        {/* ================Profile Pic====Date of Birth========================= */}
        <div className="col-md-4 my-0">
          <label htmlFor="datepicker" className="form-label">
            Date of Birth
          </label>
          <div className="col-6">
            <div className="input-group date" id="datepicker">
              <input
                type="date"
                name="date"
                className="form-control"
                id="date"
                value={userRegistration.date}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
        <ImageCropper />
        {/* ==================Select Department=Basic Salary= Allowances =Total Salary======================= */}
        <div className="col-md-4">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <select
            className="form-select"
            name="department"
            aria-label="Default select example"
            onChange={handleInput}
            value={userRegistration.department}
          >
            <option selected>Select Department</option>
            <option value="1">Accounts and Finance</option>
            <option value="2">Internship</option>
            <option value="3">Product development</option>
            <option value="4">Security and transport.</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="bSalary" className="form-label">
            Basic Salary
          </label>
          <input
            type="number"
            name="bSalary"
            className="form-control"
            value={userRegistration.bSalary}
            id="bSalary"
            onChange={handleInput}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="allowances" className="form-label">
            Allowances (Home/Travelling)
          </label>
          <input
            type="number"
            name="allowances"
            className="form-control"
            value={userRegistration.allowances}
            id="allowances"
            onChange={handleInput}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="totalSalary" className="form-label">
            Total Salary
          </label>
          <input
            type="text"
            className="form-control"
            id="totalSalary"
            name=" totalSalary"
            onChange={handleInput}
            value={
              userRegistration.allowances && userRegistration.bSalary
                ? parseInt(userRegistration.allowances) +
                  parseInt(userRegistration.bSalary)
                : ""
            }
            disabled
          />
        </div>
        {/* =================Contact Number====Address======================= */}
        <div className="col-md-2">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number
          </label>
          <input
            type="number"
            name="contactNumber"
            className="form-control"
            value={userRegistration.contactNumber}
            id="contactNumber"
            onChange={handleInput}
          />
        </div>
        <div className="col-md-10">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            placeholder="1234 Main St"
            className="form-control"
            id="address"
            value={userRegistration.address}
            name="address"
            onChange={handleInput}
          />
        </div>
        {/* ======================Marital Status========================= */}
        <div className="col-md-12">
          <div className="row">
            <label htmlFor="address" className="form-label">
              Marital Status
            </label>
            <div className="form-check col-md-3">
              <input
                className="form-check-input"
                type="radio"
                name="maritalStatus"
                id="married"
                value="Married"
                onChange={handleInput}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Married
              </label>
            </div>
            <div className="form-check col-md-3">
              <input
                className="form-check-input"
                type="radio"
                name="maritalStatus"
                id="Unmarried"
                value="unMarried"
                onChange={handleInput}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                UnMarried
              </label>
            </div>
          </div>
        </div>
        {/* ==================Probation Time Period Stipend============================= */}
        <div className="col-6">
          <label htmlFor="probation" className="form-label">
            Probation Time Period
          </label>
          <input
            type="text"
            name="probation"
            className="form-control"
            id="probation"
            onChange={handleInput}
            value={userRegistration.probation}
          />
        </div>
        {userRegistration.department === "2" ? (
          <div className="col-6">
            <label htmlFor="stipend" className="form-label">
              Stipend
            </label>
            <input
              type="number"
              name="stipend"
              className="form-control"
              id="stipend"
              onChange={handleInput}
              value={userRegistration.stipend}
            />
          </div>
        ) : (
          ""
        )}
        {/* ====================Emergency Contact Number == Emergency Relationship======================== */}
        <div className="col-md-6">
          <label htmlFor="emergencyNumber" className="form-label">
            Emergency Contact Number
          </label>
          <input
            type="number"
            name="emergencyNumber"
            className="form-control"
            id="emergencyNumber"
            onChange={handleInput}
            value={userRegistration.emergencyNumber}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="emergencyRelationship" className="form-label">
            Emergency Relationship
          </label>
          <input
            type="text"
            className="form-control"
            id="emergencyRelationship"
            name="emergencyRelationship"
            onChange={handleInput}
            value={userRegistration.emergencyRelationship}
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-primary">
            Registration
          </button>
        </div>
      </form>

      <div>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div>
            <div className="ui message success">Submited in successfully</div>
            {records.map((curElem) => {
              const {
                fname,
                lname,
                username,
                email,
                password,
                cPassword,
                bSalary,
                allowances,
                totalSalary,
                contactNumber,
                address,
                date,
                department,
                maritalStatus,
                probation,
                emergencyNumber,
                emergencyRelationship,
              } = curElem;
              return (
                <div key={curElem.id}>
                  <hr />
                  <p>{fname}</p>
                  <p>{lname}</p>
                  <p>{username}</p>
                  <p>{email}</p>
                  <p>{password}</p>
                  <p>{cPassword}</p>
                  <p>{bSalary}</p>
                  <p>{allowances}</p>
                  <p>{totalSalary}</p>
                  <p>{address}</p>
                  <p>{contactNumber}</p>
                  <p>{date}</p>
                  <p>{department}</p>
                  <p>{maritalStatus}</p>
                  <p>{probation}</p>
                  <p>{emergencyNumber}</p>
                  <p>{emergencyRelationship}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <pre>{JSON.stringify(userRegistration, undefined, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default MultipleInputs;
