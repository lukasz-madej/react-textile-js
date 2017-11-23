// @flow

import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import type { ActionButton } from '../../flow-typed/textile-editor';

type Props = {
  button: ActionButton,
  onButtonClicked: (ActionButton) => void
}

class TextileEditorActionButton extends Component<Props> {
  onClick = () => {
    this.props.onButtonClicked(this.props.button);
  };

  render() {
    return (
      <button title={this.props.button.label} onClick={this.onClick}>
        <FontAwesome name={this.props.button.icon} />
        <span className="subtext">{this.props.button.subtext}</span>
      </button>
    );
  }
}

export default TextileEditorActionButton;