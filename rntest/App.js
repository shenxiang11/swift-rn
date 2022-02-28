/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  AppRegistry, Button, NativeEventEmitter, NativeModules, SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme, View
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const emitter = new NativeEventEmitter(NativeModules.RNManager);
// console.log(NativeModules, NativeInfoModule);

const SharedStore = {
  pool: new Map(),
  setItem(key, value) {
    this.pool.set(key, value);
  },
  getItem(key) {
    return this.pool.get(key);
  },
  all() {
    return JSON.stringify([...this.pool]);
  },
};
// eslint-disable-next-line no-undef
__fbBatchedBridge.registerCallableModule('SharedStore', SharedStore);

const App = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [exampleText, setExampleText] = useState(
    SharedStore.getItem('example'),
  );

  useEffect(() => {
    let subscription = emitter.addListener('testEvent', data => {
      console.log(data);
    });
    return function () {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View>
          <Text>{JSON.stringify(props)}</Text>
        </View>
        <View>
          <Text>Store.get.key.example:{exampleText}</Text>
        </View>
        <Button
          onPress={() => {
            setExampleText(SharedStore.getItem('example'));
          }}
          title="Get key.example"
        />
        <Button
          onPress={() => {
            NativeModules.RNManager.pop();
          }}
          title="Pop"
        />
        <Button
          onPress={() => {
            NativeModules.RNManager.open('Profile');
          }}
          title="open profile"
        />
        <Button
          onPress={() => {
            NativeModules.RNManager.sayHelloWorld((err, data) => {
              console.log(err, data);
            });
          }}
          title="say hello world"
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

AppRegistry.registerComponent('Home', () => App);

export default App;
