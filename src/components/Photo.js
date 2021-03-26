import React, { Component } from 'react';
import NotFound from './NotFound';
import Image from './Img';
import { withRouter } from 'react-router-dom';

class Photo extends Component {
    
    componentDidMount() {
        let path = this.props.history.location.pathname;    
    }
    
    
    render(){

        let photos = [];
        
        if(this.props.data.length > 0) {
            
            photos = this.props.data.map(data => 
                <Image url={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`} key={data.id}/>
            )
            
        } else {
           
            photos = <NotFound />
            
        }

        
        

        
        
        return (
            <div className="photo-container">
            <h2>{this.props.title}</h2>
            <ul>
           
                {photos}
               
                
            </ul>
          </div>
        )
    }
    
  
}

export default Photo;