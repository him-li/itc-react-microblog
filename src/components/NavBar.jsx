import React, { useState, useEffect, useRef } from 'react';
import { Container, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [tweetsCount, setTweetsCount] = useState(0);
    const [loggedIn, isLoggedIn] = useState(true);
    const API_Endpoint = 'https://64bf87370d8e251fd110f72a.mockapi.io/tweets';

    useEffect(() => {
        fetch(API_Endpoint, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Network response was not ok');
            })
            .then((tweets) => {
                setTweetsCount(tweets.length);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('userId');
        isLoggedIn(false);
    };

    return (
        <Container>
            <Nav className='sticky-top justify-content-between bg-card p-1 mb-5 w-100 rounded' activeKey='/home'>
                <Nav.Item className='d-flex justify-content-between'>
                    {loggedIn && (
                        <>
                            <OverlayTrigger
                                key='bottom'
                                placement='bottom'
                                overlay={<Tooltip id={`tooltip-$'bottom'`}>{tweetsCount} tweets published</Tooltip>}>
                                <Nav.Link href='/home' className='link-light link-opacity-100-hover link-opacity-50'>
                                    Home
                                </Nav.Link>
                            </OverlayTrigger>
                            <Nav.Link href='/profile' className='link-light link-opacity-100-hover link-opacity-50'>
                                Profile
                            </Nav.Link>
                        </>
                    )}
                </Nav.Item>
                <Nav.Item className='d-flex justify-content-between'>
                    <Nav.Link href='/signup' className='link-light link-opacity-100-hover link-opacity-50'>
                        Sign Up
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to={loggedIn ? './' : '/login'}
                        className='link-light link-opacity-100-hover link-opacity-50'
                        onClick={handleLogOut}>
                        Log {loggedIn ? 'Out' : 'In'}
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
    );
}