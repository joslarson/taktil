import React from 'react';

export const useButtonCallbacks = (
  isPressed: boolean,
  {
    onPress,
    onLongPress,
    onDoublePress,
    onRelease,
    onDoubleRelease,
  }: {
    onPress?: () => void;
    onLongPress?: () => void;
    onDoublePress?: () => void;
    onRelease?: () => void;
    onDoubleRelease?: () => void;
  }
) => {
  const timeoutsRef = React.useRef({
    longPress: 0,
    recentPress: 0,
    recentRelease: 0,
  });
  const [recentlyPressed, setRecentlyPressed] = React.useState(false);
  const [recentlyReleased, setRecentlyReleased] = React.useState(false);
  const [hasBeenPressed, setHasBeenPressed] = React.useState(false);

  React.useEffect(() => {
    isPressed
      ? recentlyPressed
        ? onDoublePress
          ? onDoublePress()
          : onPress && onPress()
        : onPress && onPress()
      : recentlyReleased
      ? onDoubleRelease
        ? onDoubleRelease()
        : onRelease && onRelease()
      : hasBeenPressed && onRelease && onRelease();

    clearTimeout(timeoutsRef.current.longPress);

    if (isPressed) {
      if (!hasBeenPressed) setHasBeenPressed(true);

      timeoutsRef.current.longPress = setTimeout(() => {
        onLongPress && onLongPress();
      }, 500);

      setRecentlyPressed(true);
      clearTimeout(timeoutsRef.current.recentPress);
      timeoutsRef.current.recentPress = setTimeout(() => {
        setRecentlyPressed(false);
      }, 250);
    } else {
      setRecentlyReleased(true);
      clearTimeout(timeoutsRef.current.recentRelease);
      timeoutsRef.current.recentRelease = setTimeout(() => {
        setRecentlyReleased(false);
      }, 250);
    }
  }, [isPressed]);
};
