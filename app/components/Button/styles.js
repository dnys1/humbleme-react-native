import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginVertical: 11,
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
