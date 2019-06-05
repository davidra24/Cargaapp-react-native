import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform
} from 'react-native';
import { ToastAndroid } from 'react-native';
import { checkPermission } from 'react-native-android-permissions';

class OfertaItem extends Component {
  state = {
    oferta: this.props,
    restante: '',
    loading: true,
    distancia: '',
    ubicacion: {
      lat: 4.6630692,
      lng: -74.0786072
    }
  };
  redirect = () => {
    this.props.navigation.navigate('DetalleOferta', {
      oferta: this.props
    });
  };
  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          ubicacion: position
        });
      },
      error => console.log(JSON.stringify(error)),
      { enableHighAccuracy: Platform.OS != 'android', timeout: 2000 }
    );
  };
  changeProm = () => {
    let fecha2 = new Date(this.state.oferta.duracion.seconds * 1000);
    let fecha1 = new Date();
    let resta = fecha2.getTime() - fecha1.getTime();
    this.setState({
      restante: `Quedan ${Math.round(
        resta / (1000 * 60 * 60 * 24)
      )} dias para que acabe la promoción`
    });
  };
  distancia = () => {
    const lat1 = parseInt(this.state.oferta.ubicacion._latitude);
    const lat2 = parseInt(this.state.ubicacion.lat);
    const lon1 = parseInt(this.state.oferta.ubicacion._longitude);
    const lon2 = parseInt(this.state.ubicacion.lng);
    rad = function(x) {
      return (parseInt(x) * Math.PI) / 180;
    };
    const R = 6378.137; //Radio de la tierra en km
    const dLat = rad(lat2 - lat1);
    const dLong = rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat1)) *
        Math.cos(rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    const calculo = d.toFixed(3); //Retorna tres decimales
    this.setState({ distancia: calculo, loading: false });
  };
  calculate(distancia) {
    return 1000 * distancia;
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  componentDidMount() {
    checkPermission('android.permission.ACCESS_FINE_LOCATION').then(
      result => {
        console.log('Already Granted!');
        console.log(result);
      },
      result => {
        console.log('Not Granted!');
        console.log(result);
      }
    );
    this.changeProm();
    this.distancia();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.redirect}>{this.props.oferta}</Text>
        <Text onPress={this.redirect}>{this.state.restante}</Text>
        <Text onPress={this.redirect}>
          Su distancia es de: {this.state.distancia} km es decir el coste es $
          {this.calculate(this.state.distancia)}
        </Text>
        {this.state.loading && <ActivityIndicator />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  separate: {
    height: 30,
    justifyContent: 'center'
  },
  input: { width: 250, height: 40, paddingLeft: 6 }
});

export default OfertaItem;
