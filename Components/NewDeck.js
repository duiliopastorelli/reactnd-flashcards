import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import StatusbarSpace from './StatusbarSpace';
import {addDeck} from "../utils/api";
import DeckList from "./DeckList";

/**
 * Solution for dismiss the keyboard tapping around the input fields
 *
 * @param children
 * @returns {*}
 * @constructor
 */
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class NewDeck extends Component {

  state = {
    newDeckTitle: "",
  };

  handleDeckCreation = () => {
    addDeck(this.state.newDeckTitle)
      .then(() => {
        this.props.navigation.navigate('DeckDetails',
          { title: this.state.newDeckTitle });
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <DismissKeyboard>
          <View style={styles.container}>
            <StatusbarSpace/>
            <Text>What is the title of your new deck?</Text>

            <TextInput
              style={styles.input}
              multiline={true}
              maxLength={30}
              placeholder="Deck title"
              autofocus
              onChangeText={(text) => this.setState({newDeckTitle: text})}
            />

            <TouchableOpacity onPress={this.handleDeckCreation}>
              <Text style={{padding: 10}}>Create Deck</Text>
            </TouchableOpacity>
          </View>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ececec',
  },
  input: {
    minWidth: '80%',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: 'white',
    fontSize: 18,
  },
});