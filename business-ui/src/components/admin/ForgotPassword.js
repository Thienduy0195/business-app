import React, { useState } from 'react'
import { NavLink, Navigate, Link, useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Icon, Segment, Menu, Message, Divider, Checkbox } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { parseJwt, getSocialLoginUrl, handleLogError } from '../misc/Helpers'
import forgotPassImg from '../../assets/images/forgot-pass.png'
import './forgot-password.css'
import { businessApi } from '../misc/BusinessApi'



function ForgotPassword() {
    const Auth = useAuth()
    const isLoggedIn = Auth.userIsAuthenticated()

    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [isError, setIsError] = useState(false)
    const [isDisable, setIsDisable] = useState(true);
    let navigate = useNavigate();

    const handleInputChange = (e, { value }) => {

        setEmail(value)

        if (value === '') {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!(email)) {
            setIsError(true)
            return
        }

        try {
            const response = await businessApi.forgotPassword(email)
            if (response.data.startsWith('The email')) {
                setMessage(response.data);
                setIsError(true);
                return
            } else {
                setIsError(false);
            }


            console.log("RESPONE RS", response);


            // Somewhere in your code, e.g. inside a handler:
            // navigate(response.data);
            navigate(response.data);
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
                <img src={forgotPassImg} width="220" style={{ position: 'relative' }} alt="login" />
            </div>

            <Grid textAlign='center'>

                <Grid.Column style={{ maxWidth: 400 }}>
                    <div className='info-field'>
                        <h5>Please enter your email to update the new password..</h5>
                    </div>
                    <Form size='large' onSubmit={handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                autoFocus
                                name='email'
                                icon='user'
                                iconPosition='left'
                                placeholder='Enter your email'
                                type='email'
                                onChange={handleInputChange}
                            />

                            <Button color='purple' fluid size='large' disabled={isDisable}>Reset my password</Button>
                        </Segment>
                    </Form>

                    {isError && <Message negative>{message}</Message>}

                    <Divider horizontal>have a nice day !</Divider>

                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ForgotPassword;
