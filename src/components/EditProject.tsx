import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProject, fetchUserProjects, updateProject } from '../actions/projectActions';
import { RootState, Project } from '../actions/interfaces'; // Ensure correct path for your types
import './EditProject.css';

const EditProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth?.userId); // Access userId from auth slice
  console.log("inside editproject",);
  const [formData, setFormData] = useState<Project>({
    _id: '',
    userId: null,
    projectName: '',
    startDate: '',
    dueDate: '',
    description: '',
    status: 'Open',
  });

  const [editMode, setEditMode] = useState(false);
  const project = useSelector((state: RootState) => state.projects.project);
  console.log("project result",project);
  useEffect(() => {
    if (projectId) {
      console.log("project id insideuseeffect",projectId);
      dispatch<any>(fetchProject(projectId));
      
    }
  }, [dispatch, projectId]);
  console.log("projectId",projectId);
  console.log("project result 2",project);
  useEffect(() => {
    console.log("inside editproject");
    console.log("project result", project);
    console.log("projectId", projectId);
  }, [project, projectId]);
  useEffect(() => {
    if (project) {
      setFormData({
        _id: project._id,
        userId: project.userId,
        projectName: project.projectName,
        startDate: project.startDate,
        dueDate: project.dueDate,
        description: project.description,
        status: project.status,
      });
    }
  }, [project]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    alert('Changes Saved Successfully');
    if (projectId) {
      await dispatch<any>(updateProject(projectId, formData));
      if (userId) {
        dispatch<any>(fetchUserProjects(userId));
      }
      navigate('/projectlist');
    }
  };

  const handleSaveChanges = async () => {
    await handleSubmit();
  };

  const handleClose = () => {
    navigate('/projectlist');
  };

  const isDueDateExpired = () => {
    const dueDate = new Date(formData.dueDate);
    const currentDate = new Date();
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return timeDiff < 0 || daysDiff < 7;
  };

  const getStatusColor = () => {
    return isDueDateExpired() ? 'red' : 'black';
  };

  const getDueDateColor = () => {
    return isDueDateExpired() ? 'red' : 'black';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();

    if (date.getFullYear() === currentYear) {
      return date.toLocaleString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
    } else {
      return date.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });
    }
  };

  if (!project) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="edit-project-container">
      <div className="form-header">
        <div className="header-title">Edit Project</div>
        <button className="close-button" onClick={handleClose}>&times;</button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="status">Status</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={!editMode}
              style={{ color: getStatusColor(), background: 'transparent', borderColor: getStatusColor() }}
              required
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="dueDate">Due Date</label>
            {editMode ? (
              <div className="due-date-container">
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  style={{ color: getDueDateColor() }}
                  required
                />
              </div>
            ) : (
              <span className="due-date" style={{ color: getDueDateColor() }}>{formatDate(formData.dueDate)}</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            readOnly={!editMode}
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
            readOnly={!editMode}
            required
          />
        </div>
        <button type="button" className="btn btn-info" onClick={editMode ? handleSaveChanges : () => setEditMode(true)}>
          {editMode ? 'Save Changes' : 'Edit'}
        </button>
      </form>
    </div>
  );
};

export default EditProject;
