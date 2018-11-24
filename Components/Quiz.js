import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {getSingleDeck} from "../utils/api";
import Toast from "react-native-root-toast";
import {clearLocalNotification} from "../utils/notifications";

export default class Quiz extends Component {
  state = {
    isDisplayingQuestion: true,
    isDisplayingScores: false,
    deckTitle: "",
    questions: [],
    currentQuestionIndex: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    buttonsAreDisabled: false,
  };

  createQuizzes = () => {
    //Retrieves the Deck from the AsyncStorage
    getSingleDeck(
      this.props.navigation.state.params.DeckDetails.state.deckTitle
    )
      .then(res => {
        //Updates the state and reset the score, useful when starting again
        this.setState({
          deckTitle: res.title,
          questions: res.questions,
          isDisplayingScores: false,
          currentQuestionIndex: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          buttonsAreDisabled: false,
        });
      });
  };

  toggleAnswer = () => {
    const isDisplayingQuestion = this.state.isDisplayingQuestion;
    this.setState({isDisplayingQuestion: !isDisplayingQuestion})
  };

  questionCounterHandler = (variation) => {
    const correctAnswers = this.state.correctAnswers;
    const wrongAnswers = this.state.wrongAnswers;

    //Disable the buttons for avoid that the user press them multiple times
    this.setState({
      buttonsAreDisabled: true
    });

    if (variation > 0) {
      this.setState({
        correctAnswers: correctAnswers + variation,
      });
      Toast.show('Well done! That\'s mastered!', {
        position: Toast.positions.TOP,
      });
    } else {
      this.setState({
        wrongAnswers: wrongAnswers - variation,
      });
      Toast.show('Sorry... you need to practice more.', {
        position: Toast.positions.TOP,
      });
    }

    //Proceed to the next question or results, with a delay for graceful
    // integration with the Toast message
    setTimeout(() => {
      this.nextQuestion();
    }, 1000)

  };

  nextQuestion = () => {
    const currentQuestionIndex = this.state.currentQuestionIndex;

    if (currentQuestionIndex < this.state.questions.length - 1) {
      //Updates the UI to the next question
      this.setState({
        isDisplayingQuestion: true,
        buttonsAreDisabled: false,
        currentQuestionIndex: currentQuestionIndex + 1
      })
    } else {
      //Clear the notification system
      clearLocalNotification();

      //There are no more questions, UI will display the results
      setTimeout(() => {
        this.setState({isDisplayingScores: true})
      }, 1000)
    }

  };

  componentDidMount() {
    this.createQuizzes()
  };

  render() {
    const {questions, currentQuestionIndex, isDisplayingQuestion} = this.state;

    return (
      <View style={styles.container}>

        {!this.state.isDisplayingScores && (
          <View style={styles.container}>
            <Text>
              Question {this.state.currentQuestionIndex + 1}/
              {this.state.questions.length}
            </Text>

            < View style={styles.textWrapper}>
              <Text style={{fontSize: 30}}>
                {isDisplayingQuestion ? "Question" : "Answer"}
              </Text>
              {questions[currentQuestionIndex] && (
                <Text style={{fontSize: 20}}>{
                  isDisplayingQuestion
                    ? questions[currentQuestionIndex].question
                    : questions[currentQuestionIndex].answer
                }</Text>
              )}
            </View>

            <TouchableOpacity
              disabled={this.state.buttonsAreDisabled}
              onPress={this.toggleAnswer}>
              <Text style={{padding: 10, marginBottom: 10}}>See answer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={this.state.buttonsAreDisabled}
              onPress={() => this.questionCounterHandler(1)}>
              <Text style={{padding: 10, marginBottom: 10}}>Correct</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={this.state.buttonsAreDisabled}
              onPress={() => this.questionCounterHandler(-1)}>
              <Text style={{padding: 10}}>Wrong</Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.isDisplayingScores && (
          <View style={styles.container}>
            <Text style={{fontSize: 30, marginBottom: 10}}>SCORE:</Text>
            <Text style={{fontSize: 20, marginBottom: 10}}>
              Correct answers: {this.state.correctAnswers}</Text>
            <Text style={{fontSize: 20, marginBottom: 10}}>
              Wrong answers: {this.state.wrongAnswers}</Text>

            <TouchableOpacity onPress={() => {
              this.createQuizzes()
            }}>
              <Text style={{padding: 10}}>Start again!</Text>
            </TouchableOpacity>
          </View>
        )}
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
  hidden: {
    display: 'none',
  },
  textWrapper: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
    padding: 10,
  },
});