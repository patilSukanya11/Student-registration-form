import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    department: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });


  const validate = () => {
    let temp = {};

    if (!formData.firstName.trim()) temp.firstName = "First name is required";
    if (!formData.lastName.trim()) temp.lastName = "Last name is required";

    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      temp.email = "Enter a valid email";

    if (!formData.phone.match(/^[6-9]\d{9}$/))
      temp.phone = "Enter a valid 10-digit phone number";

    if (!formData.gender) temp.gender = "Please select gender";
    if (!formData.dob) temp.dob = "Please select DOB";
    if (!formData.department) temp.department = "Select a department";

    if (!formData.address.trim())
      temp.address = "Address cannot be empty";

    if (!formData.city.trim()) temp.city = "City is required";
    if (!formData.state.trim()) temp.state = "State is required";

    if (!formData.pincode.match(/^\d{6}$/))
      temp.pincode = "Enter a valid 6-digit pincode";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ------------------ HANDLE CHANGE ------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ------------------ HANDLE SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setLoading(true);

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", formData);

      toast.success("Student Registered Successfully 🎉");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        department: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="form-wrapper">
      <ToastContainer />
      <div className="registration-card animate-card">
        <h2 className="form-title">Student Registration Form</h2>

        <form onSubmit={handleSubmit}>

          {/* FIRST + LAST NAME */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.firstName}</small>
            </div>

            <div className="col-md-6 mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.lastName}</small>
            </div>
          </div>

          {/* EMAIL + PHONE */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.email}</small>
            </div>

            <div className="col-md-6 mb-3">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                maxLength="10"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.phone}</small>
            </div>
          </div>

          {/* GENDER + DOB */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Gender</label>
              <select
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <small className="text-danger">{errors.gender}</small>
            </div>

            <div className="col-md-6 mb-3">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={formData.dob}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.dob}</small>
            </div>
          </div>

          {/* DEPARTMENT */}
          <div className="mb-3">
            <label>Department</label>
            <select
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option>Computer Science</option>
              <option>Mechanical</option>
              <option>Electrical</option>
              <option>Civil</option>
              <option>IT</option>
            </select>
            <small className="text-danger">{errors.department}</small>
          </div>

          {/* ADDRESS */}
          <div className="mb-3">
            <label>Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="2"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            <small className="text-danger">{errors.address}</small>
          </div>

          {/* CITY STATE PIN */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.city}</small>
            </div>

            <div className="col-md-4 mb-3">
              <label>State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.state}</small>
            </div>

            <div className="col-md-4 mb-3">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                maxLength="6"
                className="form-control"
                value={formData.pincode}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.pincode}</small>
            </div>
          </div>

          {/* SUBMIT */}
          <button className="btn btn-submit" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Student"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default App;
