import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import SoundApp from './src/SoundApp';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SoundApp />
      </SafeAreaView>
    </>
  );
};

export default App;
