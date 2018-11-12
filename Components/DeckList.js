import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {getDecks, initiateStorage} from '../utils/api';
import StatusbarSpace from './StatusbarSpace';
import DeckListElement from "./DeckListElement";

export default class DeckList extends Component {

  state = {
    decks: []
  };

  componentDidMount() {
    initiateStorage();

    getDecks()
      .then((result) => {
        this.setState({
          decks: result
        })
      });
  }

  renderItem = ({item}) => {
    return <DeckListElement
      {...item}/>
  };

  render() {
    // console.log(this._keyExtractor());
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