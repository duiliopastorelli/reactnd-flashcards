import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import DeckCardsCounter from "./DeckCardsCounter";

class DeckListElement extends Component {

  render() {
    const title = this.props.title;

    let questionsCount = 0;
    //Assure that the value for the cards number is valid, otherwise use zero
    if (this.props.questionsNumber) {
      questionsCount = this.props.questionsNumber;
    } else if (this.props.questions) {
      questionsCount = this.props.questions.length;
    }

    return (
      this.props.questions !== undefined && (
        <View
          style={[styles.container, this.props.style]}
        >

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('DeckDetails', {
                title: this.props.title,
                questions: this.props.questions,
                stateUpdater: this.props.stateUpdater,
              });
            }}
          >

            <View style={styles.dataWrapper}>
              <Text style={styles.title}>{title}</Text>
              <DeckCardsCounter questions={questionsCount}/>
            </View>

          </TouchableOpacity>
        </View>
      )
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    minHeight: 90,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  dataWrapper: {
    flex: 1,
    alignItems: 'center',
    width: 300,
  },
  title: {
    fontSize: 30
  },
});

export default withNavigation(DeckListElement);