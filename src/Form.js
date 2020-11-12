import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import './Form.css'
import axios from 'axios';
import User from './User'


const initialFormData = {
    name: '',
    email: '',
    password: '',
    agree: false,
}
const initialErrorData = {
    name: '',
    email: '',
    password: '',
    agree: '',
}


const schema = yup.object().shape({
    name: yup.string().required('name is required').min(6, 'name needs to be at least 6 characters'),
    email: yup.string().required('email is required'),
    password: yup.string().required('password is required').min(8, 'password needs to be at least 8 characters'),
    agree: yup.boolean().oneOf([true], 'you must agree to the terms of service'),
})



export default function Form(props) {
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrorData)

    const [disabled, setDisabled] = useState(true)

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({
                ...errors,
                [name]: ''
            }))
            .catch((err) => setErrors({
                ...errors,
                [name]: err.errors[0]
            }))
    }

    const change = (evt) => {
        const { checked, value, name, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setFormData({
            ...formData,
            [name]: valueToUse
        })
    }

    const submit = (evt) => {
        evt.preventDefault();
        const newUser ={ name: formData.name.trim(), email: formData.email.trim(), password: formData.password, agree: formData.agree }
        axios.post('https://reqres.in/api/users', newUser)
            .then((res) => {
                setUsers([...users, res.data])
                setFormData(initialFormData)
            })
            .catch(() => {
                console.log('error')
            })
            console.log(users);
    }

    useEffect(() => {
        schema.isValid(formData).then(valid => setDisabled(!valid))
    }, [formData])



    return(
        <div className='form-container'>
            <div style={{ color: 'crimson' }}>
                <div id='error-name'>{errors.name}</div> <div id='error-email'>{errors.email}</div> <div id='error-pass'>{errors.password}</div> <div id='error-checkbox'>{errors.agree}</div>
            </div>
            <form id='form' onSubmit={submit}>
            <div className='form-items'>
                <label>Name
                    <input onChange={change} value={formData.name} name='name' type='text'/>
                </label>

                <label>Email
                    <input onChange={change} value={formData.email} name='email' type='text'/>
                </label>

                <label>Password
                    <input onChange={change} value={formData.password} name='password' type='text'/>
                </label>

                <label>Terms of Service
                    <input onChange={change} checked={formData.agree} name='agree' type='checkbox'/>
                </label>

                <button id='submitBtn' disabled={disabled}>Submit</button>
            </div>
            {users.map((user,idx) => {
                return(
                    <User details={user} key={idx} />
                )
            })}
            </form>

        </div>


    )




}