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
    exteriorRounding,
    interiorRounding,
    exteriorBorder,
    interiorBorder,
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
  let { exteriorBorderWidth, exteriorBorderColor } = exteriorBorder
  let { interiorBorderWidth, interiorBorderColor } = interiorBorder
  let interiorRadius = {}

  //set border values based on enabled/disabled
  if (!exteriorBorder.enabled) {
    exteriorBorderWidth = 0
  }

  if (!interiorBorder.enabled) {
    interiorBorderWidth = 0
  }

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

  const exteriorBorderRadius = (exteriorRounding / 100) * (height / 2)
  const interiorBorderRadius = (interiorRounding / 100) * (height / 2)

  switch (direction) {
    case 0:
      flexDirection = 'row'
      width = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      innerHeight = height - exteriorBorderWidth * 2
      innerBorderStyle = {
        borderRightWidth: interiorBorderWidth,
        borderRightColor: interiorBorderColor,
      }
      interiorRadius = {
        borderBottomRightRadius: interiorBorderRadius,
        borderTopRightRadius: interiorBorderRadius,
      }
      break
    case 1:
      flexDirection = 'row-reverse'
      width = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      innerHeight = height - exteriorBorderWidth * 2
      innerBorderStyle = {
        borderLeftWidth: interiorBorderWidth,
        borderLeftColor: interiorBorderColor,
      }
      interiorRadius = {
        borderBottomLeftRadius: interiorBorderRadius,
        borderTopLeftRadius: interiorBorderRadius,
      }
      break
    case 2:
      flexDirection = 'column'
      innerHeight = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      width = _width - exteriorBorderWidth * 2
      innerBorderStyle = {
        borderBottomWidth: interiorBorderWidth,
        borderBottomColor: interiorBorderColor,
      }
      interiorRadius = {
        borderBottomLeftRadius: interiorBorderRadius,
        borderBottomRightRadius: interiorBorderRadius,
      }
      break
    case 3:
      flexDirection = 'column-reverse'
      innerHeight = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
      width = _width - exteriorBorderWidth * 2
      innerBorderStyle = {
        borderTopWidth: interiorBorderWidth,
        borderTopColor: interiorBorderColor,
      }
      interiorRadius = {
        borderTopRightRadius: interiorBorderRadius,
        borderTopLeftRadius: interiorBorderRadius,
      }
      break
  }

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
    borderRadius: exteriorBorderRadius,
    borderWidth: exteriorBorderWidth,
    borderColor: exteriorBorderColor,
    flexDirection,
    overflow: 'hidden',
  }

  const innerStyles = {
    backgroundColor: progressColor,
    height: innerHeight,
    width,
    // borderRadius: interiorBorderRadius,
  }

  return (
    <View style={[styles.wrapper, outerStyles]}>
      <Animated.View
        style={[styles.progress, innerStyles, innerBorderStyle, interiorRadius]}
      />
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
