import { useState, useEffect } from 'react';
import StudentEditPopup from './components/StudentEditPopup';
import StudentListItem from './components/StudentListItem';

function App() {

  const [students, setStudents] = useState([]);
  const [studentToUpdate, setStudentToUpdate] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST || ''}/api/students/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(response.statusText);
          return [];
        }
      })
      .then((data) => {
        setStudents(data)
      })
      .catch((error) => {
        alert(error)
      });
  }, []);

  function removeStudent(id) {
    setStudents(students.filter((s) => s._id !== id));
  }
  function addUpdateUser(newStudent) {
    let i = students.findIndex((s) => s._id === newStudent._id);
    if (i >= 0) {
      let newList = [...students];
      newList[i] = newStudent;
      setStudents(newList);
    } else {
      setStudents([...students, newStudent])
    }
  }

  return <main className="container mt-5">
    <header className="d-flex justify-content-between align-items-center">
      <div>
        <h4 className="text-muted">Express React CRUD App</h4>
        <h1>Students</h1>
      </div>
      <button className="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#editModal"
        onClick={() => setStudentToUpdate(null)}>Add New Student</button>
    </header>
    <div className="row border-bottom mt-3 mx-0">
      <h5 className="col-1 text-muted">Roll No.</h5>
      <h5 className="col-4 text-muted">Name</h5>
      <h5 className="col-2 text-muted">Class</h5>
      <h5 className="col-2 text-muted">Gender</h5>
      <h5 className="col-2 text-muted">DOB</h5>
    </div>
    <div>
      {students.map(s => <StudentListItem student={s} key={s._id} onDelete={removeStudent} studentToUpdate={setStudentToUpdate} />)}
    </div>
    <StudentEditPopup student={studentToUpdate} onReturnUser={addUpdateUser} />
  </main>
}

export default App;
