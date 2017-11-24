// @flow

import React, { Component } from 'react';
import './textile-editor-textarea.css';
import type { Action, ActionButton, InputObject } from '../../flow-typed/textile-editor';
import { ButtonGroups } from '../../flow-typed/textile-editor';
import { ActionsConfig } from '../textile-editor-actions/textile-editor-actions-config';

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
    return  text.slice(0, selectionStart) +
            this.getSymbol(action) +
            text.slice(selectionStart, selectionEnd) +
            this.getSymbol(action, true) +
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
        seed: string = this.getSymbol(action),
        selectionStartSymbol: string = text.slice(selectionStart, selectionStart + offset),
        selectionEndSymbol: string = text.slice(selectionEnd - offset, selectionEnd);
    return selectionStartSymbol === seed && selectionEndSymbol === seed;
  };

  insertSymbol = (text: string, action: Action, selectionStart: number = 0): string => {
    if (action.wrap) {
      return  text.slice(0, selectionStart) +
        this.getSymbol(action) + this.getSymbol(action, true) +
        text.slice(selectionStart);
    }
    return  text.slice(0, selectionStart) +
            this.getSymbol(action) +
            text.slice(selectionStart);
  };

  removeSymbol = (text: string, action: Action, selectionStart: number): string => {
    let offset: number = this.calculateOffset(action);
    return  text.slice(0, selectionStart) +
            text.slice(selectionStart + offset);
  };

  shouldRemoveSymbol = (text: string, action: Action, selectionStart: number): boolean => {
    let offset: number = this.calculateOffset(action),
      seed: string = this.getSymbol(action),
      selectionStartSymbol: string = text.slice(selectionStart, selectionStart + offset);
    return selectionStartSymbol === seed;
  };

  insertText = (text: string, toInsert: string, selectionStart: number, atNewLine: boolean = false): string => {
    let newLine: string = atNewLine ? '\n' : '';
    return  text.slice(0, selectionStart) +
      newLine +
      toInsert +
      text.slice(selectionStart);
  };

  setValue = (text: string): void => {
    let textarea = this.refs.textarea;
    textarea.value = text;
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

  setCursorPosition = (position: number): void => {
    let textarea = this.refs.textarea;
    textarea.focus();
    textarea.selectionEnd = position;
  };

  getSymbol = (action: Action, reverse: boolean = false): string => {
    let space: string = action.spaced ? ' ' : '';
    return reverse ? space + action.symbol : action.symbol + space;
  };

  triggerTextChange = ():void => {
    let text: string = this.refs.textarea.value;
    this.props.onTextChange(text);
  };

  handleKeyboardEvents = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    let textarea = this.refs.textarea,
        text: string = textarea.value,
        selectionStart: number = textarea.selectionStart;

    if (event.which === 13) {
      let textBefore = text.slice(0, selectionStart),
          textBeforeLastNewline = textBefore.split('\n').pop(),
          listButtons: ActionButton[] = ActionsConfig.filter((button: ActionButton): boolean => {
            return button.group === ButtonGroups.LIST;
          });

      listButtons.some((button: ActionButton): boolean => {
        let symbol = this.getSymbol(button.action),
            potentialSymbol = textBeforeLastNewline.substring(0, symbol.length);

        if (symbol === potentialSymbol) {
          if (textBeforeLastNewline.length > symbol.length) {
            event.preventDefault();
            this.setValue(this.insertText(text, symbol, selectionStart, true));
            this.setCursorPosition(selectionStart + symbol.length + 1);
          }
          return true;
        }
        return false;
      });
    }
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

      this.setValue(this.insertText(text, objectText, selectionStart));
      this.setCursorPosition(selectionStart + objectText.length);
      this.setState({
        actionObjects: nextProps.actionObjects
      }, (): void => {
        this.triggerTextChange();
      });
    }

    else if (nextProps.action && nextProps.action !== this.props.action) {
      let value: string = '';

      if (textSelected) {
        if (nextProps.action.wrap) {
          if (this.shouldUnwrapText(text, nextProps.action, selectionStart, selectionEnd)) {
            value = this.unwrapText(text, nextProps.action, selectionStart, selectionEnd);
            subtract = true;
          } else {
            value = this.wrapText(text, nextProps.action, selectionStart, selectionEnd);
          }
        } else {
          if (this.shouldRemoveSymbol(text, nextProps.action, selectionStart)) {
            value = this.removeSymbol(text, nextProps.action, selectionStart);
            subtract = true;
          } else {
            value = this.insertSymbol(text, nextProps.action, selectionStart);
          }
        }
      } else {
        value = this.insertSymbol(text, nextProps.action, selectionStart);
      }

      this.setValue(value);
      this.setCursorPosition(this.calculateCursorPosition(nextProps.action, selectionStart, selectionEnd, subtract));
      this.setState({
        action: nextProps.action
      }, (): void => {
        this.triggerTextChange();
      });
    }
  }

  render() {
    return (
      <textarea ref="textarea" onKeyPress={this.handleKeyboardEvents}></textarea>
    );
  }
}

export default TextileEditorTextArea