import EStyleSheet from 'react-native-extended-stylesheet';

const BORDER_RADIUS = 3;

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 11,
    borderRadius: BORDER_RADIUS,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: '$white',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 20,
    paddingRight: 15,
  },
});
