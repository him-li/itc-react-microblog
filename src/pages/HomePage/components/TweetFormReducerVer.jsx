import { Form, Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useReducer } from 'react';

const initialState = {
    buttonState: false,
    buttonVariant: 'primary',
    buttonLoading: false,
    alertShow: false,
    text: '',
}

function reducer(state, action) {
    switch (action.type) {
        /*         case 'ADD_TWEET':
                    const newTweet = {
                        user: action.payload.user,
                        text: action.payload.text,
                        date: action.payload.date,
                    };
                    return {
                        ...state,
                        tweets: [newTweet, ...state.tweets], // Assuming you have a 'tweets' property in your state
                    }; */
        case 'INPUT':
            const inputText = action.payload;
            const newButtonState = inputText.length > 140;
            const newButtonVariant = newButtonState ? 'danger' : 'primary';
            const newAlertShow = newButtonState;
            return {
                ...state,
                buttonState: newButtonState,
                buttonVariant: newButtonVariant,
                alertShow: newAlertShow,
                text: inputText,
            };
        case 'SUBMIT_LOADING':
            return {
                ...state,
                buttonLoading: true,
            };
        case 'SUBMIT_SUCCESS':
            return {
                ...initialState,
            };
        case 'SUBMIT_FAILURE':
            return {
                ...state,
                buttonLoading: false,
            };
        default:
            return state;
    }
}

export default function CreateTweet({ addTweet }) { //replace addTweet with dispatch to move addTweet here
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInput = (e) => {
        const inputText = e.target.value;
        dispatch({ type: 'INPUT', payload: inputText });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (state.text.trim() !== '' && !state.buttonLoading) {
            dispatch({ type: 'SUBMIT_LOADING' });
            try {
                await addTweet('Xin', state.text.trim());
                dispatch({ type: 'SUBMIT_SUCCESS' });
            } catch (error) {
                console.error('Error posting data:', error);
                dispatch({ type: 'SUBMIT_FAILURE' });
            }
        }
    }
    /*     const handleClick = async (e) => {
            e.preventDefault();
            if (state.text.trim() !== '' && !state.buttonLoading) {
                dispatch({ type: 'SUBMIT_LOADING' });
                try {
                    const response = await fetch(APIEndpoint, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({
                            user: 'Xin',
                            text: state.text.trim(),
                            date: new Date().toISOString(),
                        }),
                    });
                    if (response.ok) {
                        const task = await response.json();
                        dispatch({ type: 'SUBMIT_SUCCESS' });
                        dispatch({
                            type: 'ADD_TWEET',
                            payload: {
                                user: task.user,
                                text: task.text,
                                date: task.date,
                            },
                        });
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } catch (error) {
                    console.error('Error posting data:', error);
                    dispatch({ type: 'SUBMIT_FAILURE' });
                }
            }
        } */

    return (
        <Form onSubmit={handleClick}>
            <Form.Group
                className='mb-3 position-relative'
                controlId='exampleForm.ControlTextarea1'>
                <Form.Control
                    as='textarea'
                    rows={7}
                    placeholder='What you have in mind...'
                    className='bg-transparent border border-light-subtile text-light'
                    onChange={handleInput}
                    value={state.text} />
                <Alert
                    variant='danger'
                    show={state.alertShow}
                    className='p-1 m-3 position-absolute bottom-0 start-0'>
                    The tweet can't contain more then 140 chars.
                </Alert>
                <Button
                    variant={state.buttonVariant}
                    type='submit'
                    className='m-3 position-absolute bottom-0 end-0'
                    disabled={state.buttonState || state.buttonLoading}
                    onClick={handleClick} >
                    {state.buttonLoading ? 'Tweeting' : 'Tweet'}
                </Button>
            </Form.Group>
        </Form>
    )
}