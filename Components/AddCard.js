import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class AddCard extends Component {
  render() {
    return (
      <View>
        <Text>Question</Text>
        <Text>Question Input</Text>

        <Text>Answer</Text>
        <Text>Answer Input</Text>

        <Text>Submit</Text>
      </View>
    )
  }
}