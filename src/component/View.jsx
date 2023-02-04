/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const coll = collection(db, 'notes');
const q = query(coll, orderBy('title', 'asc'));

function View() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(
        // eslint-disable-next-line no-shadow
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    }); return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
  };

  const handleClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this note?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your note has been deleted.',
        );
        handleDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your note is safe',
        );
      }
    });
  };

  return (
    <div className="container text-center mt-5 bg-dark">
      <div className="row row-cols-1 row-cols-lg-5 g-2 g-lg-3 mb-5 bg-dark">
        {notes.map((note) => (
          <div className="col card border-light bg-dark text-light mx-auto" key={note.id} style={{ width: '18em' }}>
            <h5 className="mt-3 mx-auto">
              {note.title}
            </h5>
            <div className="card bg-dark mx-auto" style={{ width: '16em' }}>
              {note.content}
            </div>

            <button
              style={{ width: '100px' }}
              className="btn btn-danger mb-3 mx-auto mt-3"
              onClick={() => handleClick(note.id)}
            >
              Delete

            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default View;
