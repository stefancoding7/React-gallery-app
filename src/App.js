import React, { Component } from 'react';
import axios from 'axios';
import './style/css/index.css';
import apiKey from './config';
import Form from './components/Form';
import Photo from './components/Photo';
import Nav from './components/Nav';
import Error404 from './components/Error404';
import Loading from './components/Loading';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';


class App extends Component {

    state = {
      data: [],
      title: '',
      loading: true,
      cats: [],
      dogs: [],
      computers: [],
    }

    componentDidMount() {
      this.searchApi()
      
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
          this.setState({ 
            cats: response.data.photos.photo,
          })
         
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
          this.setState({ 
            dogs: response.data.photos.photo,
          })
         
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
          this.setState({ 
            computers: response.data.photos.photo,
          })
         
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }
    
    resetLoading = () => {
      this.setState({
        loading: true
      })
    }

    searchApi = (query = 'cats') => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
            this.setState({ 
              data: response.data.photos.photo,
              title: query,
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
              <div className="container-fluid">
              <Form search={this.searchApi} resetLoading={this.resetLoading}/>
              <Nav  search={this.props.search}/>
              <Switch>
                {
                  (this.state.loading) ? <Loading /> : <Route exact path="/" render={ () => <Photo data={this.state.data} /> } />
                }
               
                {
                  (this.state.loading) ? <Loading /> : <Route path="/search/:urlquery" render={() => <Photo data={this.state.data} title={this.state.title} search={this.searchApi} />  } />
                }
                
                
                <Route exact path="/cats" render={() => <Photo data={this.state.cats} title={'Cats'} /> } />
                <Route exact path="/dogs" render={() => <Photo data={this.state.dogs} title={'Dogs'} /> } />
                <Route exact path="/computers" render={() => <Photo data={this.state.computers} title={'Computers'}/> } />
                <Route component={Error404} />
               
              </Switch>
               
               
              
                
              </div>
          </BrowserRouter>
        
            
        )
    }
}

export default App;
