import React, { Component } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import ImageDisplay from './ImageDisplay'
import './App.css';

const BaseLayout = () => (
  <div className="position-absolute w-100">
    <div className="header">
      <a className="d-flex navbar-brand text-white justify-content-center w-100" href="#">BACKpy.Перевод</a>
    </div>

    <div className="content">
      <Routes>
        <Route path="/" exact element={<ImageDisplay/>} />
      </Routes>
    </div>

  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}

export default App;