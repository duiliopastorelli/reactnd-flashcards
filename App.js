import React from 'react';
import {Platform, StyleSheet, View, AsyncStorage} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import DeckList from "./Components/DeckList";
import DeckDetails from "./Components/DeckDetails";
import AddCard from "./Components/AddCard";
import NewDeck from "./Components/NewDeck";
import Quiz from "./Components/Quiz";

class App extends React.Component {

  render() {
    return (
      <View style={styles.container}></View>
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

/**
 * Stack Navigation under the Deck Tab
 */
const DeckStack = createStackNavigator({
  DeckList: DeckList,
  DeckDetails: DeckDetails,
  AddCard: AddCard,
  Quiz: Quiz,
});

/**
 * Tab Navigation setup
 */
let currentOsTab;
//iOS version handler
if (Platform.OS === "ios") {
  currentOsTab = createBottomTabNavigator({
    DECKS: DeckStack,
    "NEW DECK": NewDeck,
  })
} else {
  //Android version handler
  currentOsTab = createMaterialBottomTabNavigator({
    DECKS: {screen: DeckStack},
    "NEW DECK": {screen: NewDeck},
  }, {
    initialRouteName: 'DECKS',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#694fad'},
  });
}

export default currentOsTab;