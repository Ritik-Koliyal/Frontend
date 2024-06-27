import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
// message component
const Message = ({ variant, children }) => {
  return (
    <div className={`alert alert-${variant}`} role="alert">
      {children}
    </div>
  );
};

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
