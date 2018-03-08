import { Auth } from 'aws-amplify';

export const UPDATE_TEMP_LOGIN_USERNAME = 'UPDATE_TEMP_LOGIN_USERNAME';
export const UPDATE_TEMP_LOGIN_PASSWORD = 'UPDATE_TEMP_LOGIN_PASSWORD';
export const UPDATE_TEMP_SIGNUP_NAME = 'UPDATE_TEMP_SIGNUP_NAME';
export const UPDATE_TEMP_SIGNUP_USERNAME = 'UPDATE_TEMP_SIGNUP_USERNAME';
export const UPDATE_TEMP_SIGNUP_PASSWORD = 'UPDATE_TEMP_SIGNUP_PASSWORD';
export const UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE = 'UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE';
export const UPDATE_TEMP_SIGNUP_EMAIL = 'UPDATE_TEMP_SIGNUP_EMAIL';
export const UPDATE_TEMP_SIGNUP_PHONE_NUMBER = 'UPDATE_TEMP_SIGNUP_PHONE_NUMBER';
export const UPDATE_TEMP_SIGNUP_TFA_CODE = 'UPDATE_TEMP_SIGNUP_TFA_CODE';

export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN';
export const CONFIRM_LOGIN_SUCCESS = 'CONFIRM_LOGIN_SUCCESS';
export const CONFIRM_LOGIN_FAILURE = 'CONFIRM_LOGIN_FAILURE';

export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const CONFIRM_SIGNUP = 'CONFIRM_SIGNUP';
export const CONFIRM_SIGNUP_SUCCESS = 'CONFIRM_SIGNUP_SUCCESS';
export const CONFIRM_SIGNUP_FAILURE = 'CONFIRM_SIGNUP_FAILURE';

export const RESEND_SIGNUP = 'RESEND_SIGNUP';
export const RESEND_SIGNUP_SUCCESS = 'RESEND_SIGNUP_SUCCESS';
export const RESEND_SIGNUP_FAILURE = 'RESEND_SIGNUP_FAILURE';

export const SHOW_LOGIN_CONFIRMATION_MODAL = 'SHOW_LOGIN_CONFIRMATION_MODAL';
export const SHOW_SIGNUP_CONFIRMATION_MODAL = 'SHOW_SIGNUP_CONFIRMATION_MODAL';
export const SHOW_LOGIN_SCREEN = 'SHOW_LOGIN_SCREEN';
export const SHOW_LOGGED_IN_SCREEN = 'SHOW_LOGGED_IN_SCREEN';

export const updateTempLoginUserName = username => ({
  type: UPDATE_TEMP_LOGIN_USERNAME,
  username,
});

export const updateTempLoginPassword = password => ({
  type: UPDATE_TEMP_LOGIN_PASSWORD,
  password,
});

export const updateTempSignupName = name => ({
  type: UPDATE_TEMP_SIGNUP_NAME,
  name,
});

export const updateTempSignupUserName = username => ({
  type: UPDATE_TEMP_SIGNUP_USERNAME,
  username,
});

export const updateTempSignupEmail = email => ({
  type: UPDATE_TEMP_SIGNUP_EMAIL,
  email,
});

export const updateTempSignupPassword = password => ({
  type: UPDATE_TEMP_SIGNUP_PASSWORD,
  password,
});

export const updateTempSignupPasswordRetype = passwordRetype => ({
  type: UPDATE_TEMP_SIGNUP_PASSWORD_RETYPE,
  passwordRetype,
});

export const updateTempSignupPhoneNumber = phone_number => ({
  type: UPDATE_TEMP_SIGNUP_PHONE_NUMBER,
  phone_number,
});

export const updateTempTFACode = TFACode => ({
  type: UPDATE_TEMP_SIGNUP_TFA_CODE,
  TFACode,
});

export const showSignupConfirmationModal = resend => ({
  type: SHOW_SIGNUP_CONFIRMATION_MODAL,
  resend,
});

export const showLoginConfirmationModal = () => ({
  type: SHOW_LOGIN_CONFIRMATION_MODAL,
});

const resendSignUp = () => ({
  type: RESEND_SIGNUP,
});

const resendSignUpSuccess = () => ({
  type: RESEND_SIGNUP_SUCCESS,
});

const resendSignUpFailure = err => ({
  type: RESEND_SIGNUP_FAILURE,
  err,
});

export const handleResendSignUp = username => (dispatch) => {
  dispatch(resendSignUp());
  Auth.resendSignUp(username)
    .then((res) => {
      console.log(res);
      dispatch(resendSignUpSuccess());
      dispatch(showSignupConfirmationModal(true));
    })
    .catch((err) => {
      dispatch(resendSignUpFailure(err));
      console.log(err);
    });
};

const logIn = () => ({
  type: LOG_IN,
});

