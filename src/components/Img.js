import React from 'react';

const Image = props => {

    return (
        <li>
            {/** images with props.url from Photo.js */}
            <img src={props.url} alt="stefancoding" />
      </li>
    )
}

export default Image;