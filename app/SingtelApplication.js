import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';

class SingtelApplication extends Component {
  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text>Singtel Application</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 38 : 0,
  },
});
export default SingtelApplication;
