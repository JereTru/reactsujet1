import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <div className='navContainer'>
      <div className="logo">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + '/images/Logo.png'} alt="Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/task">
              Task
            </Link>
          </li>
          <li>
            <Link to="/priorities">
                Priority
            </Link>
          </li>
        </ul>
      </nav>
      <div className="user">
        <Link to="/">
          <img src='https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg' alt="user" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar