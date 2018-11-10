import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class NewDeck extends Component {
  render() {
    return (
      <View>
        <Text>What is the title of your new deck?</Text>

        <Text>Deck title Input</Text>

        <Text>Submit</Text>
      </View>
    )
  }
}