import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure, } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

import '../assets/styles/Style.css';

const SignIn = () => {

    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }

            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="signup-form m-5">
            <Container fluid className="p-3">

                <Form.Group className="m-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="m-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} type="password" placeholder="Password" />
                </Form.Group>
                <Button disabled={loading} className="m-3" variant="dark" type="submit">
                    {loading ? 'Loading...' : 'Sign In'}
                </Button>
                <OAuth />
                <p>Not a member?
                    <Link to={"/sign-up"}>
                        Sign Up
                    </Link>
                </p>
            </Container>
            {error && <p>{error}</p>}
        </Form>
    )
}

export default SignIn