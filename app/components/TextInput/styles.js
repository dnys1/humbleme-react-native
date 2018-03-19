import EStyleSheet from 'react-native-extended-stylesheet';

const INPUT_HEIGHT = 48;

export default EStyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    width: '75%',
    height: INPUT_HEIGHT,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '$white',
  },
  input: {
    fontSize: 20,
    color: '$white',
  },
  inputLayout: {
    margin: 8,
  },
  textInput: {
    fontSize: 16,
    color: '$white',
    height: 40,
    width: '75%',
  },
});
