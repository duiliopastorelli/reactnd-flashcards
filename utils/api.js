import {AsyncStorage} from 'react-native';
import {mock} from '../other/asyncStorage-object-mock';

//todo handle errors with try/catch blocks

const STORAGE_KEY = 'flashcard:decks';

export function initiateStorage() {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(mock));
}


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

export function submitCard(deckTitle, question, answer, stateUpdater) {
  //Retrieve the Item
  AsyncStorage.getItem(STORAGE_KEY)
    .then(storage => {
      let parsedStorage = JSON.parse(storage);
      const objToAdd = {
        question: question,
        answer: answer
      };
      parsedStorage[deckTitle].questions.push(objToAdd);

      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(parsedStorage))
        .then(() => stateUpdater());
    });
}

export function removeEntry(key) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    })
}