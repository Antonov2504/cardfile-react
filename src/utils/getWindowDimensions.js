function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height, pageYOffset } = window;
  const { scrollHeight } = document.body;
  return {
    width,
    height,
    pageYOffset,
    scrollHeight,
  }
}

export default getWindowDimensions;