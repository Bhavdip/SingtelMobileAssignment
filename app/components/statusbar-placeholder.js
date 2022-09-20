import React from 'react';
import { StyleSheet, StatusBar, View, Platform } from 'react-native';
import { Colors } from '@theme';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const StatusbarPlaceholder = () => {
  return (
    <View style={styles.statusBarStyle}>
      <StatusBar translucent barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarStyle: {
    width: '100%',
    height: STATUS_BAR_HEIGHT,
    backgroundColor: Colors.WINDOW_BACKGROUND_COLOR
  }
});

export default StatusbarPlaceholder;
