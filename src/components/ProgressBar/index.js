import React, { useCallback, useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

const ProgressBar = props => {
  let {
    progressValue,
    maxValue,
    backgroundColor,
    progressColor,
    animationSpeed,
    animationBounciness,
    rounding,
    borderWidth,
    borderColor,
    _height: height,
    _width,
    direction,
    editor,
  } = props
  const animationDuration = 100
  let innerBorderStyle = {}
  let animation = useRef(new Animated.Value(0))
  let width
  let innerHeight
  let flexDirection

  //Set default values if the editor input is invalid
  if (!progressValue) {
    progressValue = 0
  }
  if (!maxValue) {
    maxValue = 100
  }
  if (maxValue <= 0) {
    maxValue = 100
  }
  if (progressValue < 0) {
    progressValue = 0
  }
  if (progressValue > maxValue) {
    progressValue = maxValue
  }

  //TODO: account for border when setting inner height/width
  switch (direction) {
    case 0:
      flexDirection = 'row'
      width = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      innerHeight = height - borderWidth * 2
      innerBorderStyle = {
        borderRightWidth: borderWidth,
        borderRightColor: borderColor,
      }
      break
    case 1:
      flexDirection = 'row-reverse'
      width = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      innerHeight = height - borderWidth * 2
      innerBorderStyle = {
        borderLeftWidth: borderWidth,
        borderLeftColor: borderColor,
      }
      break
    case 2:
      flexDirection = 'column'
      innerHeight = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      width = _width - borderWidth * 2
      innerBorderStyle = {
        borderBottomWidth: borderWidth,
        borderBottomColor: borderColor,
      }
      break
    case 3:
      flexDirection = 'column-reverse'
      innerHeight = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      width = _width - borderWidth * 2
      innerBorderStyle = {
        borderTopWidth: borderWidth,
        borderTopColor: borderColor,
      }
      break
  }

  const borderRadius = (rounding / 100) * (height / 2)

  useEffect(() => {
    Animated.spring(animation.current, {
      toValue: progressValue,
      duration: animationDuration,
      bounciness: animationBounciness,
      speed: animationSpeed,
    }).start()
  }, [progressValue])

  if (editor) {
    const debounce = useCallback(
      _.debounce((bounce, speed, progress) => {
        animation.current.setValue(0)
        Animated.spring(animation.current, {
          toValue: progress,
          duration: animationDuration,
          bounciness: bounce,
          speed: speed,
        }).start()
      }, 500),
      []
    )

    useEffect(
      () => debounce(animationBounciness, animationSpeed, progressValue),
      [animationSpeed, animationBounciness]
    )
  }

  const outerStyles = {
    backgroundColor,
    height,
    borderRadius,
    borderWidth,
    borderColor,
    flexDirection,
    overflow: 'hidden',
  }

  const innerStyles = {
    backgroundColor: progressColor,
    height: innerHeight,
    width,
    borderRadius,
  }

  return (
    <View style={[styles.wrapper, outerStyles]}>
      <Animated.View style={[styles.progress, innerStyles, innerBorderStyle]} />
    </View>
  )
}

ProgressBar.defaultProps = {
  progressValue: 0,
  maxValue: 100,
  animationSpeed: 12,
  animationBounciness: 8,
  rounding: 0,
  direction: 0,
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'left',
  },
  progress: {
    display: 'flex',
  },
})

export default ProgressBar
