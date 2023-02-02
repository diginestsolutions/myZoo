import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export const getCurrentRoute = () => {
  if (navigationRef.isReady()) {
    const route = navigationRef.getCurrentRoute();
    return route;
  }
};