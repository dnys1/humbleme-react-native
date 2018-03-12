import React from 'react';
import { Asset, AppLoading } from 'expo';
import AssetUtils from 'expo-asset-utils';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import Amplify, { Storage } from 'aws-amplify';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { addNavigationHelpers } from 'react-navigation';

import { AlertProvider } from './components/Alert';

import config from './aws-exports';
import configureStore from './config/store';
import MainStack from './config/routes';

// window.LOG_LEVEL = 'DEBUG'; // If more info is needed

Amplify.configure(config);
Storage.configure({ track: true });

EStyleSheet.build({
  $white: '#ffffff',
  $primaryTeal: '#38CECA',
  $primaryOrange: '#f15a24',
  $primaryYellow: '#efb402',
  $primaryGreen: '#12B336',
  $keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

const addListener = createReduxBoundAddListener('root');

const App = ({ dispatch, nav }) => (
  <MainStack
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
      addListener,
    })}
  />
);

App.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.object,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

const AppWithNavigation = connect(mapStateToProps)(App);

export default class AppComplete extends React.Component {
  constructor(props) {
    super(props);

    const { store, persistor } = configureStore();
    this.state = {
      store,
      persistor,
      isReady: false,
    };
  }

  // TODO: Rewrite with componentWillMount so we can better inspect promises
  /* eslint-disable class-methods-use-this */
  async cacheResourcesAsync() {
    const localAssets = [
      require('./assets/logo_white.png'),
      require('./assets/torch.png'),
      require('./assets/default.jpg'),
      require('./assets/scorebar.png'),
      require('./assets/scorewheel.png'),
    ];

    const now = Date.now();
    const tenDays = 10 * 24 * 60 * 60 * 1000;
    let remotePhotos;
    const remoteURIs = [];
    try {
      remotePhotos = await Storage.list('photos/', { level: 'protected' });
      if (remotePhotos) {
        remotePhotos.forEach(async (photo) => {
          // If image older than 10 days, don't cache
          if (photo.key.includes('profile') || now - photo.lastModified < tenDays) {
            const url = await Storage.get(photo.key, { level: 'protected' });
            remoteURIs.push(url);
          }
        });
      }
    } catch (err) {
      console.log('Error retrieving Storage data: ', err);
    }

    console.log(remoteURIs);
    const cacheRemoteImages = remoteURIs.map(photoURI => AssetUtils.resolveAsync(photoURI));
    const cacheLocalImages = localAssets.map(image => Asset.fromModule(image).downloadAsync());

    return Promise.all([...cacheRemoteImages, ...cacheLocalImages]);
  }
  /* eslint-enable class-methods-use-this */

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => {
            console.log('Async resources cached');
            this.setState({ isReady: true });
          }}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={this.state.store}>
        <PersistGate persistor={this.state.persistor}>
          <AlertProvider>
            <AppWithNavigation userLoggedIn={this.state.userLoggedIn} />
          </AlertProvider>
        </PersistGate>
      </Provider>
    );
  }
}
