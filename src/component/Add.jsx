/* eslint-disable no-alert */
import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Add() {
  // State to hold the note data
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  // State to hold the error message
  const [errorMessage, setErrorMessage] = useState('');

  // State to hold the success message
  const [successMessage, setSuccessMessage] = useState('');

  // Function to clear the error message after 2 seconds
  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  };

  // Function to clear the success message after 2 seconds
  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  // Function to handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!note.title || !note.content) {
      setErrorMessage('Failed to add, input cannot be empty');
      clearErrorMessage();
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), note);
      setSuccessMessage('Added');
      clearSuccessMessage();
      console.log('Add Notes Success');
    } catch (error) {
      console.error('Error adding note: ', error);
    }

    setNote({ title: '', content: '' });
    setErrorMessage('');
  };

  return (
    <>
      {errorMessage && <div className="alert alert-danger mx-auto animate__animated animate__fadeOut" role="alert" style={{ width: '18em' }}>{errorMessage}</div>}
      {successMessage && <div className="alert alert-success mx-auto animate__animated animate__fadeOut" role="alert" style={{ width: '18em' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit} className="card text-bg-dark mx-auto border-light" style={{ width: '18em' }}>
        <div className="card-body">
          <input
            className="form-control  text-bg-dark"
            type="text"
            placeholder="Title..."
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <textarea
            style={{ height: '200px' }}
            className="form-control mt-3 text-bg-dark"
            placeholder="Type something..."
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
          <button
            type="submit"
            className="btn btn-primary mt-3"
          >
            Add Note
          </button>
        </div>
      </form>
    </>
  );
}

export default Add;
