import {changeTheme} from '../reducers/appSettings';
import store from '../store';
import {storeData} from '../../utils/helperFunctions';
const {dispatch} = store;

export const changeAppTheme = data => {
  storeData('app_theme', data)
    .then(res => {
      dispatch(changeTheme(data));
    })
    .catch(err => {
      console.log('error during store theme data', err);
    });
};
