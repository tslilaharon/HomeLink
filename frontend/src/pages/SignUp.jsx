import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Style.css';
import OAuth from '../components/OAuth';

const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }

            setLoading(false);
            setError(null);
            navigate('/sign-in');

        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="signup-form m-5">
            <Container fluid className="p-3">

                <Form.Group className="m-3" controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={handleChange} type="userName" placeholder="User Name" />
                </Form.Group>

                <Form.Group className="m-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="m-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} type="password" placeholder="Password" />
                </Form.Group>
                <Button disabled={loading} className="m-3" variant="dark" type="submit">
                    {loading ? 'Loading...' : 'Sign Up'}
                </Button>
                <OAuth/>
                <p>Member?
                    <Link to={"/sign-in"}>
                        Sign In
                    </Link>
                </p>
            </Container>
            {error && <p>{error}</p>}
        </Form>
    )
}

export default SignUp