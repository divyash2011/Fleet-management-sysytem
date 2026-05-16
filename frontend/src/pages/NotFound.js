import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center mt-5">
    <h1>404</h1>
    <p>Page not found.</p>
    <Link className="btn btn-outline-primary" to="/">Go back home</Link>
  </div>
);

export default NotFound;
