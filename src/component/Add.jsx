import React, { useState } from 'react';

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
    }, 5000);
  };

  // Function to clear the success message after 2 seconds
  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  // Function to handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!note.title || !note.content) {
      setErrorMessage('Failed to add, input cannot be empty');
      clearErrorMessage();
      return;
    }

    // Get the existing notes from local storage
    const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

    // Generate a unique id for the new note
    const newId = new Date().getTime();

    // Add the new note with the generated id to the existing notes
    existingNotes.push({ ...note, id: newId });

    // Store the updated notes in local storage
    localStorage.setItem('notes', JSON.stringify(existingNotes));

    setSuccessMessage('Added');
    clearSuccessMessage();

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
            className="form-control text-bg-dark"
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
