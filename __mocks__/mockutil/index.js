import { Platform, I18nManager } from 'react-native';

export const findComponentByID = (shallowWrapperCompt, findComponent, componentTestID) => {
  const foundComponent = shallowWrapperCompt.find(findComponent).findWhere(element => {
    if (element.props().testID === componentTestID) {
      // console.log(element.props());
      return element;
    }
    return null;
  });
  return foundComponent;
};

// Ref: https://stackoverflow.com/questions/43161416/mocking-platform-detection-in-jest-and-react-native
// https://www.codepile.net/pile/Yr5DkK4n
export const setPlatform = platform => {
  if (platform === 'android' || platform === 'ios') {
    Object.defineProperty(Platform, 'OS', {
      get: jest.fn(() => platform)
    });
  }
};

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
export const setI18nManager = isRTLValue => {
  Object.defineProperty(I18nManager, 'isRTL', { value: isRTLValue, writable: true });
};
