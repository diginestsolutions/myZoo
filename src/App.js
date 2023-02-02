import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './Navigation/index'
import { NativeBaseProvider, extendTheme } from 'native-base'
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './Redux/store';
import { Provider } from 'react-redux';
import "./i18n.config"
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';


const theme = extendTheme({
    fontConfig: {
        OpenSans: {
            100: {
                normal: 'OpenSans-Light',
                italic: 'OpenSans-LightItalic',
            },
            200: {
                normal: 'OpenSans-Regular',
            },
            300: {
                normal: 'OpenSans-Medium',
                italic: 'OpenSans-MediumItalic',
            },
            400: {
                normal: 'OpenSans-SemiBold',
                italic: 'OpenSans-SemiBoldItalic',
            },
            500: {
                normal: 'OpenSans-Bold',
                italic: 'OpenSans-BoldItalic',
            },
            600: {
                normal: 'OpenSans-ExtraBold',
                italic: 'OpenSans-ExtraBoldItalic',
            },
            
        },
    },
  
    fonts: {
        heading: 'OpenSans',
        body: 'OpenSans',
        mono: 'OpenSans',
    },
});

const config = {
    dependencies: {
    "linear-gradient": require("react-native-linear-gradient").default,
    },
};

const App = () => { 

    async function requestUserPermission() {
        const authorizationStatus = await messaging().requestPermission();
      
        if (authorizationStatus) {
          console.log('Permission status:', authorizationStatus);
        }
    }


    useEffect(() => {
        requestUserPermission()
    }, [])

    function onMessageReceived(message) {
        const { type, timestamp } = message.data;
      
        if (type === 'order_shipped') {
          notifee.displayNotification({
            title: message?.title,
            body: message?.body,
            android: {
              channelId: 'default',
            },
          });
        }
      }

    useEffect(() => {

       

        getToken()
        messaging().onMessage(onMessageReceived);
        messaging().setBackgroundMessageHandler(onMessageReceived);
        // Assume a message-notification contains a "type" property in the data payload of the screen to open
    
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
          );
          //navigation.navigate(remoteMessage.data.type);
        });
    
        // Check whether an initial notification is available
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
              );
              //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
            //setLoading(false);
          });
      }, []);


      const getToken = async() => {
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
      }
    

  
    return (
        <NativeBaseProvider config={config} theme={theme}>
            <Provider store={store}>
                <Navigation/>
            </Provider>
        </NativeBaseProvider>
    )
  
}

export default App

const styles = StyleSheet.create({})