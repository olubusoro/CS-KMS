import React from 'react';
import "./Dashboardcard.css"

const Dashboardcard = ({title, description}) => {
  return (
    <a className="custom-card" href=''>
      <h1 className="custom-card-title">{title}</h1>
      <p className="custom-card-description">{description}</p>
    </a>
  );
}

export default Dashboardcard;