import * as React from 'react'
import { Component } from 'react'

interface IProps {
  className?: string | undefined
  type: string
  onClick?: () => void
}

interface IDefaultProps {
  type: string
}

class Button extends Component<IProps> {
  public static defaultProps: IDefaultProps = {
    type: 'button',
  }

  public state = {}

  public render() {
    return (
      // <button className={this.props.className} type={this.props.type} onClick={this.onClick}>{this.props.children}</button>
      <button className={this.props.className} onClick={this.onClick}>
        {this.props.children}
      </button>
    )
  }

  private onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }
}

export default Button
