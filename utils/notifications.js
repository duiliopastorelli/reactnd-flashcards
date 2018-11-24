import {Notifications, Permissions} from "expo";
import {AsyncStorage} from 'react-native';

const NOTIFICATION_KEY = 'flashcard:notifications';

/**
 * Clear the local notifications
 *
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

/**
 * Create a new notification for both iOS and Android
 *
 * @returns {{title: string, body: string, ios: {sound: boolean}, android: {sound: boolean, priority: string, sticky: boolean, vibrate: boolean}}}
 */
function createNotification() {
  return {
    title: 'Notification title',
    body: 'Notification body',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

/**
 * Set a notification
 */
export function setlocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            //Checks if the permissions has been already granted
            if(status === 'granted'){
              //Remove all the scheduled notifications
              Notifications.cancelAllScheduledNotificationsAsync();

              //Set the value for tomorrow date
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              //Schedule the notification
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              //Persist in the AsyncStorage that the notification has been set
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}