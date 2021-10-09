/** @format */

import React from "react";

const StudentListItem = ({ student, onDelete, studentToUpdate }) => {
  function deleteStudent(id) {
    fetch(`${process.env.REACT_APP_API_HOST || ""}/api/students/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(id);
        } else {
          alert(response.statusText);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div className="row bg-light rounded list-item-hover py-1 my-1 mx-0 position-relative">
      <p className="col-1 m-0">{student.rollNumber}</p>
      <p className="col-4 m-0">{student.name}</p>
      <p className="col-2 m-0">{student.standard}</p>
      <p className="col-2 m-0">{student.gender}</p>
      <p className="col-2 m-0">{student.dob.slice(0, 10)}</p>
      <div className="col-1">
        <button
          className="btn btn-sm btn-primary py-0 me-1"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          onClick={() => studentToUpdate(student)}
        >
          Edit
        </button>
        <button className="btn btn-sm btn-danger py-0" onClick={() => deleteStudent(student._id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default StudentListItem;
