// @flow

import React, { Component } from 'react';
import './textile-editor.css';

import textile from 'textile-js';
import TextileEditorActions from '../textile-editor-actions/textile-editor-actions';
import TextileEditorTextArea from '../textile-editor-textarea/textile-editor-textarea';
import type { Action, InputObject, Prompt } from '../../flow-typed/textile-editor';
import TextileEditorPrompt from '../textile-editor-prompt/textile-editor-prompt';

type Props = {}

type State = {
  rawText?: string,
  parsedText?: string,
  action?: Action,
  prompt?: Prompt,
  actionObjects?: InputObject[],
  showPrompt: boolean
}

class TextileEditor extends Component<Props, State> {

  state: State = {
    rawText: '',
    parsedText: '',
    showPrompt: false
  };

  parseRawText = (rawText: string): string => {
    return textile(rawText);
  };

  handleRawChange = (text: string): void => {
    this.setState({
      rawText: text,
      parsedText: this.parseRawText(text)
    }, (): void => {
      console.log(this.state.parsedText);
    });
  };

  getButtonAction = (action: Action): void => {
    this.setState({
      action: action
    })
  };

  requestPrompt = (prompt: Prompt): void => {
    this.setState({
      prompt: prompt,
      showPrompt: true
    })
  };

  closePrompt = (): void => {
    this.setState({
      showPrompt: false
    });
  };

  onPromptSubmitted = (actionObjects: InputObject[]): void => {
    this.setState({
      actionObjects
    }, (): void => {
      this.closePrompt();
    });
  };

  onPromptCanceled = (): void => {
    this.closePrompt();
  };

  render() {
    return (
      <div className="rtjs">
        <TextileEditorActions onActionCalled={this.getButtonAction} onPromptRequested={this.requestPrompt}/>
        <TextileEditorTextArea action={this.state.action} actionObjects={this.state.actionObjects} onTextChange={this.handleRawChange}/>
        <TextileEditorPrompt prompt={this.state.prompt} show={this.state.showPrompt} onSubmit={this.onPromptSubmitted} onCancel={this.onPromptCanceled}/>
      </div>
    );
  }
}

export default TextileEditor;