import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid
} from 'react-native';
import firebase from 'react-native-firebase';

const BLUE = '#428Af8';
const LIGHT_GRAY = '#D3D3D3';

class Login extends Component {
  state = {
    isFocused: false,
    email: '',
    password: '',
    error: null
  };
  handleLogin = async e => {
    if (this.state.email != null && this.state.password != null) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => {
          this.setState({ error: error.message });
          ToastAndroid.show(this.state.error, ToastAndroid.SHORT);
        });
    }
  };
  handleFocus = e => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };
  handleRegister = e => {
    this.props.navigation.navigate('Signup');
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciar sesión</Text>
        <Text>{'\n'}</Text>
        <TextInput
          placeholder="Email"
          selectionColor={BLUE}
          underlineColorAndroid={this.state.isFocused ? BLUE : LIGHT_GRAY}
          style={styles.input}
          onChangeText={email => this.setState({ email })}
          onFocus={this.handleFocus}
        />
        <Text>{'\n'}</Text>
        <TextInput
          placeholder="Contraseña"
          selectionColor={BLUE}
          secureTextEntry={true}
          underlineColorAndroid={this.state.isFocused ? BLUE : LIGHT_GRAY}
          style={styles.input}
          onChangeText={password => this.setState({ password })}
          onFocus={this.handleFocus}
        />
        <Text>{'\n'}</Text>
        <Button onPress={this.handleLogin} title="Ingresar" />
        <Text>{'\n'}</Text>
        <Text style={styles.blue_text} onPress={this.handleRegister}>
          Registrarse
        </Text>
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
  input: { width: 250, height: 40, paddingLeft: 6 },
  blue_text: {
    color: '#2a9df4'
  }
});

export default Login;
