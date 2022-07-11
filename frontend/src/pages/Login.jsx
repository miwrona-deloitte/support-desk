import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const dispatch = useDispatch();

    const { user, isSuccess, isLoading, message } = useSelector(state => state.auth);

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (user && isSuccess) {
            navigate('/');
        } else if (message) {
            toast.error(message);
        }
        dispatch(reset());
    }, [user, isSuccess, navigate, message, dispatch]);
    const onSubmit = e => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    };

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt />
                    Login
                </h1>
                <p>Please login to get support</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block' onSubmit={onSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
