import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';
import Amplify from 'aws-amplify';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { addNavigationHelpers } from 'react-navigation';

import config from './aws-exports';
import configureStore from './config/store';
import { WelcomeStack } from './config/routes';

Amplify.configure(config);

EStyleSheet.build({
  $white: '#ffffff',
  $primaryTeal: '#38CECA',
  $primaryOrange: '#f15a24',
  $primaryYellow: '#efb402',
  $keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

const addListener = createReduxBoundAddListener('root');

const App = ({ dispatch, nav }) => (
  <WelcomeStack
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

export default class extends React.Component {
  constructor(props) {
    super(props);

    const { store, persistor } = configureStore();
    this.state = {
      store,
      persistor,
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <PersistGate persistor={this.state.persistor}>
          <AppWithNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
