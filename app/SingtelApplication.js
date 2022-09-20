import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import CardGame from './feature/card-game';

class SingtelApplication extends Component {
  render() {
    return (
      <View style={styles.sectionContainer}>
        <CardGame />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  }
});
export default SingtelApplication;
