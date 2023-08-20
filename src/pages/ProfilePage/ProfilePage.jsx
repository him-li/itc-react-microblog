import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

export default function ProfilePage() {
    const [username, setUsername] = useState('');

    const handleClick = () => {
        localStorage.setItem('username', username);
        toast('Username saved successfully!');
    }

    return (
        <Container className='position-relative'>
            <Form.Label className='text-light fs-1'>Profile</Form.Label>
            <FloatingLabel
                controlId='floatingInput'
                label='User Name'
                className='bg-transparent text-light my-3'>
                <Form.Control
                    type='text'
                    placeholder=''
                    className='bg-transparent border border-light-subtile text-light'
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }} />
            </FloatingLabel>
            <Button
                variant='primary'
                className='position-absolute end-0 m-3'
                onClick={handleClick}>Save</Button>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark" />
        </Container>
    );
}