import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ContactForm = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    //state that will handle result from API
    const [result, setResult] = useState(null);
    
    //event function nomenclature to signal eventHandler mechanics
    const sendEmail = event => {
        event.preventDefault(); //prevents function from launching
        axios
            //sending form data as JSON object by spreading the state object using ...state (gets attached to req.body in post request)
            .post('/send', {...state})
            .then(response => {
                //if request successfull, setting response in result state as well as clearing old state with all data
                setResult(response.data);
                setState({ 
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            })
            //if not successful, catching error in result state
            .catch(() => {
                setResult({ 
                    success: false,
                    message: 'Something went wrong. Try again later'
                });
            });
    };

    const onInputChange = event => {
        const { name, value } = event.target; //syntax same as 'const name = event.target.name', ditto for value

        setState({
            ...state,
            [name]: value //brackets in an object key allows you to set it dynamically as the contents inside the brackets get treated as variables. this allows to set each individual state (name, email, subject, message) according to the value that the component's event.target.name has
        });
    };
    
    
    return (
        <div>
            {/*checks whether result state has been created (which means email was attempted), and either returns success or error for that state and corresponding message.*/}
            {result && (
                <p className={`${result.success ? 'success' : 'error'}`}>
                    {result.message}
                </p>
            )}
            <form onSubmit={sendEmail}>
                <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>                    
                    <Form.Control type='text' name='name' value={state.name} placeholder='Enter your full name' onChange={onInputChange}/>                    
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>                    
                    <Form.Control type='text' name='email' value={state.email} placeholder='Enter your email' onChange={onInputChange}/>                    
                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label>Subject</Form.Label>                    
                    <Form.Control type='text' name='subject' value={state.subject} placeholder='Enter subject' onChange={onInputChange}/>                    
                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label>Message</Form.Label>                    
                    <Form.Control as='textarea' name='message' value={state.message} placeholder="Enter your message" rows='3' onChange={onInputChange}/>                    
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </form>            
        </div>
    )
};

export default ContactForm;