import React, { FlatList, StyleSheet, View } from 'react-native';
import { Component } from 'react';
import { Colors } from '@theme/colors';
import { AppConstants } from '@constants';
import CardView from '../../components/cardview';

class CardGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resolvedCards: Array(AppConstants.CARD_PAIRS_VALUE * 2).fill(false),
      shuffledCard: [],
      clickCount: 1,
      isBlocked: false,
      prevSelectedCard: -1,
      prevCardId: -1
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
    const { resolvedCards, isBlocked } = this.state;
    // console.log(`element${JSON.stringify(item)}`);
    return (
      <CardView
        key={`cardId_${index}`}
        cardId={index}
        cardNumber={item}
        isBlocked={isBlocked}
        isResolved={resolvedCards[index]}
        onPressCard={cardData => {
          this.handleClick(cardData);
        }}
      />
    );
  };

  renderGamePods = () => {
    const { shuffledCard } = this.state;
    if (shuffledCard && shuffledCard.length > 0) {
      return (
        <FlatList
          numColumns={AppConstants.GAMEPAD_COLUMNS}
          data={shuffledCard}
          renderItem={this.renderGameCads}
          extraData={this.state}
        />
      );
    }
    return null;
  };

  render() {
    return <View style={styles.sectionContainer}>{this.renderGamePods()}</View>;
  }

  handleClick = cardData => {
    const { resolvedCards, shuffledCard, clickCount, isBlocked } = this.state;
    const { cardId } = cardData;
    const nwFlipCards = resolvedCards.slice();
    if (nwFlipCards[cardId] === false) {
      nwFlipCards[cardId] = !nwFlipCards[cardId];
    }
    if (clickCount === 1) {
      console.log(
        `[handleClick]<==${clickCount}-Click\t\t[CardId]=${cardData.cardId},[cardNumber]=${cardData.cardNumber}`
      );
      this.setState({
        prevCardId: cardId,
        prevSelectedCard: shuffledCard[cardId]
      });
      this.setState({ resolvedCards: nwFlipCards, clickCount: 2 }, () => {
        console.log(`set=>=>[A.Click Count]=${this.state.clickCount}`);
      });
    } else if (clickCount === 2 && !isBlocked) {
      console.log(
        `[handleClick]<==${clickCount}-Click,\t\t[CardId]=${cardData.cardId},[cardNumber]=${cardData.cardNumber}`
      );
      this.setState({ resolvedCards: nwFlipCards, isBlocked: true }, () => {
        console.log(`set=>=>[Blocked]=${this.state.isBlocked}`);
      });
      const { prevCardId } = this.state;
      const previousCardNum = this.state.prevSelectedCard;
      const newCardNum = this.state.shuffledCard[cardId];
      this.isCardMatch(previousCardNum, newCardNum, prevCardId, cardId);
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    console.log(
      `isCardMatch:[card1]:${card1},[card2]=${card2},\t[card1Id]:${card1Id},[card2Id]=${card2Id}`
    );
    if (card1 === card2) {
      const reviledCards = this.state.resolvedCards.slice();
      reviledCards[card1Id] = true;
      reviledCards[card2Id] = true;
      console.log(`[CardGame]: Matched\n${JSON.stringify(reviledCards)}`);
      this.setState({ resolvedCards: reviledCards, clickCount: 1, isBlocked: false }, () => {
        console.log(`set=>=>[B.Click Count, Blocked ]=${this.state.clickCount}`);
      });
    } else {
      const flipBack = this.state.resolvedCards.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      console.log(`[CardGame]: Not Matched\n${JSON.stringify(flipBack)}`);
      this.setState({ resolvedCards: flipBack, clickCount: 1, isBlocked: false }, () => {
        console.log(`set=>=>[B.Click Count, Blocked]=${this.state.clickCount}`);
      });
    }
  };
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Colors.WINDOW_BACKGROUND_COLOR
  }
});

export default CardGame;
