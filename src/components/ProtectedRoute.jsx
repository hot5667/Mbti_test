import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ user, children, loading = false, redirectPath  = '/login' }) => {
  if (loading) {
      return <div>Loading...</div>
  }
  
  if (!user) {
    return <Navigate to={redirectPath}/>;
  }

  return <>children</>;
};

ProtectedRoute.prototype = {
  user: PropTypes.any,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  redirectPath: PropTypes.string,
}

export default ProtectedRoute;