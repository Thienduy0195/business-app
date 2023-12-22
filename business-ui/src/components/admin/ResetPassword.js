import React, { useState } from 'react'
import { NavLink, Navigate, Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Grid, Icon, Segment, Menu, Message, Divider, Checkbox } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { parseJwt, getSocialLoginUrl, handleLogError } from '../misc/Helpers'
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

function ResetPassword() {


    const Auth = useAuth()
    // const isLoggedIn = Auth.userIsAuthenticated()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: ValidationSchema,
        onSubmit: async (values) => {

            console.log(values);

            if (!values.username || !values.password) {
                setMessage('Username & password is required!')
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

                Auth.userLogin(authenticatedUser)

                setIsError(false)
            } catch (error) {
                handleLogError(error)
                setMessage('The username or password provided are incorrect!')
                setIsError(true)
            }
        },
    });

    // if (isLoggedIn) {
    //   return <Navigate to='/' />
    // }

    return (
        <div>

            <div className="mt-5 mb-3 text-center ">
                <h2>Reset your password ~</h2>
                {/* <img src={resetPassImg} width="150" style={{ position: 'relative' }} alt="login" /> */}
            </div>

            <Grid textAlign='center'>

                <Grid.Column style={{ maxWidth: 400 }}>
                    <Form size='large' onSubmit={formik.handleSubmit}>
                        <Segment>
                            <div className='reset-password'>
                                <h4>Enter new password</h4>
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
                                }}
                                actionPosition='left'
                                placeholder='New password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />

                            <div className='reset-password'>
                                <h4>Confirm new password</h4>
                            </div>
                            <Form.Input
                                name='confirmPassword'
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
                                }}
                                actionPosition='left'
                                placeholder='Confirm password'
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />

                            <Button color='purple' fluid size='large' type='submit'>Confirm</Button>
                        </Segment>
                    </Form>

                    {isError && <Message negative>{message}</Message>}
                    <Divider horizontal>have a nice day !</Divider>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ResetPassword;
