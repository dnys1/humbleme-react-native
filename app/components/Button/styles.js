import EStyleSheet from 'react-native-extended-stylesheet';

const BORDER_RADIUS = 4;

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
  warningIcon: {
    borderWidth: 1,
    fontSize: 30,
    borderRadius: 5,
    padding: 2,
    color: '$primaryYellow',
    borderColor: '$primaryYellow',
  },
});