const logInSuccess = user => ({
  type: LOG_IN_SUCCESS,
  user,
});

const logInFailure = err => ({
  type: LOG_IN_FAILURE,
  err,
});

export const handleLogIn = (username, password) => (dispatch) => {
  dispatch(logIn());
  Auth.signIn(username, password)
    .then((user) => {
      dispatch(logInSuccess(user));
      dispatch(showLoginConfirmationModal());
    })
    .catch((err) => {
      dispatch(logInFailure(err));
      if (err.code === 'UserNotConfirmedException') {
        dispatch(handleResendSignUp(username));
      } else if (err.code === 'UserNotFoundException') {
        // setTimeout(Alert.alert('Error', 'Username not found.'), 50);
      }
    });
};

const logOut = () => ({
  type: LOG_OUT,
});

const logOutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});

const logOutFailure = err => ({
  type: LOG_OUT_FAILURE,
  err,
});

export const handleLogOut = () => (dispatch) => {
  dispatch(logOut());
  Auth.signOut()
    .then(() => dispatch(logOutSuccess()))
    .catch((err) => {
      dispatch(logOutFailure(err));
      console.log(err);
    });
};

const signUp = () => ({
  type: SIGN_UP,
});

const signUpSuccess = () => ({
  type: SIGN_UP_SUCCESS,
});

const signUpFailure = err => ({
  type: SIGN_UP_FAILURE,
  err,
});

export const handleSignUp = (username, email, password, phone_number) => (dispatch) => {
  dispatch(signUp());
  Auth.signUp({
    username,
    password,
    attributes: {
      phone_number,
      email,
    },
  })
    .then((res) => {
      console.log('successful signup!: ', res);
      dispatch(signUpSuccess());
      dispatch(showSignupConfirmationModal(false));
    })
    .catch((err) => {
      dispatch(signUpFailure(err));
      if (err.code === 'InvalidPasswordException') {
        // setTimeout(
        //   () =>
        //     Alert.alert(
        //       'Password error',
        //       'Password must be 8 characters long and contain:\n-
        //        uppercase letters\n- lowercase letters\n- special characters\n- numbers',
        //     ),
        //   50,
        // );
      } else if (err.code === 'UsernameExistsException') {
        // setTimeout(
        //   () =>
        //     Alert.alert(
        //       'Signup error',
        //       "Username already exists. If you've already signed up, please use the Login page.",
        //     ),
        //   50,
        // );
      }
      console.log('error signing up: ', err);
    });
};

const confirmSignup = () => ({
  type: CONFIRM_SIGNUP,
});

const confirmSignupSuccess = () => ({
  type: CONFIRM_SIGNUP_SUCCESS,
});

const confirmSignupFailure = () => ({
  type: CONFIRM_SIGNUP_FAILURE,
});

const showLoginScreen = () => ({
  type: SHOW_LOGIN_SCREEN,
});

const showLoggedInScreen = () => ({
  type: SHOW_LOGGED_IN_SCREEN,
});

export const handleConfirmSignup = (username, password, TFACode, resend) => (dispatch) => {
  dispatch(confirmSignup());
  Auth.confirmSignUp(username, TFACode)
    .then((res) => {
      dispatch(confirmSignupSuccess());
      // setTimeout(
      //   () =>
      //     Alert.alert(
      //       'Success!',
      //       'Your account has been created! Please login to complete registration.',
      //     ),
      //   50,
      // );
      if (resend) {
        dispatch(handleLogIn(username, password));
      } else {
        dispatch(showLoginScreen());
      }
      console.log('successful confirmation: ', res);
    })
    .catch((err) => {
      dispatch(confirmSignupFailure(err));
      // setTimeout(
      //   () =>
      //     Alert.alert('Error', 'There was an error in verifying your number. Please try again.'),
      //   50,
      // );
      console.log('error confirming user: ', err);
    });
};

const confirmLogin = () => ({
  type: CONFIRM_LOGIN,
});

const confirmLoginSuccess = () => ({
  type: CONFIRM_LOGIN_SUCCESS,
});

const confirmLoginFailure = err => ({
  type: CONFIRM_LOGIN_FAILURE,
  err,
});

export const handleConfirmLogin = (user, TFACode) => (dispatch) => {
  dispatch(confirmLogin());
  Auth.confirmSignIn(user, TFACode)
    .then(() => {
      // setTimeout(() => Alert.alert('Success', "You're logged in!"), 50);
      dispatch(confirmLoginSuccess());
      dispatch(showLoggedInScreen());
    })
    .catch((err) => {
      dispatch(confirmLoginFailure(err));
      // setTimeout(() => Alert.alert('Error', 'Please try entering the number again.'), 50);
      console.log('error confirming sign in: ', err);
    });
};
