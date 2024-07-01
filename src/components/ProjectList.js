import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { Link } from 'react-router-dom';
import { addProject, fetchUserProjects } from '../actions/projectActions';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProjectList = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const projects = useSelector(state => state.projects.projects); // Get projects from Redux store
  const ID = localStorage.getItem('ID'); // Assuming ID is stored in localStorage

  // Fetch user projects when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserProjects(ID));
        setLoading(false); // Set loading to false after fetching projects
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false); // Ensure loading state is set to false on error too
      }
    };

    fetchData(); // Call the async function to fetch projects
  }, [dispatch, ID]); // Dependency array to ensure useEffect runs only on mount and when ID changes

  // Formik form handling for project creation
  const formik = useFormik({
    initialValues: {
      projectName: '',
      startDate: '',
      dueDate: '',
      description: '',
      status: 'Open', // Default status
      userId: ID, // User ID from localStorage
    },
    validate: values => {
      const errors = {};

      if (!values.projectName) {
        errors.projectName = 'Required';
      }
      if (!values.startDate) {
        errors.startDate = 'Required';
      }
      if (!values.dueDate) {
        errors.dueDate = 'Required';
      }
      if (values.startDate && values.dueDate && values.dueDate < values.startDate) {
        errors.dueDate = 'Must be after start date';
      }
      if (!values.description) {
        errors.description = 'Required';
      }
      if (!values.status) {
        errors.status = 'Required';
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(addProject(values)); // Dispatch addProject action with form values
        resetForm(); // Reset the form after successful submission
        setShowForm(false); // Hide the form after submission
        // Optionally, you can refetch projects here if needed
      } catch (error) {
        console.error('Error adding project:', error);
      }
    },
  });

  // Loading state while fetching projects
  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  // Render the ProjectList component with conditional rendering based on projects and form visibility
  return (
    <div className="container">
      {/* Button to create new project */}
      {projects.length === 0 && (
        <div className="text-center mb-3">
          <button
            className="btn btn-primary mt-4"
            style={{
              backgroundColor: 'black',
              color: 'white',
              fontFamily: 'cursive',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px'
            }}
            onClick={() => setShowForm(true)}
          >
            Create New Project
          </button>
        </div>
      )}

      {/* Form for creating a new project */}
      {showForm && (
        <div className="card mb-3 mt-5" style={{ maxWidth: '400px', margin: '0 auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
          <div className="card-body">
            <h5 className="card-title text-center mb-4">New Project</h5>
            <form onSubmit={formik.handleSubmit}>
              {/* Form inputs */}
              {/* Example input: Project Name */}
              <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${formik.touched.projectName && formik.errors.projectName ? 'is-invalid' : ''}`}
                  id="projectName"
                  name="projectName"
                  value={formik.values.projectName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ fontSize: '14px', border: '2px solid skyblue', fontFamily: 'cursive' }}
                />
                {formik.touched.projectName && formik.errors.projectName ? (
                  <div className="invalid-feedback">{formik.errors.projectName}</div>
                ) : null}
              </div>

              {/* Example input: Start Date */}
              <div className="form-group">
                <label htmlFor="startDate">Start by</label>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  selected={formik.values.startDate ? new Date(formik.values.startDate) : null}
                  onChange={date => formik.setFieldValue('startDate', date.toISOString().split('T')[0])}
                  onBlur={formik.handleBlur}
                  dateFormat="yyyy-MM-dd"
                  className={`form-control form-control-sm ml-3 ${formik.touched.startDate && formik.errors.startDate ? 'is-invalid' : ''}`}
                  placeholderText="Select start date"
                  style={{ fontSize: '14px', border: '2px solid skyblue', fontFamily: 'cursive' }}
                />
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="invalid-feedback">{formik.errors.startDate}</div>
                ) : null}
              </div>

              {/* Example input: Due Date */}
              <div className="form-group">
                <label htmlFor="dueDate">Due by</label>
                <DatePicker
                  id="dueDate"
                  name="dueDate"
                  selected={formik.values.dueDate ? new Date(formik.values.dueDate) : null}
                  onChange={date => formik.setFieldValue('dueDate', date.toISOString().split('T')[0])}
                  onBlur={formik.handleBlur}
                  dateFormat="yyyy-MM-dd"
                  className={`form-control form-control-sm ml-3 ${formik.touched.dueDate && formik.errors.dueDate ? 'is-invalid' : ''}`}
                  placeholderText="Select due date"
                  minDate={formik.values.startDate ? new Date(formik.values.startDate) : null}
                  style={{ fontSize: '14px', border: '2px solid skyblue', fontFamily: 'cursive' }}
                />
                {formik.touched.dueDate && formik.errors.dueDate ? (
                  <div className="invalid-feedback">{formik.errors.dueDate}</div>
                ) : null}
              </div>

              {/* Example input: Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control form-control-sm ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px', border: '2px solid skyblue', fontFamily: 'cursive' }}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="invalid-feedback">{formik.errors.description}</div>
                ) : null}
              </div>

              {/* Example input: Status */}
              <div className="form-group">
                <label htmlFor="status">STATUS</label>
                <select
                  id="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control form-control-sm ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px', border: '2px solid skyblue', fontFamily: 'cursive' }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Closed">Closed</option>
                </select>
                {formik.touched.status && formik.errors.status ? (
                  <div className="invalid-feedback">{formik.errors.status}</div>
                ) : null}
              </div>

              {/* Buttons for form actions */}
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontFamily: 'cursive' }}>
                  Create Project
                </button>
                <button type="button" className="btn btn-secondary btn-sm ml-2" onClick={() => setShowForm(false)} style={{ fontFamily: 'cursive' }}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Render projects table if there are projects */}
      {projects.length > 0 && !showForm && (
        <div className="card mt-3">
          <div className="card-body">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  {/* Table headers */}
                  <th scope="col">Project Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Render each project as a table row */}
                {projects.map(project => (
                  <tr key={project._id}>
                    <td >{project.projectName}</td>

                    <td>{project.startDate}</td>
                    <td>{project.dueDate}</td>
                    <td>{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Display a message when there are no projects */}
      {!showForm && projects.length === 0 && (
        <div className="text-center mt-3">
          <p>No projects found. Click the button above to create a new project.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
