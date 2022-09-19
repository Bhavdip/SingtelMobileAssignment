import React, { Component } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
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
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 38 : 0
  }
});
export default SingtelApplication;
