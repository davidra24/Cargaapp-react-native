import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Ofertas from './ofertas/Ofertas';
import Profile from './profile/Profile';
import DetalleOferta from './detalleOferta/DetalleOferta';
import Icon from '../components/icon/Icon';

class Main extends Component {
  constructor(props) {
    super(props);
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Ofertas: {
      screen: Ofertas,
      navigationOptions: {
        title: 'Ofertas',
        tabBarIcon: <Icon icon="🏠" />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil',
        tabBarIcon: <Icon icon="🛸" />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      activeBackgroundColor: '#004386'
    }
  }
);

export default TabNavigator;
