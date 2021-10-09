/** @format */

import { React, useState, useRef, useEffect } from "react";

const StudentEditPopup = ({ student, onReturnUser }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [standard, setStandard] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const closeModalRef = useRef(null);
  useEffect(() => {
    if (student) {
      setRollNumber(student.rollNumber);
      setName(student.name);
      setStandard(student.standard);
      setGender(student.gender);
      setDob(student.dob.slice(0, 10));
    } else {
      setRollNumber("");
      setName("");
      setStandard("");
      setGender("");
      setDob("");
    }
  }, [student]);

  async function submitRequest() {
    const data = { rollNumber, name, standard, gender, dob };
    const url = `${process.env.REACT_APP_API_HOST || ""}/api/students/${student ? student._id : ""}`;
    const method = student ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onReturnUser(await response.json());
      closeModalRef.current.click();
    } else {
      alert(response.statusText);
    }
  }

  return (
    <>
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                {student ? "Edit" : "Add"} Student
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeModalRef}
              ></button>
            </div>

            <div className="modal-body row gx-1">
              <div className="col-4 mb-2">
                <label className="form-label" htmlFor="rollNumber-input">
                  Roll Number
                </label>
                <input
                  type="number"
                  id="rollNumber-input"
                  className="form-control form-control-sm"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>
              <div className="col-8 mb-2">
                <label className="form-label" htmlFor="name-input">
                  Name
                </label>
                <input
                  type="text"
                  id="name-input"
                  className="form-control form-control-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label" htmlFor="standard-input">
                  Standard
                </label>
                <input
                  type="text"
                  id="standard-input"
                  className="form-control form-control-sm"
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                />
              </div>
              <div className="col-4 mb-2">
                <label className="form-label" htmlFor="gender-input">
                  Gender
                </label>
                <select
                  id="gender-input"
                  className="form-select form-select-sm"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-4 mb-2">
                <label className="form-label" htmlFor="dob-input">
                  Date of birth
                </label>
                <input
                  type="date"
                  id="dob-input"
                  className="form-control form-control-sm"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-success" onClick={submitRequest}>
                {student ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentEditPopup;
