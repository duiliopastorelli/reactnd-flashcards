import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddCard from "./Components/AddCard";
import DeckDetails from "./Components/DeckDetails";
import DeckList from "./Components/DeckList";
import NewDeck from "./Components/NewDeck";
import Quiz from "./Components/Quiz";
import QuizText from "./Components/QuizText";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        {/*<DeckList/>*/}

        {/*<DeckDetails/>*/}

        {/*<Quiz/>*/}

        {/*<NewDeck/>*/}

        {/*<AddCard/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
