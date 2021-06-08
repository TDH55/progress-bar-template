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
    _height: height,
    _width,
    direction,
    editor,
  } = props
  let animation = useRef(new Animated.Value(0))
  let lastAnimationUpdate = useRef(Date.now())
  let width
  let innerHeight
  let flexDirection

  //Set default values if the editor input is invalid
  if (maxValue <= 0) {
    maxValue = 100
  }
  if (progressValue < 0) {
    progressValue = 0
  }
  if (progressValue > maxValue) {
    progressValue = maxValue
  }

  switch (direction) {
    case 0:
      flexDirection = 'row'
      width = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      innerHeight = height
      break
    case 1:
      flexDirection = 'row-reverse'
      width = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      innerHeight = height
      break
    case 2:
      flexDirection = 'column'
      innerHeight = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      width = _width
      break
    case 3:
      flexDirection = 'column-reverse'
      innerHeight = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      width = _width
      break
  }

  const borderRadius = (rounding / 100) * (height / 2)

  useEffect(() => {
    Animated.spring(animation.current, {
      toValue: progressValue,
      duration: 100,
      bounciness: animationBounciness,
      speed: animationSpeed,
    }).start()
  }, [progressValue])

  const debounce = useCallback(
    _.debounce(() => {
      console.log("callback")
      animation.current.setValue(0)
      Animated.spring(animation.current, {
        toValue: progressValue,
        duration: 100,
        bounciness: animationBounciness,
        speed: animationSpeed,
      }).start()
    }, 500),
    []
  )

  useEffect(() => debounce(), [animationBounciness, animationSpeed])

  const outerStyles = {
    backgroundColor,
    height,
    borderRadius,
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
      <Animated.View style={[styles.progress, innerStyles]} />
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
