import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  ActivityIndicator,
  Platform
} from 'react-native';

import { addEventListener, removeEventListener, requestPermissions, EuroMessageApi, VisilabsApi, setApplicationIconBadgeNumber, logToConsole, RDStoryView } from 'react-native-related-digital'

const App = () => {
  const [loading, setLoading] = useState(false)

  const appAlias = Platform.OS === "ios" ? "RelatedStoreIOS" : "AkinonAndroid";

  const siteId = "356467332F6533766975593D";
  const organizationId = "676D325830564761676D453D";
  const dataSource = "visistore";

  const euroMessageApi = new EuroMessageApi(appAlias)
  const visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource)

  useEffect(() => {
    logToConsole(true)

    addExtra()
    addListeners()

    return () => removeListeners()
  }, [])

  const addListeners = () => {

    addEventListener('register', async (token) => {
      const subscribeResult = await euroMessageApi.subscribe(token)

      visilabsApi.register(token, (result) => {
        
      })
    }, (notificationPayload) => {
      console.log('notification payload', notificationPayload)
    }, euroMessageApi, visilabsApi)

    addEventListener('registrationError', async (registrationError) => {
      console.log('registrationError is ', registrationError)
    }, euroMessageApi)
  }

  const getCustomTime = () => {
    var d = new Date();
    var date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((d.getMinutes()).toString().length == 2 ? (d.getMinutes()).toString() : "0" + (d.getMinutes()).toString()) + ":" + (d.getSeconds()).toString();
    return date_format_str
  }

  const addExtra = async () => {
    await euroMessageApi.setUserProperty("email", "baris.arslan@euromsg.com");
    await euroMessageApi.setUserProperty("keyID", "baris.arslan@euromsg.com");
    await euroMessageApi.setUserProperty("pushPermit", "Y");
    await euroMessageApi.setUserProperty('ConsentTime', getCustomTime());
    await euroMessageApi.setUserProperty('RecipientType', "BIREYSEL");
    await euroMessageApi.setUserProperty('ConsentSource', "HS_MOBIL");
  }

  const setBadgeNumber = () => {
    const number = 3
    setApplicationIconBadgeNumber(number)
  }

  const sendCustomEvent = () => {
    visilabsApi.customEvent('*', {
      'id': '1',
      'name': 'Product Name'
    })
  }

  const getRecommendations = async () => {
    try {
      const zoneId = '6'
      const productCode = ''

      const recommendations = await visilabsApi.getRecommendations(zoneId, productCode)
      console.log('recommendations', recommendations)
    }
    catch (e) {
      console.log('recommendations error', e)
    }
  }

  const removeListeners = () => {
    removeEventListener('register')
    removeEventListener('registrationError')
  }

  return (
    <View >
        {
          loading ?
          <ActivityIndicator 
            size='large'
            animating={loading} /> :
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <RDStoryView
              actionId={'459'} // optional
              onItemClicked={(data) => {
                console.log('Story data', data)
                // alert("ok")
              }}
              style={{ flex: 1,width:"100%" }}
            />
            <Button 
              title='REQUEST PERMISSONS'
              onPress={() => {
                requestPermissions()
              }} 
            />
            <Button 
              title='SET BADGE NUMBER TO 3 (IOS)'
              onPress={() => {
                setBadgeNumber()
              }} 
            />
            <Button 
              title='SEND CUSTOM EVENT'
              onPress={() => {
                sendCustomEvent()
              }} 
            />
            <Button
              title='GET RECOMMENDATIONS'
              onPress={async () => {
                await getRecommendations()
              }}
            />
          </ScrollView>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF',
  },
  divider: {
    height: 20
  }
});

export default App;