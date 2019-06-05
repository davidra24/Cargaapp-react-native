import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class DetalleOferta extends Component {
  state = {
    oferta: this.props.navigation.state.params.oferta,
    loading: true,
    error: null,
    position: { lat: 4.6482837, lng: -74.2478938 },
    distance: null,
    key: 'Avj-dfXzcd4uJeJ3EkTxMWpDpa3s_U5EfjlBpgVeCNnStsrM2D8Lme7OYUjPctCa',
    markets: []
  };
  geoFailure = err => {
    this.setState({ error: err.message });
  };
  geoSuccess = position => {
    console.log(position.coords.latitude);
    this.setState({
      ready: true,
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  };
  componentDidMount() {
    console.log(this.state.oferta);
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
    };
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
    this.setState({
      markets: [
        {
          title: 'Ubicación actual',
          description: 'Su ubicación actual',
          coordinates: {
            latitude: this.state.position.lat,
            longitude: this.state.position.lng
          }
        },
        {
          title: 'Ubicación de promoción',
          description: 'Su promoción se encuentra aquí!',
          coordinates: {
            latitude: this.state.oferta.ubicacion._latitude,
            longitude: this.state.oferta.ubicacion._longitude
          }
        }
      ],
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      console.log(this.state.position);

      return (
        <View style={styles.container}>
          <Text>{this.state.oferta.oferta}</Text>
          <Text>{'\n'}</Text>
          <MapView
            /*provider={PROVIDER_GOOGLE} // remove if not using Google Maps*/
            style={styles.map}
            initialRegion={{
              latitude: this.state.oferta.ubicacion._latitude,
              longitude: this.state.oferta.ubicacion._longitude,
              latitudeDelta: 7,
              longitudeDelta: 7
            }}
            /*image={<FontAwesomeIcon icon="fa-map-marker-alt" size={64} />}*/
          >
            {this.state.markets.map(marker => {
              return (
                <Marker title={marker.title} coordinate={marker.coordinates} />
              );
            })}
          </MapView>
          {/**TODO MAP */}
        </View>
      );
    }
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
  input: { width: 250, height: 40, paddingLeft: 6 },
  map: {
    flex: 2,
    ...StyleSheet.absoluteFillObject
  }
});

export default DetalleOferta;
