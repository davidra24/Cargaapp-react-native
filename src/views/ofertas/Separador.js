import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Separador(props) {
  return <View style={styles.separador} />;
}

const styles = StyleSheet.create({
  separador: {
    borderTopWidth: 2,
    borderTopColor: '#eaeaea'
  }
});

export default Separador;
