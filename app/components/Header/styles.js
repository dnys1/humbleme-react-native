import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningIcon: {
    borderWidth: 1,
    fontSize: 30,
    borderRadius: 5,
    padding: 2,
    marginHorizontal: 10,
    color: '$primaryYellow',
    borderColor: '$primaryYellow',
  },
  warningText: {
    color: '$primaryYellow',
    fontSize: 23,
    fontWeight: '600',
  },
});
