import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProjects, updateProject } from '../actions/projectActions';


const EditProject = () => {
    // Extract projectId from the URL parameters
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
   // Get the list of projects from the Redux store
  const projects = useSelector(state => state.projects.projects);
  const [loading, setLoading] = useState(true);
  
 // State to manage the form data
  const [formData, setFormData] = useState({
    projectName: '',
    dueDate: '',
    description: '',
    status: 'Open' // Default status
  });

   // Fetch the project details when the component mounts or projectId changes
  useEffect(() => {
    dispatch(fetchUserProjects(projectId));
  }, [dispatch, projectId]);

   // Populate the form with the project data once it's fetched
  useEffect(() => {
    const project = projects.find(project => project._id === projectId);
    console.log(project)
    if (project) {
      console.log(project)
      setFormData({
        projectName: project.projectName,
        dueDate: project.dueDate ,
        description: project.description,
        status: project.status
      });
      setLoading(false)
    }
  }, [projects, projectId]);

   // Handle input change for form fields
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value

      
    }));
   
  };

 // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    alert("Changes Saved Successfully")
    await dispatch(updateProject(projectId, formData));
    dispatch(fetchUserProjects());// Re-fetch project list after adding new one
    navigate('/projectlist');
  };
  
// Display a loading message while the project data is being fetched
  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>; // Display a loading message centered
  }
  return (
    <div className="container mt-5">
      <h3>Edit Project</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;
