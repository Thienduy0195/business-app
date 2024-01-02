import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Grid, Icon, Segment, Menu, Message, Divider, Checkbox } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { parseJwt, getSocialLoginUrl, handleLogError } from '../misc/Helpers'
import loginImg from '../../assets/images/login.png'
import './login.css'
import { businessApi } from '../misc/BusinessApi'


//TẠM THỜI KHÔNG DÙNG CÁI ValidationSchema NÀY
const ValidationSchema = Yup.object().shape({
  // username: Yup.string()
  // .min(3, 'At least 3 characters!')
  // .max(35, 'Max 35 characters!')
  // .required('Required!'),
  // password: Yup.string()
  // .required('Required!'),
});

function Login() {


  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {

      console.log(values);

      if (!values.username || !values.password) {
        setMessage('Username & password are required!')
        setIsError(true);
        return
      } else {
        setIsError(false)
      }

      // Xử lý khi form được submit
      try {
        const response = await businessApi.authenticate(values.username, values.password)
        console.log("response", response);
        const { accessToken } = response.data

        const data = parseJwt(accessToken)
        const authenticatedUser = { data, accessToken }

        console.log("parseJwt(accessToken)", data);

        Auth.userLogin(authenticatedUser)

        setIsError(false)
      } catch (error) {
        handleLogError(error)
        setMessage('The username or password are incorrect!')
        setIsError(true)
      }
    },
  });

  if (isLoggedIn) {
    return <Navigate to='/' />
  }




  return (
    <div>

      <div className="loginImage text-center">
        <img className='formImage' src={loginImg} width="220" style={{ position: 'relative' }} alt="login" />
      </div>
      <div className='center'>
        <div className='commonForm'>
          <Grid textAlign='center' >

            <Grid.Column style={{ maxWidth: 400 }}>
              <Form size='large' onSubmit={formik.handleSubmit}>
                <Segment>
                  <div className='error-field'>
                    {formik.touched.username && formik.errors.username ? (
                      <div>{formik.errors.username}</div>
                    ) : null}
                  </div>

                  <Form.Input
                    fluid
                    autoFocus
                    name='username'
                    action={{
                      icon: 'user',
                      // disabled: true,
                      tabIndex: -1,
                      // color: 'orange'
                      style: {
                        background: '#F2711C',
                        opacity: '50%',
                        color: 'white'
                      },

                    }}
                    actionPosition='left'
                    actionDisabled='true'
                    id="username"
                    type="text"
                    placeholder='Username'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />

                  <div className='error-field'>
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <Form.Input
                    name='password'
                    type={passwordVisible ? 'text' : 'password'}
                    icon={
                      <Icon
                        name={passwordVisible ? 'eye' : 'eye slash'}
                        link
                        onClick={togglePasswordVisibility}
                      />
                    }
                    fluid
                    iconPosition='right'
                    action={{
                      icon: 'lock',
                      // disabled: true,
                      tabIndex: -1,
                      // color: 'orange'
                      style: {
                        background: '#F2711C',
                        opacity: '50%',
                        color: 'white'
                      },
                    }}
                    actionPosition='left'
                    placeholder='Password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />

                  <Button color='orange' fluid size='large' type='submit'>Login</Button>
                </Segment>
              </Form>

              <div className='mt-3 d-flex text-start'>
                <div className='col-6'>
                  <Form.Field>
                    <Checkbox
                      className="remember-me-checkbox"
                      label="Remember Me ~"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                  </Form.Field>
                </div>
                <div className='col-6'>
                  <Link to="/forgot-password">Forgot the password?</Link>
                </div>
              </div>

              {/* <Message>{`Don't have already an account? `}
    <NavLink to="/signup" color='purple'>Sign Up</NavLink>
  </Message> */}
              {isError && <Message negative>{message}</Message>}

              <Divider horizontal>have a nice day !</Divider>
              {/* <Menu compact icon='labeled'>
  <Menu.Item name='github' href={getSocialLoginUrl('github')}>
    <Icon name='github' />Github
  </Menu.Item>
  <Menu.Item name='google' href={getSocialLoginUrl('google')}>
    <Icon name='google' />Google
  </Menu.Item>
  <Menu.Item name='facebook'>
    <Icon name='facebook' disabled />Facebook
  </Menu.Item>
  <Menu.Item name='instagram'>
    <Icon name='instagram' disabled />Instagram
  </Menu.Item>
</Menu> */}
            </Grid.Column>
          </Grid>
        </div>
      </div>


    </div>
  )
}

export default Login;
