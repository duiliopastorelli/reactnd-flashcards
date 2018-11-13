import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {getDecks, initiateStorage} from '../utils/api';
import StatusbarSpace from './StatusbarSpace';
import DeckListElement from "./DeckListElement";

export default class DeckList extends Component {

  state = {
    decks: []
  };

  //Initiates the data for the UI
  initiateDecksData = ()=> {
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
  }

  //Render function for FlatList Component
  renderItem = ({item}) => {
    return <DeckListElement
      {...item}
      updateDeck={this.updateDeck}
      stateUpdater={this.stateUpdater}
    />
  };

  //Updates the state from somewhere else in the App
  stateUpdater = () => {
    getDecks()
      .then((result) => {
        this.setState({
          decks: result
        })
      });
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