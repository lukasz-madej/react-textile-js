// @flow

import React, { Component } from 'react';
import './textile-editor-prompt.css';

import type { Input, InputObject, Prompt } from '../../flow-typed/textile-editor';

type Props = {
  show: boolean,
  prompt?: Prompt,
  onSubmit: (any) => void,
  onCancel: () => void
}

type State = {
  inputObjects: InputObject[]
}

class TextileEditorPrompt extends Component<Props, State> {
  state: State = {
    inputObjects: []
  };

  updateInputValue = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    if (this.props.prompt) {
      let currentInput = this.props.prompt.inputs.find((input) => {
        return input.name === event.target.id;
      }),
          newInputObject = this.generateInputObject(currentInput, event.target.value),
          inputObjects = this.mergeInputObject(newInputObject);

      this.setState({
        inputObjects
      });
    }
  };

  mergeInputObject = (newInputObject: InputObject): InputObject[] => {
    let inputObjects = [...this.state.inputObjects];

    for (let i = 0; i < inputObjects.length; i++) {
      if (inputObjects[i].name === newInputObject.name) {
        Object.assign(inputObjects[i], newInputObject);
        return inputObjects;
      }
    }
    return [...inputObjects, newInputObject];
  };

  generateInputObject = (input: Input, value: string): InputObject => {
    return {
      value,
      name: input.name,
      action: input.action
    };
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.inputObjects);
  };

  render() {
    if (!this.props.show || !this.props.prompt) {
      return null;
    }

    return (
      <div className="rtjs-prompt">
        {
          this.props.prompt.inputs.map((input: Input, index: number): any => {
            return (
              <div className="rtjs-prompt-input" key={index}>
                <label htmlFor={input.name}>{input.label}</label>
                <input id={input.name} name={input.name} onChange={this.updateInputValue} />
              </div>
            )
          })
        }
        <div className="rtjs-prompt-actions">
          <button onClick={this.onSubmit}>OK</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default TextileEditorPrompt