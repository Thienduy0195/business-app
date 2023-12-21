import React, { useState } from 'react'
import { NavLink, Navigate, Link } from 'react-router-dom'
import { Button, Form, Grid, Icon, Segment, Menu, Message, Divider, Checkbox } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { parseJwt, getSocialLoginUrl, handleLogError } from '../misc/Helpers'
import loginImg from '../../assets/images/login.png'
import './login.css'
import { businessApi } from '../misc/BusinessApi'

function Login() {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e, { name, value }) => {
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(username && password)) {
      setIsError(true)
      return
    }

    try {
      const response = await businessApi.authenticate(username, password)
      console.log("RESPONE RS", response);
      const { accessToken } = response.data
      const data = parseJwt(accessToken)
      const authenticatedUser = { data, accessToken }

      console.log("DATA TOKEN", authenticatedUser);

      Auth.userLogin(authenticatedUser)

      setUsername('')
      setPassword('')
      setIsError(false)
    } catch (error) {
      handleLogError(error)
      setIsError(true)
    }
  }

  // if (isLoggedIn) {
  //   return <Navigate to='/' />
  // }

  return (
    <div>

      <div className="loginImage text-center mt-3">
        <img src={loginImg} width="250" style={{ position: 'relative' }} alt="login" />
      </div>

      <Grid textAlign='center'>

        <Grid.Column style={{ maxWidth: 400 }}>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment>
              <Form.Input
                fluid
                autoFocus
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='Username'
                onChange={handleInputChange}
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={handleInputChange}
              />
              <Button color='purple' fluid size='large'>Login</Button>
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
          {isError && <Message negative>The username or password provided are incorrect!</Message>}

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
  )
}

export default Login
