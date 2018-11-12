import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DeckCardsCounter from "./DeckCardsCounter";

export default class DeckListElement extends Component {

  render() {
    let title = this.props.title;
    let questionsCount = this.props.questions.length;
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.title} onPress={this.getName}>{title}</Text>
        <DeckCardsCounter questions={questionsCount}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 30
  },
});