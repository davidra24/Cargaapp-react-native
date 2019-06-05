import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import { ToastAndroid } from 'react-native';
import OfertaItem from './OfertaItem';
import Separador from './Separador';

class Ofertas extends Component {
  state = {
    ref: firebase.firestore().collection('ofertas'),
    unsubscribe: '',
    ofertas: [],
    loading: true,
    error: null
  };
  onCollectionUpdate = querySnapshot => {
    const ofertas = [];
    querySnapshot.forEach(doc => {
      const { oferta, duracion, ubicacion } = doc.data();
      ofertas.push({
        key: doc.id,
        doc, // DocumentSnapshot
        oferta,
        duracion,
        ubicacion
      });
    });

    this.setState({
      ofertas: ofertas,
      loading: false
    });
  };
  componentDidMount() {
    this.state.ref.onSnapshot(this.onCollectionUpdate);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  renderSeparator = () => <Separador />;
  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.ofertas}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <OfertaItem {...item} navigation={this.props.navigation} />
          )}
        />
        {/*this.state.ofertas.map(oferta => {
          ToastAndroid.show(oferta.oferta, ToastAndroid.SHORT);
        })*/}
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
  input: { width: 250, height: 40, paddingLeft: 6 }
});

export default Ofertas;
