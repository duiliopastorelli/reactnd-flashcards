import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DeckListElement from "./DeckListElement";

export default class DeckList extends Component {
  render() {
    return (
      <View>
        <DeckListElement/>
        <DeckListElement/>
        <DeckListElement/>
      </View>
    )
  }
}