import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DeckCardsCounter from "./DeckCardsCounter";

export default class DeckListElement extends Component {
  render() {
    return (
      <View>
        <Text>Deck title</Text>
        <DeckCardsCounter/>
      </View>
    )
  }
}