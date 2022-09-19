import React, { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Spacing, Colors } from '@theme';
import PropTypes from 'prop-types';
import StatusbarPlaceholder from './statusbar-placeholder';

const HeaderSection = props => {
  return (
    <View>
      <StatusbarPlaceholder />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            }
          }}>
          <Text style={styles.restartTextStyle}>Restart</Text>
        </TouchableOpacity>
        <View style={styles.stepsContainer}>
          <Text style={styles.stepTitleStyle}>STEPS:</Text>
          <Text style={styles.stepValueStyle}>12</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    flexDirection: 'row',
    padding: Spacing.x18,
    alignItems: 'center'
  },
  stepsContainer: {
    top: Spacing.x8,
    right: Spacing.x16,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: 'red'
  },
  stepTitleStyle: {
    fontSize: 30,
    color: Colors.Shades.COLOR_WHITE
  },
  stepValueStyle: {
    fontSize: 38,
    color: Colors.Shades.COLOR_BLUE
  },
  restartTextStyle: {
    fontSize: 20,
    color: Colors.Shades.COLOR_BLUE
  }
});

HeaderSection.propTypes = {
  onPress: PropTypes.func
};

export default HeaderSection;
