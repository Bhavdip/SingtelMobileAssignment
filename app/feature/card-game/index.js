import React, { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Component } from 'react';
import { Colors } from '@theme/colors';
import { AppConstants } from '@constants';
import { sprintf } from '@helper/utilites';
import { Spacing } from '@theme';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardView from '../../components/cardview';
import HeaderSection from '../../components/header-section';
import { saveSteps, reqForGenerateCards, restartGame, sendDataToMatch } from '../reudx/actions';

class CardGame extends Component {
  restartGame = () => {
    this.props.restartGame();
  };

  componentDidMount() {
    this.props.reqForGenerateCards();
  }

  renderGameCads = ({ item, index }) => {
    const { resolvedData, isBlocked } = this.props;
    return (
      <CardView
        key={`cardId_${index}`}
        cardId={index}
        cardNumber={item}
        isBlocked={isBlocked}
        isResolved={resolvedData[index]}
        onPressCard={cardData => {
          this.handleClick(cardData);
        }}
      />
    );
  };

  renderGamePods = () => {
    const { shuffledData } = this.props;
    if (shuffledData && shuffledData.length > 0) {
      return (
        <FlatList
          numColumns={AppConstants.GAMEPAD_COLUMNS}
          data={shuffledData}
          contentContainerStyle={{ marginHorizontal: Spacing.x8 }}
          renderItem={this.renderGameCads}
          extraData={this.props}
        />
      );
    }
    return null;
  };

  displayGameOverMsg = () => {
    const { stepsCount } = this.props;
    const msgBody = sprintf(AppConstants.MESSAGE, [stepsCount]);
    const btnOptions = [
      {
        text: AppConstants.CTA_TITLE,
        styles: 'cancel',
        onPress: () => {
          this.restartGame();
        }
      }
    ];
    Alert.alert(AppConstants.TITLE, msgBody, btnOptions, { cancelable: true });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.isGameOver && this.props.isGameOver) {
      this.displayGameOverMsg();
    }
  }

  render() {
    const { stepsCount } = this.props;
    return (
      <View style={styles.sectionContainer}>
        <HeaderSection stepsCount={stepsCount} onRestartPress={() => this.restartGame()} />
        {this.renderGamePods()}
      </View>
    );
  }

  handleClick = cardData => {
    this.props.sendDataToMatch(cardData);
  };
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Colors.WINDOW_BACKGROUND_COLOR
  }
});

CardGame.propTypes = {
  isGameOver: PropTypes.bool,
  isBlocked: PropTypes.bool,
  restartGame: PropTypes.func,
  stepsCount: PropTypes.number,
  sendDataToMatch: PropTypes.func,
  resolvedData: PropTypes.array,
  shuffledData: PropTypes.array,
  reqForGenerateCards: PropTypes.func
};

function mapStateToProps(globalState) {
  return {
    stepsCount: globalState.appReducer.stepsCount,
    shuffledData: globalState.appReducer.shuffledData,
    resolvedData: globalState.appReducer.resolvedData,
    isBlocked: globalState.appReducer.isBlocked,
    isGameOver: globalState.appReducer.isGameOver
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveStepsCount: value => dispatch(saveSteps(value)),
    restartGame: () => dispatch(restartGame()),
    reqForGenerateCards: () => dispatch(reqForGenerateCards()),
    sendDataToMatch: cardData => dispatch(sendDataToMatch(cardData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
