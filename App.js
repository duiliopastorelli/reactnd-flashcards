import React from 'react';
import {Platform, StyleSheet, View, AsyncStorage} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import DeckList from "./Components/DeckList";
import NewDeck from "./Components/NewDeck";
import AddCard from "./Components/AddCard";
import DeckDetails from "./Components/DeckDetails";
import Quiz from "./Components/Quiz";

class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        {/*<DeckDetails/>*/}

        {/*<Quiz/>*/}

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

let currentOsTab;
if (Platform.OS === "ios") {
  currentOsTab = createBottomTabNavigator({
    DECKS: DeckList,
    "NEW DECK": NewDeck,
  })
} else {
  currentOsTab = createMaterialBottomTabNavigator({
    DECKS: {screen: DeckList},
    "NEW DECK": {screen: NewDeck},
  }, {
    initialRouteName: 'DECKS',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#694fad'},
  });
}

export default currentOsTab;