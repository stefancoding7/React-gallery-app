import React, { Component } from 'react';
import axios from 'axios';
import './style/css/index.css';
import apiKey from './config';
import Form from './components/Form';
import Photo from './components/Photo';
import Nav from './components/Nav';
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';


class App extends Component {

    state = {
      data: [],
      url: '/',
      loading: true
    }

    componentDidMount() {
      this.searchApi()
    }
  
    searchApi = (query) => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
            this.setState({ 
              data: response.data.photos.photo,
              url: `/${query}`,
              loading: false
            })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });

       
    }
    
    
    
    render() {
        return (
          <BrowserRouter>
              <div className="container">
                <Form search={this.searchApi}/>
                <Nav  search={this.props.search}/>
                <Route exact path="/" render={ () => <Photo data={this.state.data}/> } />
                
                <Route path="/:urlquery" render={() => <Photo data={this.state.data} />  } />
                
              </div>
          </BrowserRouter>
        
            
        )
    }
}

export default App;
