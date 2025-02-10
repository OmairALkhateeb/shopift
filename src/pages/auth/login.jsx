import Layout from '@/Components/Layout/Layout';
import useHostname from '@/Components/Provider/HostnameProvider';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Col, Container, Form, Row } from 'react-bootstrap';

const login = () => {
  const originalUrl = useHostname();

  const [tooglePassword, settooglePassword] = useState(true);
  const [toogleChecklist, settoogleChecklist] = useState(false);

  // State to store user input and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://fantasia-shop.com/api/login', {
        email,
        password,
      });

      // Handle successful response
      const { token, user } = response.data;
      console.log('Login successful', token, user);

      // Save token and user info (e.g., in localStorage or context)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to the dashboard or home page
      window.location.href = '/';
    } catch (error) {
      // Handle error response
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Layout navbar={false} footer={false} title='Shotify - Login' description='Shotify - Login Desc'>
        <section className='relative bg-Msurfacesurfacesecondary w-full md:min-h-screen min-h-dvh flex items-center justify-center py-[4rem]'>
          <Container>
            <Row className='justify-center'>
              <Col md={5}>
                <div className="bg-white p-4 rounded-[12px] border !border-Mborderborderprimary shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)]">
                  <div className="mb-10 text-center">
                    <h4 className='font-semibold text__24'>Welcome to Shotify</h4>
                    <p className='text__16 text-Mtexttextsecondary'>Please sign-in to your account and start the adventures</p>
                  </div>

                  <form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        className='font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3 outline-none shadow-none'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Password</Form.Label>
                      <div className="relative">
                        <Form.Control
                          type={tooglePassword ? "password" : "text"}
                          placeholder="Enter your password"
                          className='font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3 outline-none shadow-none'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <img
                          onClick={() => settooglePassword(!tooglePassword)}
                          src={originalUrl + "/images/eye-slash.svg"}
                          className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-4'
                          alt=""
                        />
                      </div>
                    </Form.Group>

                    <div className="mb-6">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => settoogleChecklist(!toogleChecklist)}>
                        <div className={"flex items-center justify-center w-[24px] h-[24px] rounded-[4px] border " + (toogleChecklist ? "border-Mmaincolorgreen bg-Mmaincolorgreen" : "border-[#A3A3A3]")}>
                          <img src={originalUrl + "/images/check (3).svg"} className={toogleChecklist ? "opacity-100" : "opacity-0"} alt="" />
                        </div>
                        <span className='text__16 text-Mtexttextsecondary'>Remember me</span>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="mb-3 text-center text-red-500">{errorMessage}</div>
                    )}

                    <div className="text-center">
                      <button
                        type="submit"
                        className='rounded-xl inline-block text-center font-medium text__16 text-white !py-[15px] bg-Mmaincolorgreen w-full cursor-pointer'
                        disabled={isLoading}
                      >
                        {isLoading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>
                  </form>

                  <div className="text-center my-4">
                    <p className='text__16 font-medium text-Mtexttextsecondary'>New on our platform? <Link className="text-Mmaincolorgreen" href="/auth/register">Create an account</Link></p>
                  </div>

                  <div className="my-3 relative">
                    <div className="absolute h-[1px] left-0 w-full top-1/2 -translate-y-1/2 bg-Mborderborderprimary"></div>
                    <div className='px-4 py-2 bg-white inline-block text__14 text-Mtexttextinvert relative z-[2]'>Or Log In with</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a href='#!' className="relative inline-block px-3 py-[10px] w-full text-center rounded-[8px] border border-solid border-Mborderborderprimary">
                      <div className="flex items-center justify-center gap-3">
                        <img src={originalUrl + "/images/Icon - Google.svg"} alt="" />
                        <div className="relative z-2 font-medium text__16">Google</div>
                      </div>
                    </a>
                    <a href='#!' className="relative inline-block px-3 py-[10px] w-full text-center rounded-[8px] border border-solid border-Mborderborderprimary">
                      <div className="flex items-center justify-center gap-3">
                        <img src={originalUrl + "/images/facebook-3-2 1.svg"} alt="" />
                        <div className="relative z-2 font-medium text__16">Facebook</div>
                      </div>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </Fragment>
  );
};

export default login;
