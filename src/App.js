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

    /**
   * State objects
   *
   * @property {object} data - api data object from searched items
   * @property {string} title - searched value
   * @property {boolean} loading - loading indicator (if true loading starting)
   * @property {object} cats - api data object for cats items
   * @property {object} dogs - api data object for dogs items
   * @property {object} computers - api data object for computer items
   *
   */
    state = {
      data: [],
      title: '',
      loading: true,
      cats: [],
      dogs: [],
      computers: [],
    }


    //get data from api
    // this.searchApi - call function to get data for page load 
    // than get cats, dogs and computers objects for links
    componentDidMount() {
      this.searchApi()
      
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
          this.setState({ 
            cats: response.data.photos.photo,
          })
         
      })
      .catch(error => {
        console.log('Error fetching: ', error);
      });

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
          this.setState({ 
            dogs: response.data.photos.photo,
          })
         
      })
      .catch(error => {
        console.log('Error fetching: ', error);
      });

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
          this.setState({ 
            computers: response.data.photos.photo,
          })
         
      })
      .catch(error => {
        console.log('Error fetching: ', error);
      });
    }
    

    //function to set loading back to true
    resetLoading = () => {
      this.setState({
        loading: true
      })
    }


    /** search by query
    * @param {string} query - Searched value ( default is cats) 
    * 
    * set data propterty response photos
    * set title to searched query
    * set loading to false when images rendered
    */ 
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
          console.log('Error fetching: ', error);
        });

       
    }
    
    
    
    render() {
        return (
          <BrowserRouter>
              <div className="container-fluid">
              {
                /**
                * Call <Form /> class and pass the searchApi function to make avaliable search for  From class
                * Call <Nav /> to show links
                * <Switch/> for 404 error handler
                * 
                */
              }
              <Form search={this.searchApi} resetLoading={this.resetLoading}/>
              <Nav />
              <Switch>
              { /* if loading is true than show <Loading /> component than render <Photo /> component */ }
                {
                  (this.state.loading) ? <Loading /> : <Route exact path="/" render={ () => <Photo data={this.state.data} /> } />
                }
                { /* This routes for cats, dogs and computers, pass state objects to <Photo /> component */ }
                <Route exact path="/cats" render={() => <Photo data={this.state.cats} title={'Cats'} /> } />
                <Route exact path="/dogs" render={() => <Photo data={this.state.dogs} title={'Dogs'} /> } />
                <Route exact path="/computers" render={() => <Photo data={this.state.computers} title={'Computers'}/> } />

                { /* if loading is true than show <Loading /> component than render <Photo /> component.  */ }
                {
                  (this.state.loading) ? <Loading /> : <Route path="/search/:urlquery" render={() => <Photo data={this.state.data} title={this.state.title} search={this.searchApi} />  } />
                }

                {/** if rout is not found then render Error404 component */}
                <Route component={Error404} />
               
              </Switch>

              </div>
          </BrowserRouter>
  
        )
    }
}

export default App;
