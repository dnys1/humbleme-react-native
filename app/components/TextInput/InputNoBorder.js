import React from 'react';
import { View, TextInput } from 'react-native';
import { TextInputLayout } from 'rn-textinputlayout';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import styles from './styles';

const estyles = EStyleSheet.create({
  $blue: '$primaryNavy',
});

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
      <View style={{ width: '80%' }}>
        <TextInputLayout style={styles.inputLayout} hintColor="white" focusColor={estyles.$blue}>
          <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={styles.textInput}
            placeholderTextColor="#fff"
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCorrect={autoCorrect}
            clearButtonMode="unless-editing"
            ref={(input) => {
              this.textInput = input;
            }}
            underlineColorAndroid="transparent"
          />
        </TextInputLayout>
      </View>
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
