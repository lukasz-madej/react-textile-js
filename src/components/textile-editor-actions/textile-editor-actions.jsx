// @flow

import React, { Component } from 'react';
import './textile-editor-actions.css';

import TextileEditorActionButton from '../textile-editor-action-button/textile-editor-action-button';
import type { Action, ActionButton, Prompt } from '../../flow-typed/textile-editor';
import { ActionsConfig } from './textile-editor-actions-config';
import * as _ from 'lodash';

const actionButtons: ActionButton[] = ActionsConfig;

type Props = {
  onActionCalled: (Action) => void,
  onPromptRequested: (Prompt) => void
};

type State = {
  prompt: Prompt,
  action: Action
}

class TextileEditorActions extends Component<Props, State> {
  handleButtonClick = (button: ActionButton): void => {
    this.setState({
      action: { ...button.action },
      prompt: { ...button.prompt }
    }, () => {
      if (button.action) {
        this.props.onActionCalled(this.state.action);
      }
      if (button.prompt) {
        this.props.onPromptRequested(this.state.prompt);
      }
    })
  };

  render() {
    let actionGroups: any = _.groupBy(actionButtons, (button: ActionButton): any => button.group);
    return (
      <div className="rtjs-actions">
        {
          Object.keys(actionGroups).map((group: string, index: number): any => {
            return <div className="button-group" key={index}>
              {
                actionGroups[group].map((button: ActionButton, index: number): any => {
                  return <TextileEditorActionButton key={index} onButtonClicked={this.handleButtonClick} button={button}/>
                })
              }
            </div>
          })
        }
      </div>
    );
  };
}

export default TextileEditorActions;