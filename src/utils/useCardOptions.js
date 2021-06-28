import { useState, useEffect } from 'react';
import getWindowDimensions from './getWindowDimensions';
import getCardsOptions from './getCardsOptions';

function useCardsOptions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [cardsOptions, setCardsOptions] = useState(getCardsOptions(windowDimensions.width));


  useEffect(() => {
    function handleResize() {
      console.log('handleResize');
      setWindowDimensions(getWindowDimensions());
      setCardsOptions(getCardsOptions(windowDimensions.width));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return cardsOptions;
}

export default useCardsOptions;