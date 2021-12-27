import React from 'react'
import '../styles/Footer.css';
import { FaReact, FaLinkedin, FaGithubSquare } from "react-icons/fa";

const Footer = () => {
   return (
      <footer>
         <div className="footer-content">
            <div style={{display: 'flex'}}>
               <div className="icon">
                  <FaReact size={21.5}/>
               </div>
               <div className="icon-text">
                  <h2>Portfolio Project</h2>
                  <p>Created by Dan Milisits</p>
               </div>
            </div>
            <div id="links">
               <a href="https://www.linkedin.com/in/daniel-milisits/" target="_blank" rel="noreferrer">
                  <div className="link">
                     <FaLinkedin size={19}/>
                     <p>Dan's LinkedIn</p>
                  </div>
               </a>
               <a href="https://github.com/d-milisits" target="_blank" rel="noreferrer">
                  <div className="link">
                     <FaGithubSquare size={19}/>
                     <p>Dan's Github</p>
                  </div>
               </a>
            </div>
         </div>
      </footer>
   )
}

export default Footer
