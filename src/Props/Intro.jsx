import React from 'react';

const Intro = ( {Title, Subtitle, className=""}) => {
  return (
    <div
    className={className}
    >
          <p>{Title} <br />{Subtitle}</p>
    </div>
  );
}

export default Intro;
