import React, {Component} from 'react';
import {View, Text} from 'react-native';
import StatusbarSpace from './StatusbarSpace';

export default class NewDeck extends Component {
  render() {
    return (
      <View>
        <StatusbarSpace/>
        <Text>What is the title of your new deck?</Text>

        <Text>Deck title Input</Text>

        <Text>Submit</Text>
      </View>
    )
  }
}