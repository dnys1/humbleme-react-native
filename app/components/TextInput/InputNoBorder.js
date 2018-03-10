import React from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

class InputNoBorder extends React.Component {
  focusTextInput = () => {
    this.textInput.focus();
  };

  render() {
    const {
      placeholder,
      onChangeText,
      autoCapitalize,
      keyboardType,
      secureTextEntry,
      autoCorrect,
    } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={this.focusTextInput}
        hitSlop={{
          top: 10,
          left: 10,
          bottom: 10,
          right: 10,
        }}
      >
        <View style={styles.container}>
          <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={styles.input}
            placeholderTextColor="#fff"
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCorrect={autoCorrect}
            clearButtonMode="unless-editing"
            ref={(input) => {
              this.textInput = input;
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

InputNoBorder.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  keyboardType: PropTypes.oneOf([
    'default',
    'numeric',
    'email-address',
    'phone-pad',
    'ascii-capable',
    'numbers-and-punctuation',
    'url',
    'number-pad',
    'name-phone-pad',
    'decimal-pad',
    'twitter',
    'web-search',
    'visible-password',
  ]),
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
};

InputNoBorder.defaultProps = {
  autoCapitalize: 'sentences',
  keyboardType: 'default',
  secureTextEntry: false,
  autoCorrect: false,
};

export default InputNoBorder;
