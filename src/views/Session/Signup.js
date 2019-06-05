import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

const BLUE = '#428Af8';
const LIGHT_GRAY = '#D3D3D3';

class Singup extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isFocused: false,
    nombre: '',
    correo: '',
    clave: '',
    error: null,
    loading: false
  };
  handleFocus = e => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };
  handleSingUp = e => {
    if (this.state.correo != null && this.state.clave != null) {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.correo, this.state.clave)
          .then(() => this.props.navigation.navigate('Main'))
          .catch(error => {
            this.setState({ error: error.message });
          });
      } catch (error) {}
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Registro...</Text>
        <Text>{'\n'}</Text>
        <Text>Correo: </Text>
        <TextInput
          placeholder="Correo"
          selectionColor={BLUE}
          underlineColorAndroid={this.state.isFocused ? BLUE : LIGHT_GRAY}
          style={styles.input}
          onChangeText={correo => this.setState({ correo })}
          onFocus={this.handleFocus}
        />
        <Text>{'\n'}</Text>
        <Text>Contraseña: </Text>
        <TextInput
          placeholder="Contraseña"
          selectionColor={BLUE}
          secureTextEntry={true}
          underlineColorAndroid={this.state.isFocused ? BLUE : LIGHT_GRAY}
          style={styles.input}
          onChangeText={clave => this.setState({ clave })}
          onFocus={this.handleFocus}
        />
        <Text>{'\n'}</Text>
        <Button onPress={this.handleSingUp} title="Registrar" />
        <Text>{'\n'}</Text>
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

export default Singup;
