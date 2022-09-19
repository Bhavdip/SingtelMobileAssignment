import React, { FlatList, StyleSheet, View } from 'react-native';
import { Component } from 'react';
import { Colors } from '@theme/colors';
import { AppConstants } from '@constants';
import CardView from '../../components/cardview';

class CardGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flopCards: Array(16).fill(false),
      shuffledCard: []
    };
  }

  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    // The maximum is inclusive and the minimum is inclusive
  };

  shuffle = array => {
    let randomIndex;
    for (let currentIndex = array.length - 1; currentIndex >= 0; currentIndex--) {
      if (currentIndex > 2) {
        randomIndex = this.getRandomIntInclusive(0, currentIndex - 2);
        console.log(currentIndex, randomIndex, array[currentIndex], array[randomIndex]);
        while (array[currentIndex] === array[randomIndex]) {
          console.log(`inside while ${randomIndex}`);
          randomIndex = this.getRandomIntInclusive(0, currentIndex - 2);
          console.log(`after while ${randomIndex}`);
        }
        if (array[currentIndex] !== array[randomIndex]) {
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      } else {
        console.log(`inside else ${currentIndex}`);
        randomIndex = this.getRandomIntInclusive(0, currentIndex);
        console.log(currentIndex, randomIndex, array[currentIndex], array[randomIndex]);
        if (array[currentIndex] !== array[randomIndex]) {
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      }
    }
    return array;
  };

  generateNumbers = () => {
    const array1 = [];
    let currentIndex = 0;
    while (currentIndex < AppConstants.CARD_PAIRS_VALUE) {
      const item = this.getRandomIntInclusive(1, 100);
      if (array1.indexOf(item) === -1) {
        array1.push(item);
        currentIndex++;
      }
    }
    return array1;
  };

  generateParisOfNum = () => {
    const initialValue = [];
    const listOfPairs = this.generateNumbers().reduce((previousValue, currentValue) => {
      return previousValue.concat([currentValue, currentValue]);
    }, initialValue);
    const resultShuffled = this.shuffle(listOfPairs).slice();
    this.setState({ shuffledCard: resultShuffled });
  };

  componentDidMount() {
    this.generateParisOfNum();
  }

  renderGameCads = ({ item, index }) => {
    console.log(`element${JSON.stringify(item)}`);
    return <CardView key={`cardId_${index}`} cardNumber={item} />;
  };

  renderGamePods = () => {
    const { shuffledCard } = this.state;
    if (shuffledCard && shuffledCard.length > 0) {
      return (
        <FlatList
          numColumns={AppConstants.GAMEPAD_COLUMNS}
          data={shuffledCard}
          renderItem={this.renderGameCads}
        />
      );
    }
    return null;
  };

  render() {
    return <View style={styles.sectionContainer}>{this.renderGamePods()}</View>;
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Colors.WINDOW_BACKGROUND_COLOR
  }
});

export default CardGame;
