import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DeckListElement from "./DeckListElement";

export default class DeckDetails extends Component {
  render() {
    return (
      <View>
        <DeckListElement/>

        <Text>ADD CARD</Text>
        <Text>START QUIZ</Text>
      </View>
    )
  }
}