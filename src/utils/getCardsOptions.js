function getCardsOptions(windowWidth) {
  let cardsOptions = {};
  if (windowWidth > 1000) {
    cardsOptions = {
      count: 12,
      countInRow: 3,
      countAddMore: 3
    };
    // console.log('>1000');
  } else if (windowWidth > 600) {
    cardsOptions = {
      count: 8,
      countInRow: 2,
      countAddMore: 2
    };
    // console.log('>600');
  } else {
    cardsOptions = {
      count: 5,
      countInRow: 1,
      countAddMore: 2
    };
    // console.log('default');
  }
  return cardsOptions;
}

export default getCardsOptions;