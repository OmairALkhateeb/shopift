import Layout from '@/Components/Layout/Layout';
import useHostname from '@/Components/Provider/HostnameProvider';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
    const originalUrl = useHostname();

    const [tooglePassword, settooglePassword] = useState(true);
    const [toogleChecklist, settoogleChecklist] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!toogleChecklist) {
            setError('Please agree to the privacy policy and terms.');
            return;
        }
        try {
            const response = await axios.post('https://fantasia-shop.com/api/register', {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password,
            });

            if (response.data.success) {
                setSuccess('Registration successful! Redirecting...');
                setError('');
                // Redirect or handle success (e.g., navigate to the login page)
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <Fragment>
            <Layout
                navbar={false}
                footer={false}
                title="Shotify - Register"
                description="Shotify - Register Desc"
            >
                <section className="relative bg-Msurfacesurfacesecondary w-full md:min-h-screen min-h-dvh flex items-center justify-center py-[4rem]">
                    <Container>
                        <Row className="justify-center">
                            <Col md={5}>
                                <div className="bg-white p-4 rounded-[12px] border !border-Mborderborderprimary shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)]">
                                    <div className="mb-10 text-center">
                                        <h4 className="font-semibold text__24">Let’s get started</h4>
                                        <p className="text__16 text-Mtexttextsecondary">
                                            Begin by creating an account
                                        </p>
                                    </div>

                                    <Form onSubmit={handleRegister}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="font-normal text__14 text-[#A3A3A3]">
                                                    First Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter First Name"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-Mborderborderprimary focus:border-Mborderborderprimary focus:bg-transparent"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="font-normal text__14 text-[#A3A3A3]">
                                                    Last Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Last Name"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-Mborderborderprimary focus:border-Mborderborderprimary focus:bg-transparent"
                                                    required
                                                />
                                            </Form.Group>
                                        </div>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="font-normal text__14 text-[#A3A3A3]">
                                                Email
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-Mborderborderprimary focus:border-Mborderborderprimary focus:bg-transparent"
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="font-normal text__14 text-[#A3A3A3]">
                                                Password
                                            </Form.Label>
                                            <div className="relative">
                                                <Form.Control
                                                    type={tooglePassword ? 'password' : 'text'}
                                                    placeholder="Enter your password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-Mborderborderprimary focus:border-Mborderborderprimary focus:bg-transparent"
                                                    required
                                                />
                                                <img
                                                    onClick={() =>
                                                        settooglePassword(!tooglePassword)
                                                    }
                                                    src={
                                                        originalUrl +
                                                        '/images/eye-slash.svg'
                                                    }
                                                    className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"
                                                    alt=""
                                                />
                                            </div>
                                        </Form.Group>

                                        <div className="mb-6">
                                            <div
                                                className="flex items-center gap-2 cursor-pointer"
                                                onClick={() =>
                                                    settoogleChecklist(!toogleChecklist)
                                                }
                                            >
                                                <div
                                                    className={
                                                        'flex items-center justify-center w-[24px] h-[24px] rounded-[4px] border border-solid  ' +
                                                        (toogleChecklist
                                                            ? 'border-Mmaincolorgreen bg-Mmaincolorgreen'
                                                            : 'border-[#A3A3A3]')
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            originalUrl +
                                                            '/images/check (3).svg'
                                                        }
                                                        className={
                                                            toogleChecklist
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <span className="text__16 text-Mtexttextsecondary">
                                                    I agree to{' '}
                                                    <a
                                                        href="#!"
                                                        className="text-Mtexttextbrand"
                                                    >
                                                        privacy policy & term
                                                    </a>
                                                </span>
                                            </div>
                                        </div>

                                        {error && (
                                            <p className="text-red-500 text-center mb-4">
                                                {error}
                                            </p>
                                        )}
                                        {success && (
                                            <p className="text-green-500 text-center mb-4">
                                                {success}
                                            </p>
                                        )}

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="rounded-xl inline-block text-center font-medium text__16 text-white !py-[15px] bg-Mmaincolorgreen !border-Mmbg-Mmaincolorgreen btnClass w-full cursor-pointer"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>
        </Fragment>
    );
};

export default Register;
