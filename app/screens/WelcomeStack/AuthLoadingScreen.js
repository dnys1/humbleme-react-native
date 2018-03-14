import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$primaryTeal',
  },
});

class AuthLoadingScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const navApp = () => this.props.navigation.navigate('App');
    const navAuth = () => this.props.navigation.navigate('Auth');

    await Auth.currentSession().then(navApp, navAuth);
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
