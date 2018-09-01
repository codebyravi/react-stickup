import * as React from 'react';

import { ObserveBoundingClientRect } from 'react-viewport-utils';
import { IRect } from './types';

interface IProps {
  style?: React.CSSProperties;
  className?: string;
  forwardRef?: React.RefObject<any>;
  node: React.RefObject<any>;
  children: (rect: IRect | null) => React.ReactNode;
}

interface IState {
  height?: number | 'auto';
  width?: number | 'auto';
}

export default class Placeholder extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    style: {},
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      height: 'auto',
      width: 'auto',
    };
  }

  setDimensions = ({ height, width }: IRect) => {
    this.setState({
      height,
      width,
    });
  };

  getPlaceholderStyles(): React.CSSProperties {
    const { style } = this.props;
    const { height, width } = this.state;
    return {
      position: 'relative',
      height,
      width,
      ...style,
    };
  }

  render() {
    return (
      <div
        ref={this.props.forwardRef}
        style={this.getPlaceholderStyles()}
        className={this.props.className}
      >
        <ObserveBoundingClientRect
          node={this.props.node}
          setInitials={this.setDimensions}
        >
          {this.props.children}
        </ObserveBoundingClientRect>
      </div>
    );
  }
}