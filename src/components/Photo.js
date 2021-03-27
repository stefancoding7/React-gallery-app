import React, { Component } from 'react';
import NotFound from './NotFound';
import Image from './Img';
import { withRouter } from 'react-router-dom';

class Photo extends Component {
    
    // set path to current pathname
    // get searched query than pass to query variable
    // if path includes search than reaplace with empty string
    // if path and query not equal than call searchApi function with path
    componentDidUpdate() {
        let path = this.props.history.location.pathname;
        let query = this.props.title;
        if(path.includes("/search/")) {
            path = path.replace('/search/', '')
            if(path !== query) {
                this.props.search(path)
            }
        }
       
    }
    
    render(){
        // array for all photos
        let photos = [];
        
        // if  passed data length is more than 0 than map for each photos and call <Image /> component with searched images
        if(this.props.data.length > 0) {
            
            photos = this.props.data.map(data => 
                <Image url={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`} key={data.id}/>
            )
            
        } else {
            // if props data is 0 call <Notfound /> component
            photos = <NotFound />
            
        }

        
        return (
            <div className="photo-container">
            <h2>{this.props.title}</h2>
            <ul>
                {/** Show rendered photos */}
                {photos}
               
                
            </ul>
          </div>
        )
    }
    
  
}

export default withRouter(Photo);