/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flows
 */

import Login from './src/views/Session/Login';
import Signup from './src/views/Session/Signup';
import Loading from './src/views/load/Loading';
import Main from './src/views/Main';
import DetalleOferta from './src/views/detalleOferta/DetalleOferta';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faMapMarkerAlt);
const AppNavigator = createStackNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Iniciar Sesión',
      header: null
    }
  },
  Signup,
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'Cargapp',
      header: null
    }
  },
  DetalleOferta: {
    screen: DetalleOferta
  }
});

export default createAppContainer(AppNavigator);
