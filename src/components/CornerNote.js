import React from 'react'
import logo from '../icons/react.png';
import '../styles/CornerNote.css';

const CornerNote = () => {
   return (
      <div className="corner-note">
         <img src={logo} alt="react" />
         <p>React.js App by: Dan Milisits</p>
      </div>
   )
}

export default CornerNote
