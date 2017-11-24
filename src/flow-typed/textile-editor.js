// @flow

export const ButtonGroups = {
  TEXT: 'text',
  ALIGN: 'align',
  LIST: 'list',
  HEADER: 'header',
  OTHER: 'other'
};
export type ButtonGroup = $Keys<typeof ButtonGroups>;

type Action_ = {|
  symbol: string,
  wrap: boolean,
  spaced: boolean
|}
export type Action = Action_ & $Shape<Action_>

type Input_ = {|
  label: string,
  name: string,
  value: string,
  action: Action
|}
export type Input = Input_ & $Shape<Input_>

type Prompt_ = {|
  inputs: Input[]
|}
export type Prompt = Prompt_ & $Shape<Prompt_>

type ActionButton_ = {|
  icon: string,
  subtext?: string,
  label: string,
  group: ButtonGroup,
  action?: Action,
  prompt?: Prompt
|}
export type ActionButton = ActionButton_ & $Shape<ActionButton_>

type InputObject_ = {|
  value: string,
  name: string,
  action: Action
|}
export type InputObject = InputObject_ & $Shape<InputObject_>