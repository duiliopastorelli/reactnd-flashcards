import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {submitCard} from "../utils/api";

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

export default class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  /**
   * Handles the submission of a new card to the AsyncStorage and updates
   * all the screens, included the ones below in the stack
   */
  handleSubmit = () => {
    //Checks if the input fields are not empty
    //todo add better validation check
    if(this.state.questions !== "" && this.state.answer !== ""){

      //Allows to access the state of the prev. screen and update it
      this.props.navigation.state.params.DeckDetails.setState({
        'cardsCounter':
          this.props.navigation.state.params.DeckDetails.state.cardsCounter + 1
      });

      //Updates the state in the DeckList screen
      const deckTitle =
        this.props.navigation.state.params.DeckDetails.state.deckTitle;
      const question = this.state.question;
      const answer = this.state.answer;

      //Updates the AsyncStorage
      submitCard(deckTitle, question, answer);

      //Navigates back to the previous screen
      this.props.navigation.goBack(null);
    } else {
      //Displays a toast that informs the user that something is wrong
      Toast.show('Please assure that both the question AND the answer fields' +
        ' are filled.',{
        position: Toast.positions.TOP,
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <DismissKeyboard>
          <View
            style={styles.container}
          >

            <Text style={styles.label}>Question</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              maxLength={90}
              placeholder="Type here the question"
              onChangeText={(text) => this.setState({question: text})}
            />

            <Text style={styles.label}>Answer</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              maxLength={90}
              placeholder="Type here the answer"
              onChangeText={(text) => this.setState({answer: text})}
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={this.handleSubmit}
            >
              <Text>Submit</Text>
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
  label: {
    fontSize: 20
  },
  btn: {
    marginTop: 15,
  },
});