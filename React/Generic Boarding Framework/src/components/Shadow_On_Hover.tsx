import React from 'react';

type with_on_hover_shadow_state = {
    shadow: number,
}

const with_on_hover_shadow = (Component: React.ElementType, { init = 1, hovered = 3 }) => {
  return class extends React.Component {
    state: with_on_hover_shadow_state = {
      shadow: init
    };

    onMouseOver = () => this.setState({ shadow: hovered });

    onMouseOut = () => this.setState({ shadow: init });

    render() {
      return (
        <Component
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          zDepth={this.state.shadow}
          {...this.props}
        />
      );
    }
  };
};

export default with_on_hover_shadow;