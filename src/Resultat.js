import React from 'react';

const Resultat = (props) => {
    return (
        <div className="status">
          <h2>{props.winner}</h2>
          <h2>{props.littlePhrase}</h2>
        </div>
    )
} 

export default Resultat