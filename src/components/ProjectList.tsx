// ProjectList.tsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addProject, fetchUserProjects } from '../actions/projectActions';
import { useFormik } from 'formik';
import { FaChevronCircleRight } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ProjectList.css';
import { Project, RootState } from '../actions/interfaces'; // Adjust as per your project type definition
import { FaProjectDiagram } from 'react-icons/fa';

const ProjectList: React.FC = () => {
console.log("inside project");
  const [showForm, setShowForm] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const projects: Project[] = useSelector((state: RootState) => state.projects.projects); // Adjust state type as per your Redux store
  const ID: string | null = localStorage.getItem('ID');
  const navigate = useNavigate();
  console.log("before useeffect", loading);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch<any>(fetchUserProjects(ID || ''));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    if (ID) {
      fetchData();
    }
  }, [dispatch, ID]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const getStatusBadge = (status: string): React.ReactNode => {
    let displayText = status.toUpperCase();

    if (status.length > 7) {
      displayText = status.substring(0, 7).toUpperCase() + '...';
    }

    return <div className="status-badge">{displayText}</div>;
  };
console.log("LOADING",loading);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();

    if (date.getFullYear() === currentYear) {
      return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } else {
      return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
  };

  const getDueDateColor = (dueDate: string): string => {
    const now = new Date();
    const due = new Date(dueDate);

    const diff = due.getTime() - now.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);

    if (diff < 0 || diffInDays < 7) {
      return 'red';
    } else {
      return 'inherit';
    }
  };

  const formik = useFormik({
    initialValues: {
      projectName: '',
      startDate: '',
      dueDate: '',
      description: '',
      status: 'Open',
      userId: ID || '',
    },
    validate: values => {
      const errors: Partial<typeof values> = {};

      if (!values.projectName) {
        errors.projectName = 'Required';
      }
      if (!values.startDate) {
        errors.startDate = 'Required';
      }
      if (!values.dueDate) {
        errors.dueDate = 'Required';
      }
      if (values.startDate && values.dueDate && new Date(values.dueDate) < new Date(values.startDate)) {
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
        const projectWithUserId = { ...values, userId: ID };
        await dispatch<any>(addProject(projectWithUserId));
        alert('Project Added Successfully');
        resetForm();
        setShowForm(false);
        await dispatch<any>(fetchUserProjects(ID || ''));
      } catch (error) {
        console.error('Error adding project:', error);
      }
    },
  });

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  const navigateToProjectDetail = (projectId: string) => {
    navigate(`/edit/${projectId}`);
  };

  return (

    
    <div className={`${showForm ? 'form-background' : 'project-list-container'}`}>
      {!showForm ? (
        <div className="header-footer" onClick={toggleForm} style={{ cursor: 'pointer' }}>
          New project +
        </div>
      ) : (
        <div className="form-container" style={{ backgroundColor: '#f9f9fb' }}>
          <form onSubmit={formik.handleSubmit}>
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
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div className="invalid-feedback">{formik.errors.projectName}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start by</label>
              <DatePicker
                id="startDate"
                name="startDate"
                selected={formik.values.startDate ? new Date(formik.values.startDate) : null}
                onChange={(date) => formik.setFieldValue('startDate', date)}
                onBlur={formik.handleBlur}
                dateFormat="yyyy-MM-dd h:mm aa"
                showTimeSelect
                timeFormat="HH:mm"
                className={`form-control form-control-sm ml-3 ${formik.touched.startDate && formik.errors.startDate ? 'is-invalid' : ''}`}
                placeholderText="Select start date and time"
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <div className="invalid-feedback">{formik.errors.startDate}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due by</label>
              <DatePicker
                id="dueDate"
                name="dueDate"
                selected={formik.values.dueDate ? new Date(formik.values.dueDate) : null}
                onChange={(date) => formik.setFieldValue('dueDate', date)}
                onBlur={formik.handleBlur}
                dateFormat="yyyy-MM-dd h:mm aa"
                showTimeSelect
                timeFormat="HH:mm"
                className={`form-control form-control-sm ml-3 ${formik.touched.dueDate && formik.errors.dueDate ? 'is-invalid' : ''}`}
                placeholderText="Select due date and time"
                minDate={formik.values.startDate ? new Date(formik.values.startDate) : undefined}
              />
              {formik.touched.dueDate && formik.errors.dueDate ? (
                <div className="invalid-feedback">{formik.errors.dueDate}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control form-control-sm ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="invalid-feedback">{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="status">STATUS</label>
              <select
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control form-control-sm ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
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

            <div className="form-group text-right">
              <button type="submit" className="btn btn-primary mr-2" disabled={formik.isSubmitting}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Back
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="project-table" style={{ display: showForm ? 'none' : 'table' }}>
        <thead>
          <tr>
          <th style={{ paddingLeft: '50px' }}>{projects.length} PROJECTS</th>
          <th style={{ paddingLeft: '30px' }}>START BY</th>
        <th style={{ paddingLeft: '30px' }}>DUE BY</th>
        <th style={{ position: 'relative' }}>STATUS</th>
            
        </tr>
    </thead>
    <tbody>
            
          {projects.map((project) => (
            <tr key={project._id}>
              <td style={{ fontSize: '22px', cursor: 'pointer' }} onClick={() => navigateToProjectDetail(project._id)}>
            <FaChevronCircleRight style={{ marginRight: '100px', fontSize: '26px', color: 'slategrey' }} />
            {project.projectName}
          </td>
              <td>{formatDate(project.startDate)}</td>
              <td style={{ color: getDueDateColor(project.dueDate) }}>{formatDate(project.dueDate)}</td>
              <td>{getStatusBadge(project.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="header-footer" onClick={toggleForm} style={{ cursor: 'pointer', display: !showForm ? 'block' : 'none' }}>
    New project +
  </div>
    </div>
  );
};

export default ProjectList;
