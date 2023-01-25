import { getData, postData } from '../api/Services';
import Login from '../components/Login';
import { encryptPassword, validatePassword } from '../HashPassword';

export const SignupAction = (data, history) => async (dispatch) => {
  const { data: signupData } = await getData('users/', data);

  const user = signupData.find((d) => d.email === data.email);

  if (user) {
    alert('User Already Exists');
  } else {
    let { phNo, ...rest } = data;
    phNo = encryptPassword(phNo);
    let values = { ...rest, phNo };
    await postData('users/', values);
    history('/login');
  }
};

export const loginAction = (values, history) => async (dispatch) => {
  const { data: loginData } = await getData('users/');

  const user = loginData.find((d) => d.email === values.email);
  if (!user) {
    alert("User Doesn't Exist");
  } else {
    if (validatePassword(user.phNo, values.pswd)) {
      sessionStorage.setItem(
        'user',
        JSON.stringify({ currentUser: user.email, status: true })
      );
      dispatch({
        type: 'LOGIN',
        payload: { currentUser: user.email, status: true },
      });
      history('/');
      history('/banner')
    } else {
      alert('login failed');
    }
  }
};


export const logoutAction = () => async (dispatch) => {
    await sessionStorage.removeItem('user');
    dispatch({ type: 'LOGIN', payload: null });
  };
