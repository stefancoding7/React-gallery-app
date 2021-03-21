import React, { Component } from 'react';
import axios from 'axios';
import './style/css/index.css';
import apiKey from './config';
import Form from './components/Form';
import Photo from './components/Photo';

class App extends Component {

    state = {
      data: [],
      loading: true
    }

    searchApi(query) {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
            this.setState({ 
              data: response.data.photos.photo,
              loading: false
            })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });

       
    }
    
    
    render() {
        return (
         <div>
              <Form />
              <Photo />
         </div>
            
        )
    }
}

export default App;
