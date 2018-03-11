import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { logoWidth, logoHeight } from './img/sizes';

const WhiteLogo = ({ scale, style }) => {
  const logoStyles = [styles.logo];
  if (scale) {
    const scaleFloat = parseFloat(scale);
    const width = Dimensions.get('window').width * scaleFloat;
    const height = Math.round(width * (logoHeight / logoWidth));
    logoStyles.push({ width, height });
  }
  if (style) {
    logoStyles.push(style);
  }
  return (
    <View style={styles.logoContainer}>
      <Image source={require('../../assets/logo_white.png')} style={logoStyles} />
    </View>
  );
};

WhiteLogo.propTypes = {
  scale: PropTypes.number,
  style: PropTypes.object,
};

export default WhiteLogo;
