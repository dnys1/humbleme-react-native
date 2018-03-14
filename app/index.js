import React from 'react';
import { AppLoading } from 'expo';
import AssetUtils from 'expo-asset-utils';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import Amplify, { Storage } from 'aws-amplify';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { addNavigationHelpers } from 'react-navigation';
import { put } from 'redux-saga/effects';

import { AlertProvider } from './components/Alert';

import config from './aws-exports';
import configureStore from './config/store';
import MainStack from './config/routes';
import { SET_PROFILE, APPLICATION_LOADED } from './actions/app';

// window.LOG_LEVEL = 'DEBUG'; // If more info is needed

Amplify.configure(config);
Storage.configure({ track: true });

EStyleSheet.build({
  $white: '#ffffff',
  $primaryTeal: '#38CECA',
  $primaryOrange: '#f15a24',
  $primaryYellow: '#efb402',
  $primaryCarrotOrange: '#f7931e',
  $primaryGreen: '#12B336',
  $primaryPink: '#ff8372',
  $primaryNavy: '#0C2F6D',

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

    const { store, persistor, runSaga } = configureStore();
    this.state = {
      store,
      persistor,
      runSaga,
      isReady: false,
    };
  }

  cacheResourcesAsync = async () => {
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
    const remoteURIs = { other: [] };
    try {
      remotePhotos = await Storage.list('photos/', { level: 'protected' });
      if (remotePhotos) {
        const getPhotoURIs = remotePhotos.reduce(
          (acc, photo) => {
            // If image older than 10 days, don't cache
            if (photo.key.includes('profile')) {
              acc.profile = Storage.get(photo.key, { level: 'protected' });
            } else if (now - photo.lastModified < tenDays) {
              acc.other.push(Storage.get(photo.key, { level: 'protected' }));
            }
            return acc;
          },
          { other: [] },
        );
        console.log(getPhotoURIs);
        await Promise.all(getPhotoURIs.other).then(res => remoteURIs.other.push(...res));
        if (getPhotoURIs.profile) {
          remoteURIs.profile = await getPhotoURIs.profile;
        }
      }
    } catch (err) {
      console.log('Error retrieving Storage data: ', err);
    }

    console.log(remoteURIs);

    let cacheProfileImage;
    if (remoteURIs.profile) {
      cacheProfileImage = AssetUtils.resolveAsync(remoteURIs.profile).then((res) => {
        this.state.runSaga(function* getProfile(payload) {
          yield put({ type: SET_PROFILE, payload });
        }, res);
      });
    }
    const cacheRemoteImages = remoteURIs.other.map(remoteImage =>
      AssetUtils.fromUriAsync(remoteImage));
    const cacheLocalImages = localAssets.map(image => AssetUtils.resolveAsync(image));

    return Promise.all([...cacheRemoteImages, ...cacheLocalImages, cacheProfileImage]);
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => {
            this.state.runSaga(function* appLoaded() {
              yield put({ type: APPLICATION_LOADED });
            });
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
