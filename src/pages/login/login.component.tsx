import { Checkbox, Col, Form, Input, InputRef, Layout, Row } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import StyledButton from '../../common/components/button/button.component'
import StyledFooter from '../../common/components/footer/footer.component'
import AuthContext from '../../common/context/AuthProvider'
import './login.style.scss'

import logo from '../../assets/images/logo.svg'

function Login() {
    const { auth, login } = useContext(AuthContext)

    const emailRef = useRef<InputRef>(null)
    const errorRef = useRef<HTMLParagraphElement>(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remeberMe, setRemeberMe] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (emailRef.current) { emailRef.current.focus() }
    }, [])

    useEffect(() => {
        setErrorMsg('')
    }, [email, password])

    //TODO: Add backend login API call
    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>): Promise<any> {
        try {
            console.log(email);
            login({ email, password })
            setEmail('')
            setPassword('')
            setSuccess(true)
        }
        catch (err: any) {
            if (!err?.response) {
                setErrorMsg('No server response')
            } else if (err.response?.status === 400) {
                setErrorMsg('Missing Email or Password')
            } else if (err.response?.status === 401) {
                setErrorMsg('Unauthorized')
            }
            else {
                setErrorMsg('Login failed')
            }
        }
    }

    return (
        <div className="login w100-h100 container">
            <Row style={{ height: '100%' }}>
                <Col span={14} className="loginColumn">
                    <section className='loginContainer'>
                        <img className='logo' src={logo} alt="Logo image" />
                        {/* <p ref={errorRef} className={errorMsg ? 'error msg' : 'offscreen'} aria-live='assertive'>{errorMsg}</p> */}
                        <div className="form">
                            <h1 className='introTitle'>Sign in to RACE</h1>
                            <Form className='form' onFinish={handleSubmit}>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your e-mail address!' }]}
                                    style={{ marginBottom: '80px' }}
                                >
                                    <Input
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        value={email}
                                        ref={emailRef}
                                        id='email'
                                        type='email'
                                        placeholder='E-mail' />
                                </Form.Item>
                                <Form.Item
                                    current-password='true'
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    style={{ marginBottom: '35px' }}
                                >
                                    <Input.Password
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        value={password}
                                        id='password'
                                        type='password'
                                        placeholder='Password' />
                                </Form.Item>
                                <div className="rememberMe">
                                    <Checkbox onChange={(e) => { setRemeberMe(e.target.value) }}>Remember me</Checkbox>
                                    <a className='forgotPasswordLink'>Forgot password?</a>
                                </div>
                                <StyledButton submitButton>Submit</StyledButton>
                                <p>Quick Sign-in:</p>
                                <p>Don't have an account? <a>Register now</a></p>
                                <h1>Logged in {auth.email}</h1>
                            </Form>
                        </div>
                    </section>
                </Col>
                <Col span={10} className="imageColumn">
                </Col>
            </Row>
            <StyledFooter />
        </div>
    )
}

export default Login