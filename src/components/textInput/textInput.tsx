import * as React from 'react';
import { Component } from 'react';

interface IInputProps {
  id?: string,
  name: string,
  value: string,
  type: string,
  placeholder?: string
  onChange?: (name: string, value: string) => void
}

interface IDefaultProps {
  type: string
}

interface IInputState {
  value: string
}

class TextInput extends Component<IInputProps, IInputState> {
  public static defaultProps: IDefaultProps = {
    type: 'text'
  }

  public static getDerivedStateFromProps(nextProps: IInputProps): IInputState {
    return { value: nextProps.value }
  }

  public state: IInputState = {
    value: this.props.value
  }

  public render() {
    return (
      <input
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        onBlur={this.onBlur} />
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const value: string = event.target.value;

    this.setState({ value })

    if (this.props.onChange) {
      this.props.onChange(name, value);
    }
  }

  private onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // TODO : implémenter la méthode.
  }
}

export default TextInput;