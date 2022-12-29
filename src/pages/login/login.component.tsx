import { Checkbox, Col, Form, Input, InputRef, Layout, Row } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GoogleCircleFilled, SlackCircleFilled } from '@ant-design/icons';
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../common/context';
import { StyledButton } from '../../common/components';

import './login.style.scss'
import { Link, useNavigate } from 'react-router-dom';


function Login() {
    const { t, i18n } = useTranslation();

    const { auth, login } = useContext(AuthContext)
    const navigate = useNavigate();

    const emailRef = useRef<InputRef>(null)
    const errorRef = useRef<HTMLParagraphElement>(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRemeberMe] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const FILMS_QUERY = gql`
    {
        launchesPast(limit: 10) {
        id
        mission_name
        }
    }
    `;

    const { data, loading, error } = useQuery(FILMS_QUERY);

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
            navigate('/dashboard')
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

    if (loading) return <>"Using GraphQL to fetch Loading..."</>;
    if (error) return <pre>{error.message}</pre>


    {
        console.log("Using GraphQL to fetch data...");

        data.launchesPast.map((launch: any) => (
            console.log(launch.mission_name)
        ))
    }

    console.log(t('login.title'));


    return (
        <div className="form">
            <h1 className='introTitle'>{t('login.title')}</h1>
            <Form className='form' onFinish={handleSubmit}>
                <div className="input-container">
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: <>{t('login.form.emailError')}</>
                            },
                            {
                                type: 'email',
                                message: <>{t('register.form.emailValidationError')}</>,
                            },]}
                        style={{ marginBottom: '50px' }}
                    >
                        <Input
                            onChange={(e) => { setEmail(e.target.value) }}
                            autoComplete="email"
                            value={email}
                            ref={emailRef}
                            id='email'
                            type='email'
                            placeholder={t('login.form.email') + ""} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: <>{t('login.form.passwordError')}</> }]}
                        style={{ marginBottom: '35px' }}
                    >
                        <Input.Password
                            onChange={(e) => { setPassword(e.target.value) }}
                            autoComplete="current-password"
                            value={password}
                            id='password'
                            type='password'
                            placeholder={t('login.form.password') + ""} />
                    </Form.Item>
                </div>
                <div className="rememberMe">
                    <Checkbox onChange={(e) => { setRemeberMe(e.target.value) }}>{t('login.form.remember')}</Checkbox>
                    <a className='forgotPasswordLink'>{t('login.form.forgotPassword')}</a>
                </div>
                <StyledButton submitButton>{t('login.form.submit')}</StyledButton>
                <div className="quickSignIn">
                    <p>{t('login.form.quickSignIn')}:</p> <GoogleCircleFilled style={{ color: "#4A626E" }} /> <SlackCircleFilled style={{ color: "#4A626E" }} />
                </div>
                <p>{t('login.form.noAccount')} <Link to="/register">{t('login.form.register')}</Link></p>
                {/* <h1>Logged in {auth.email}</h1> */}
            </Form>
        </div>
    )
}

export default Login