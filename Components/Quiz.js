import React, {Component} from 'react';
import {View, Text} from 'react-native';
import QuizText from "./QuizText";

export default class Quiz extends Component {
  render() {
    return (
      <View>
        <QuizText/>
        <QuizText/>
        <Text>Correct</Text>
        <Text>Incorrect</Text>
      </View>
    )
  }
}