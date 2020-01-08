import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Register from './components/Register/register.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';  
import Navigation from './components/Navigation/Navigation';  
import { SignIn } from './components/signIn/signIn';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ErrorCatcher from './components/errorCatcher/ErrorCatcher';   
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import './App.css';


const particleOptions = {
particles:{
 number:{
  value: 300,
  density: {
    enable: true,
      value_area: 800   
   }
  }
 }
}


const initialState = {
  input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
class App extends Component {
constructor() {
  super();
  this.state = initialState;
}

 loadUser = (data) => {
  this.setState({user: {
         id: data.id,
         name: data.name,
         email: data.email,
        entries: data.entries,
        joined: data.joined
     }
  })
}

calculateFaceLocation = (data) => {
const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputImage');
const width = Number(image.width);
const height = Number(image.height);
 return {
  leftCol: clarifaiFace.left_col * width,
  topRow:  clarifaiFace.top_row * height,
  rightCol:width - (clarifaiFace.right_col * width),
bottomRow: height - (clarifaiFace.bottom_row * height)
 }
}

displayFaceCatch = (box) => {
  console.log(box);
  this.setState({box: box});
}

onInputChange = (event) => {
this.setState({input: event.target.value});
}

onButtonSubmit = () => {
this.setState({imageUrl: this.state.input});
  fetch('http://localhost:3001/imageurl', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
  .then(response => response.json())
  .then(response => {
    if (response) 
      fetch('http://localhost:3001/image', {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
  .then(response => response.json())
  .then(count => {
    this.setState(
       Object.assign(this.state.user, { entries: count}))
    })
  .catch(console.log)
  this.displayFaceCatch(this.calculateFaceLocation(response))
  }
)
}
   onRouteChange = (route) => {
  if (route === 'signout') {
  this.setState(initialState)
} else if (route === 'home') {
this.setState({isSignedIn: true})
}
  this.setState({route: route});
 }

  render() {
 const { isSignedIn, imageUrl, route, box,} = this.state;
  return (
    <div className="App"> 
  <Particles className= 'particles'
     params={{particleOptions}}
  />
    <Navigation 
    isSignedIn={isSignedIn} 
    onRouteChange={this.onRouteChange}/>
  <ErrorCatcher>
  {
    this.state.route === 'home'
    ?<div>
    <Logo />
    <Rank name={this.state.user.name} entries={this.state.user.entries} />    
    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
  <FaceRecognition box={box} imageUrl={imageUrl}/>    
 </div>
 : (
   route === 'signin'
  ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} onError={this.Error}/>       
  :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>      
  ) 
}
</ErrorCatcher> 
</div>
  );
 }
}

export default App;
