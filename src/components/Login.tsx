import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { loginUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: FormValues, { resetForm }) => {
      setErrorMessage(null);
      setLoading(true);

      try {
        const userData = {
          email: values.email,
          password: values.password,
        };

        const response = await dispatch<any>(loginUser(userData)); // Dispatch with any as the argument

        setLoading(false);

        if (response && response.token) {
          window.localStorage.setItem('token', response.token);
          window.localStorage.setItem('ID', response.user._id);
          alert('Logged in successfully!');
          navigate('/projectlist');
          resetForm();
        } else {
          throw new Error('Login failed, please check your credentials.');
        }
      } catch (error: any) { // Explicitly type error as any or specify the expected error type
        setErrorMessage(
          error.response?.data?.message || 'Login failed. Please check your credentials.'
        );
        console.log('Error during login:', error);
      }
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
      formik.resetForm();
      setLoading(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [errorMessage, formik]);

  return (
    <div className="login-body">
      <div className="login-form">
        {errorMessage && (
          <div
            className="alert alert-danger mt-3 ml-5"
            style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group login-group">
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
