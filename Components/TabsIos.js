//Define which OS style of Tabs to use
import {createBottomTabNavigator} from "react-navigation";
import DeckList from "./DeckList";
import NewDeck from "./NewDeck";

export default createBottomTabNavigator({
  DECKS: DeckList,
  "NEW DECK": NewDeck,
});