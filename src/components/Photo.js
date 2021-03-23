import React from 'react';
import NotFound from './NotFound';
import Image from './Img';


const Photo = (props) => {
    
    
    const datas = props.data;
    let photos;
    photos = datas.map(data => 
        <Image url={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`} key={data.id}/>
    )
    
    return (
        <div className="photo-container">
        <h2>Results</h2>
        <ul>

           {photos}
            <NotFound />
        </ul>
      </div>
    )
}

export default Photo;