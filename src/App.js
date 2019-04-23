
// imports  ==================================

import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import './App.css';


// data  ==================================

const initialState = {
  input: "",
  box: [],
  route: "signin", // tracks where we are on the page
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  }
}

// actions  ==================================

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    });
  }

  caculateFaceLocation = (data) => {
    const boundingBox = data.outputs[0].data.regions.map(match => match.region_info.bounding_box);
    return boundingBox.map((box) => {
      return {
        top: `${box.top_row * 100}%`,
        right: `${100 - (box.right_col * 100)}%`,
        bottom: `${100 - (box.bottom_row * 100)}%`,
        left: `${box.left_col * 100}%`,
      }
    });
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }


  // eventlisteners  ==================================

  onInputChange = (event) => {
    this.setState({ input: event.target.value, box: [], });
  }

  onPictureSubmit = () => {
    fetch(process.env.SERVER_URL + "/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: this.state.input })
    })
      .then(response => response.json())
      .then(response => {
        if (response.outputs[0].data.regions.length) {
          fetch(process.env.SERVER_URL + "/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(res => res.json())
            .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
            .catch(err => console.log(err));
        }
        this.displayFaceBox(this.caculateFaceLocation(response))
      })
      .catch(err => console.error(err));
  }

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({
        isSignedIn: true,
        input: "",
        box: [],
      })
    }
    this.setState({ route: route });
  }


  // render  ==================================

  render() {
    const { isSignedIn, route, input, box, user } = this.state;
    return (
      <div className="App">
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn} />

        {route === "home"
          ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit} />
            <FaceRecognition
              imgUrl={input}
              box={box} />
          </div>

          : this.state.route === "signin"
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />

            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    )
  }
}

export default App;
