import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scorebar: {
    width: 288,
    height: 277,
    position: 'absolute',
    top: 33,
    left: 0,
  },
  panelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 340,
    paddingVertical: 20,
  },
  scorewheelContainer: {
    width: 300,
    height: 300,
  },
  scorewheel: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mainText: {
    fontFamily: 'Avenir-Light',
    fontSize: 85,
    color: 'black',
    marginVertical: 0,
    paddingVertical: 0,
  },
  smallText: {
    fontFamily: 'Avenir-Light',
    fontSize: 20,
    color: 'black',
    marginVertical: 0,
    paddingVertical: 0,
  },
  textView: {
    width: 300,
    height: 277,
    position: 'absolute',
    top: 23,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
