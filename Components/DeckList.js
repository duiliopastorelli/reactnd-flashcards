import React, {Component} from 'react';
import {View, StyleSheet, FlatList, AsyncStorage} from 'react-native';
import {getDecks, initiateStorage} from '../utils/api';
import StatusbarSpace from './StatusbarSpace';
import DeckListElement from "./DeckListElement";
import { setlocalNotification} from "../utils/notifications";

export default class DeckList extends Component {

  state = {
    decks: []
  };

  //Initiates the data for the UI
  initiateDecksData = () => {
    //Initiates the AsyncStorage
    initiateStorage();

    //Updates the state with the decks available in the AsyncStorage
    getDecks()
      .then((result) => {
        this.setState({
          decks: result
        })
      });
  };

  componentDidMount() {
    //Get the Decks data for populate the UI
    this.initiateDecksData();

    //Check continuously if the AsyncStorage has new decks and populate the UI
    setInterval(this.initiateDecksData, 5000);

    //Set the notifications
    setlocalNotification()
  }

  //Render function for FlatList Component
  renderItem = ({item}) => {
    return <DeckListElement
      {...item}
      updateDeck={this.updateDeck}
    />
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusbarSpace/>
        <FlatList
          data={this.state.decks}
          renderItem={this.renderItem}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});