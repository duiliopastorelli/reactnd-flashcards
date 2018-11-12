import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class DeckCardsCounter extends Component {
  render() {
    return (
      <View>
        <Text style={styles.cardsCounter}>{this.props.questions} cards</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardsCounter: {
    fontSize: 18
  }
});