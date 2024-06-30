import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { loginUser } from '../actions/authActions'; 
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Access navigate function


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Please enter Email';
        }
        if (!values.password) {
            errors.password = 'Please enter Password';
        }
        return errors;
    },
    onSubmit: async(values) => {
        try {
            const userData = {
                username: values.username,
                password: values.password,
            };
          
            await dispatch(loginUser(userData));
            console.log("Logged In")
            alert('Logged in successfully!'); 
            // Navigate to the project list page after successful login
            navigate('/projectlist'); 
          } catch (error) {
            alert(error.message); 
          }
    },
  });

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-9 col-lg-6 col-xl-4 shadow p-3 mb-5 rounded">
            <div className="p-5" style={{ color: 'tomato', fontSize: '18px', fontFamily: 'cursive' }}>
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome!</h1>
                </div>
                 {/* Login form */}
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Enter your Email"
                            style={{ border: '2px solid skyblue' }}
                        />
                        <span className="text-danger">{formik.errors.email}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={`form-control ${formik.errors.password ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder="Enter your password"
                            style={{ border: '2px solid skyblue' }}
                        />
                        <span className="text-danger">{formik.errors.password}</span>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-info rounded col-lg-12 mt-4">Log in</button>
                    </div>
                    <hr />
                </form>
      
                <div className="text-center mt-2">
                    <Link to="/register">Create an Account!</Link>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Login;
