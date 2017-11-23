// @flow

import React, { Component } from 'react';
import './app.css';

import TextileEditor from './components/textile-editor/textile-editor';

class App extends Component<void> {
  render() {
    return (
      <div className="App">
        <TextileEditor></TextileEditor>
      </div>
    );
  }
}

export default App;
