import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'react-native-firebase';

class Profile extends Component {
  handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate('Auth');
    } catch (e) {
      console.log(e);
    }
  };
  state = { currentUser: null };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Perfil de usuario</Text>
        <Button onPress={this.handleLogout} title="Cerrar sesión" />
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

export default Profile;
