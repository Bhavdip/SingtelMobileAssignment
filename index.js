import React, {AppRegistry} from 'react-native';
import SingtelApplication from './app/SingtelApplication';
import { Provider } from 'react-redux';
import {name as appName} from './app.json';
import globalStore from './app/store';

export function SingtelMobileApp() {
  return (
    <Provider store={globalStore}>
      <SingtelApplication />
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => SingtelMobileApp);
