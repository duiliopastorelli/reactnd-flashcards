import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import DeckListElement from "./DeckListElement";

class DeckDetails extends Component {
  state = {
    deckTitle: this.props.navigation.getParam('title', 'Title N/A'),
    cardsCounter: this.props.navigation.getParam('questions', []).length
  };

  render() {
    const {navigation} = this.props;
    const questions = navigation.getParam('questions', []);

    return (
      <View style={styles.container}>
        <DeckListElement
          style={styles.element}
          title={this.state.deckTitle}
          questions={questions}
          questionsNumber={this.state.cardsCounter}
        />

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddCard', {
              DeckDetails: this,
            })
          }
          }
          style={styles.btn}>
          <Text>ADD CARD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Quiz', {
              DeckDetails: this,
            })
          }}
          style={styles.btn}>
          <Text>START QUIZ</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-around',
    marginTop: 5,
  },
  element: {
    borderBottomWidth: 0,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default withNavigation(DeckDetails);