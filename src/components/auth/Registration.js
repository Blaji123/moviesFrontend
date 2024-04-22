import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const registerUser = async (registration) => {
    try {
      const response = await api.post("auth/register-user", registration);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error(`User registration error: ${error.message}`);
      }
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(registration);
      setSuccesMessage(response);
      setErrorMessage("");
      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setSuccesMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccesMessage("");
    }, 5000);
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {succesMessage && <p className="alert alert-succes">{succesMessage}</p>}
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div className="mb-3 row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            First Name:
          </label>
          <div className="col-sm-10">
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              value={registration.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Last Name:
          </label>
          <div className="col-sm-10">
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              value={registration.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email:
          </label>
          <div className="col-sm-10">
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={registration.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password:
          </label>
          <div className="col-sm-10">
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={registration.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
          >
            Register
          </button>
          <span style={{ marginLeft: "10px" }}>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
    </section>
  );
};
export default Registration;
