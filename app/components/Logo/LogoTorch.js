import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { torchHeight, torchWidth } from './img/sizes';
import styles from './styles';

const LogoTorch = ({ scale = 0.1 }) => {
  const scaleFloat = parseFloat(scale);
  const width = Dimensions.get('window').width * scaleFloat;
  const height = Math.round(width * (torchHeight / torchWidth));
  const torchStyles = { width, height };

  return (
    <View style={styles.torchContainer}>
      <Image source={require('./img/torch.png')} style={torchStyles} />
    </View>
  );
};

LogoTorch.propTypes = {
  scale: PropTypes.number,
};

export default LogoTorch;
