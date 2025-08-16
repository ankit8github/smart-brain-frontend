import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'; 
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

// Background particles configuration
const customConfig = {
  num: [15, 15],
  rps: 0.1,
  radius: [5, 15],
  life: [2, 4],
  v: [1, 2],
  tha: [-100, 100],
  alpha: [0.4, 0],
  scale: [1, 0],
  position: "center",
  color: ["#0ff", "#0af", "#06c"],
  cross: "dead",
  random: 15,
  g: 0,
};
const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin', // Default route
      isSignedIn: false, // Track if user is signed in
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  // Load user data after registration or sign-in
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      },
      isSignedIn: true,
      route: 'home'
    });
  }
  calculateFaceLocation = (data) => {
    console.log('API Response:', data);

    if (!data.outputs || !data.outputs[0] || !data.outputs[0].data || !data.outputs[0].data.regions) {
      console.error('Invalid API response structure');
      return {};
    }

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');

    if (!image) {
      console.error('Image element not found');
      return {};
    }

    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left: clarifaiFace.left_col * width,
      top: clarifaiFace.top_row * height,
      width: (clarifaiFace.right_col - clarifaiFace.left_col) * width,
      height: (clarifaiFace.bottom_row - clarifaiFace.top_row) * height
    };
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
onButtonSubmit = () => {
  const { input, user } = this.state;

  if (!input) {
    alert('Please enter an image URL');
    return;
  }

  this.setState({ imageUrl: input });

  // Call your backend's /imageurl endpoint
  fetch('http://localhost:3000/imageurl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: input
    })
  })
  .then(response => response.json())
  .then(result => {
    if (result && result.outputs && result.outputs[0]?.data?.regions) {
      // If face detection is successful, update the rank
      fetch('http://localhost:3000/image', { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id })
      })
      .then(response => response.json())
      .then(count => {
        // Update state with the new entry count
        this.setState(Object.assign(user, { entries: count }));
      })
      .catch(console.log);

      // Display the face box
      this.displayFaceBox(this.calculateFaceLocation(result));
    }
  })
  .catch(err => console.error('Error detecting face:', err));
};

  onRouteChange=(route) => {
    if(route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    // Update the route state
    this.setState({route: route });
  }
render() {
  const{isSignedIn, imageUrl, box, route} = this.state;
  return (
    <div className="App">
      <ParticlesBg type="cobweb" config={customConfig} bg={true} />
     <Navigation isSignedIn= {isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin' ?
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}/>
            ) 
          }
      </div>
    );
  }
}

export default App;

