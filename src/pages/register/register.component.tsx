import { Checkbox, Col, Form, Input, InputRef, Layout, Row } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GoogleCircleFilled, SlackCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './register.style.scss'
import { StyledButton } from '../../common/components';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from 'antd-password-input-strength';


function Register() {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const emailRef = useRef<InputRef>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [level, setLevel] = useState(0)
  const [verifyPassword, setVerifyPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (emailRef.current) { emailRef.current.focus() }
  }, [])

  useEffect(() => {
    setErrorMsg('')
  }, [email, password])

  //TODO: Add backend register API call
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>): Promise<any> {
    try {
      console.log(e);
      // login({ email, password })
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setVerifyPassword('')
      setSuccess(true)
      navigate('/login')
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
    <div className="register">
      <div className="form">
        <h1 className='introTitle'>{t('register.title')}</h1>
        <Form className='form' onFinish={handleSubmit} scrollToFirstError>
          <div className="inputs-container">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: <>{t('register.form.firstNameError')}</> }]}
            >
              <Input
                onChange={(e) => { setFirstName(e.target.value) }}
                value={firstName}
                id='firstName'
                type='text'
                placeholder={t('register.form.firstName') + ""} />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: <>{t('register.form.lastNameError')}</> }]}
            >
              <Input
                onChange={(e) => { setLastName(e.target.value) }}
                value={lastName}
                id='lastName'
                type='text'
                placeholder={t('register.form.lastName') + ""} />
            </Form.Item>
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
            >
              <Input
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
                id='email'
                type='email'
                placeholder={t('login.form.email') + ""} />
            </Form.Item>
            <Form.Item
              current-password='true'
              name="password"
              rules={[{ required: true, message: <>{t('login.form.passwordError')}</> },
              {
                validator: async () => {
                  return level >= 1 ? Promise.resolve() : Promise.reject(<>{t('register.form.weakPassword')}</>);
                },
                message: (<>{t('register.form.weakPassword')}</>)
              }]}
              hasFeedback
            >
              <PasswordInput
                onChange={(e) => { setPassword(e.target.value) }}
                onLevelChange={setLevel}
                value={password}
                id='password'
                type='password'
                placeholder={t('login.form.password') + ""} />
            </Form.Item>
            <Form.Item
              current-password='true'
              name="verifyPassword"
              dependencies={['password']}
              hasFeedback
              rules={[{ required: true, message: <>{t('register.form.verifyPasswordError')}</> }, ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('register.form.verifyPasswordValidationError') + ""));
                },
              }),]}
            >
              <Input.Password
                onChange={(e) => { setVerifyPassword(e.target.value) }}
                value={verifyPassword}
                id='verifyPassword'
                type='password'
                placeholder={t('register.form.verifyPassword') + ""} />
            </Form.Item>
          </div>
          <StyledButton submitButton>{t('login.form.submit')}</StyledButton>
          <p>{t('register.form.existing')} <Link to="/login" replace>{t('register.form.login')}</Link></p>
        </Form>
      </div>
    </div>

  )
}

export default Register