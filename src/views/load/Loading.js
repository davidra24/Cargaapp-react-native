import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import firebase from 'react-native-firebase';
export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const goto = user ? 'Main' : 'Login';
      this.props.navigation.navigate(goto);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Cargando</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
