// @flow

import React, { Component } from 'react';
import './textile-editor-textarea.css';
import type { Action, InputObject } from '../../flow-typed/textile-editor';
import { ActionGroups } from '../../flow-typed/textile-editor';

type Props = {
  onTextChange: (string) => void,
  action?: Action,
  actionObjects?: InputObject[]
}

type State = {
  action?: Action,
  actionObjects?: InputObject[]
}

class TextileEditorTextArea extends Component<Props, State> {
  wrapText = (text: string, action: Action, selectionStart: number = 0, selectionEnd: number = text.length): string => {
    let space: string = action.spaced ? ' ' : '';
    return  text.slice(0, selectionStart) +
            action.symbol + space +
            text.slice(selectionStart, selectionEnd) +
            space + action.symbol +
            text.slice(selectionEnd);
  };

  unwrapText = (text: string, action: Action, selectionStart: number, selectionEnd: number): string => {
    let offset: number = this.calculateOffset(action);
    return  text.slice(0, selectionStart) +
            text.slice(selectionStart + offset, selectionEnd - offset) +
            text.slice(selectionEnd);
  };

  shouldUnwrapText = (text: string, action: Action, selectionStart: number, selectionEnd: number): boolean => {
    let offset: number = this.calculateOffset(action),
        seed: string = action.symbol + (action.spaced ? ' ' : ''),
        selectionStartSymbol: string = text.slice(selectionStart, selectionStart + offset),
        selectionEndSymbol: string = text.slice(selectionEnd - offset, selectionEnd);
    return selectionStartSymbol === seed && selectionEndSymbol === seed;
  };

  insertSymbol = (text: string, action: Action, selectionStart: number = 0): string => {
    let space: string = action.spaced ? ' ' : '';
    if (action.wrap) {
      return  text.slice(0, selectionStart) +
        action.symbol + space + space + action.symbol +
        text.slice(selectionStart);
    }
    return  text.slice(0, selectionStart) +
            action.symbol + space +
            text.slice(selectionStart);
  };

  removeSymbol = (text: string, action: Action, selectionStart: number): string => {
    let offset: number = this.calculateOffset(action);
    return  text.slice(0, selectionStart) +
            text.slice(selectionStart + offset);
  };

  shouldRemoveSymbol = (text: string, action: Action, selectionStart: number): boolean => {
    let offset: number = this.calculateOffset(action),
      seed: string = action.symbol + (action.spaced ? ' ' : ''),
      selectionStartSymbol: string = text.slice(selectionStart, selectionStart + offset);
    return selectionStartSymbol === seed;
  };

  insertText = (text: string, toInsert: string, selectionStart: number): string => {
    return  text.slice(0, selectionStart) +
      toInsert +
      text.slice(selectionStart);
  };

  calculateOffset = (action: Action): number => {
    return action.symbol.length + (action.spaced ? 1 : 0);
  };

  calculateCursorPosition = (action: Action, selectionStart: number, selectionEnd: number, subtract: boolean): number => {
    let offset = this.calculateOffset(action),
        length = action.wrap ? offset * 2 : offset;
    if (selectionStart === selectionEnd) {
      return selectionEnd + offset;
    }
    return subtract ? selectionEnd - length : selectionEnd + length;
  };

  triggerTextChange = ():void => {
    let text: string = this.refs.textarea.value;
    this.props.onTextChange(text);
  };

  checkForListAfterNewline = (event?: SyntheticInputEvent<HTMLInputElement>): string => {
    let text: string = this.refs.textarea.value;
    if (event && event.which === 13 && this.state.action) {
      if (this.state.action.group === ActionGroups.LIST) {
        console.log('asd');
      }
    }
    return text;
  };

  componentWillReceiveProps(nextProps: Props): void {
    let textarea: HTMLInputElement = this.refs.textarea,
      text: string = textarea.value,
      selectionStart: number = textarea.selectionStart,
      selectionEnd: number = textarea.selectionEnd,
      textSelected: boolean = selectionStart !== selectionEnd,
      subtract: boolean = false;

    if (nextProps.actionObjects && nextProps.actionObjects !== this.props.actionObjects) {
      let objectText: string = '';

      nextProps.actionObjects.forEach((actionObject: InputObject): void => {
        if (actionObject.action.wrap) {
          objectText += this.wrapText(actionObject.value, actionObject.action);
        } else {
          objectText += this.insertSymbol(actionObject.value, actionObject.action);
        }
      });

      textarea.value = this.insertText(text, objectText, selectionStart);
      textarea.focus();
      textarea.selectionEnd = selectionStart + objectText.length;

      this.setState({
        actionObjects: nextProps.actionObjects
      }, (): void => {
        this.triggerTextChange();
      });
    }

    else if (nextProps.action && nextProps.action !== this.props.action) {
      if (textSelected) {
        if (nextProps.action.wrap) {
          if (this.shouldUnwrapText(text, nextProps.action, selectionStart, selectionEnd)) {
            textarea.value = this.unwrapText(text, nextProps.action, selectionStart, selectionEnd);
            subtract = true;
          } else {
            textarea.value = this.wrapText(text, nextProps.action, selectionStart, selectionEnd);
          }
        } else {
          if (this.shouldRemoveSymbol(text, nextProps.action, selectionStart)) {
            textarea.value = this.removeSymbol(text, nextProps.action, selectionStart);
            subtract = true;
          } else {
            textarea.value = this.insertSymbol(text, nextProps.action, selectionStart);
          }
        }
      } else {
        textarea.value = this.insertSymbol(text, nextProps.action, selectionStart);
      }

      textarea.focus();
      textarea.selectionEnd = this.calculateCursorPosition(nextProps.action, selectionStart, selectionEnd, subtract);

      this.setState({
        action: nextProps.action
      }, (): void => {
        this.triggerTextChange();
      });
    }
  }

  render() {
    return (
      <textarea ref="textarea" onChange={this.triggerTextChange} onKeyPress={this.checkForListAfterNewline}></textarea>
    );
  }
}

export default TextileEditorTextArea