import React, {Component} from 'react';
import {Constants} from "expo";
import {View} from "react-native";

/**
 * This Component solves the issue of the view collapsing over the status bar.
 * It adds dinamically the needed space depending on the platform in use.
 */
class StatusbarSpace extends Component {
  render(){
    return (
      <View style={{height:Constants.statusBarHeight}}></View>
    )
  }
}

export default StatusbarSpace;