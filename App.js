import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
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



  const InApp8 = () => {
    visilabsApi.customEvent('InApp8', {
      'OM.exVisitorID': 'enes.kaplan@akinon.com',
    })
  }


  const InApp5 = () => {
    visilabsApi.customEvent('InApp5', {
      'OM.exVisitorID': 'enes.kaplan@akinon.com',
    })
  }

  const InApp4 = () => {
    visilabsApi.customEvent('InApp4', {
      'OM.exVisitorID': 'enes.kaplan@akinon.com',
    })
  }

  const InApp7 = () => {
    visilabsApi.customEvent('InApp7', {
      'OM.exVisitorID': 'enes.kaplan@akinon.com',
    })
  }

  const InApp3 = () => {
    visilabsApi.customEvent('InApp3', {
      'OM.exVisitorID': 'enes.kaplan@akinon.com',
    })
  }

  const InApp6 = () => {
    visilabsApi.customEvent('InApp6', {
      'OM.exVisitorID': 'enes.kaplan@akinon.com',
    })
  }

  const InApp1 = () => {
    visilabsApi.customEvent('Tam ekran görsel button', {
      'OM.exVisitorID': 'enes.kaplan@akinon.com',
    })
  }

  const InApp2 = () => {
    visilabsApi.customEvent('InApp2', {
      'OM.exVisitorID': 'enes.kaplan@akinon.com',
    })
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
            <Button
              title='REQ'
              onPress={() => {
                requestPermissions()
              }}
            />

            <Button
              title='Anket'
              onPress={() => {
                InApp5()
              }}
            />
            <Button
              title='NPS'
              onPress={() => {
                InApp7()
              }}
            />
            <Button
              title='Tam ekran görsel'
              onPress={() => {
                InApp2()
              }}
            />
            <Button
              title='Tam ekran görsel button'
              onPress={() => {
                InApp1()
              }}
            />
            <Button
              title='Survey'
              onPress={() => {
                InApp6()
              }}
            />
            <Button
              title='Alert'
              onPress={() => {
                InApp8()
              }}
            />
            <Button
              title='Mini icon'
              onPress={() => {
                InApp4()
              }}
            />
            <Button
              title='popup gorsel baslik metin buton'
              onPress={() => {
                InApp3()
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
    height: "100%"
  },
  divider: {
    height: 20
  }
});

export default App;