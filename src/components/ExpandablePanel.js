import React from "react";
import {
  View,
  Text,
  Animated,
  TouchableHighlight,
  StyleSheet
} from "react-native";

class ExpandablePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      animatedOnce: false,
      animation: new Animated.Value(0.01)
    };
    this.setMinHeight = this.setMinHeight.bind(this);
    this.setMaxHeight = this.setMaxHeight.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    let initialValue = this.state.expanded
      ? this.state.minHeight + this.state.maxHeight
      : this.state.minHeight;
    let finalValue = this.state.expanded
      ? this.state.minHeight
      : this.state.minHeight + this.state.maxHeight;
    this.setState({
      expanded: !this.state.expanded,
      animatedOnce: true
    });
    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  setMinHeight(event) {
    this.setState({
      ...this.state,
      minHeight: event.nativeEvent.layout.height
    });
  }

  setMaxHeight(event) {
    this.setState({
      ...this.state,
      maxHeight: event.nativeEvent.layout.height
    });
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.panel,
          this.state.animatedOnce ? { height: this.state.animation } : {}
        ]}
      >
        <View onLayout={e => this.setMinHeight(e)}>
          <TouchableHighlight onPress={this.onPress}>
            <Text>{this.props.title}</Text>
          </TouchableHighlight>
        </View>
        <View onLayout={e => this.setMaxHeight(e)}>{this.props.children}</View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    overflow: "hidden"
  }
});

export default ExpandablePanel;
