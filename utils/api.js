import {AsyncStorage} from 'react-native';
import {mock} from '../other/asyncStorage-object-mock';

//todo handle errors with try/catch blocks

const STORAGE_KEY = 'flashcard:decks';

/**
 * Initiate the AsyncStorage and populate it with mock data
 *
 * @returns {*}
 */
export function initiateStorage() {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(mock));
}

/**
 * Retrieve a deck from the AsyncStorage
 *
 * @returns {*|PromiseLike<Array | never>|Promise<Array | never>}
 */
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((result) => {
      let resultToReturn = [];
      result = JSON.parse(result);
      for (let key in result) {
        if (result.hasOwnProperty(key)) {
          resultToReturn.push(result[key]);
        }
      }
      return resultToReturn;
    });
}

/**
 * Retrieve a single deck by deck name
 *
 * @param deckName
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function getSingleDeck(deckName) {
  //Obtain the data from the AsyncStorage
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      const parsedResult = JSON.parse(result);

      for (let key in parsedResult) {
        if (
          parsedResult.hasOwnProperty(key) &&
          key === deckName
        ) return parsedResult[key]
      }
    })
}

/**
 * Adds a new card to an existing deck
 * The card is composed by a question and an answer
 *
 * @param deckTitle
 * @param question
 * @param answer
 */
export function submitCard(deckTitle, question, answer) {
  //Retrieve the Item
  AsyncStorage.getItem(STORAGE_KEY)
    .then(storage => {
      let parsedStorage = JSON.parse(storage);
      const objToAdd = {
        question: question,
        answer: answer
      };
      parsedStorage[deckTitle].questions.push(objToAdd);

      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(parsedStorage));
    });
}

export function addDeck(deckTitle) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(storage => {
      let parsedStorage = JSON.parse(storage);
      parsedStorage[deckTitle] = {
        key: deckTitle,
        questions: [],
        title: deckTitle
      };

      // console.log(parsedStorage);

      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(parsedStorage));
    })
}

export function removeEntry(key) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(storage => {
      const data = JSON.parse(storage);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    })
}