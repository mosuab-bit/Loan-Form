import React, { useState } from "react";
import "./FormStyles.css";
import Modal from "./Modal";
function LoanForm() {
  const [loanInputs, setLoanInputs] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    isEmployee: false,
    slaryRange: "",
  });

  const [showModel, setShowModel] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(null);
  function handleClick(event) {
    event.preventDefault();
    setErrorMessage(null);
    const { age, phoneNumber } = loanInputs;
    const phoneRegex = /^[0-9]{10,12}$/; // Regular expression for 10-12 digits
    if (isNaN(age) || age < 18 || age > 100) {
      setErrorMessage("The age is not allowed");
    } else if (
      !phoneRegex.test(phoneNumber) ||
      phoneNumber.length < 10 ||
      phoneNumber.length > 12
    ) {
      setErrorMessage("Phone Number Format is not Correct");
    }
    setShowModel(true);
  }
  const isDisabled =
    loanInputs.name === "" ||
    loanInputs.phoneNumber === "" ||
    loanInputs.age === "";

  function handleDivClick() {
    if (showModel) {
      setShowModel(false);
    }
  }

  return (
    <div
      className="flex"
      style={{ flexDirection: "column" }}
      onClick={handleDivClick}
    >
      <form className="flex" id="loan-form">
        <h1>Requisting a Loan</h1>
        <hr />

        <label>Name:</label>
        <input
          value={loanInputs.name}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, name: event.target.value });
          }}
        />

        <label>Phone Number:</label>
        <input
          value={loanInputs.phoneNumber}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, phoneNumber: event.target.value });
          }}
        />

        <label>Age:</label>
        <input
          value={loanInputs.age}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, age: event.target.value });
          }}
        />

        <label style={{ marginTop: "30px" }}>Are You Employee ?</label>
        <input
          type="checkbox"
          checked={loanInputs.isEmployee}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, isEmployee: event.target.checked });
          }}
        />

        <label>Salary</label>
        <select
          value={loanInputs.slaryRange}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, slaryRange: event.target.value });
          }}
        >
          <option>Less than 500$</option>
          <option>Between 500$ and 2000$</option>
          <option>above 2000$</option>
        </select>

        <button
          className={isDisabled ? "disabled" : ""}
          id="submit-loan-btn"
          disabled={isDisabled}
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
      <Modal errorMessage={ErrorMessage} isVisible={showModel} />
    </div>
  );
}

export default LoanForm;
