import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

const ProgressBar = props => {

  const { progressValue, maxValue, color, backgroundColor, animationSpeed, animationBounciness, rounding, _width, _height } = props
  const height = _height
  let animation = useRef(new Animated.Value(0))
  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })
  const borderRadius = (rounding / 100) * (height / 2)

  useEffect(() => {
    console.log(`speed: ${animationSpeed}, bounciness: ${animationBounciness}`)
    Animated.spring(animation.current, {
      toValue: progressValue,
      duration: 100,
      bounciness: animationBounciness,
      speed: animationSpeed
    }).start()
  }, [progressValue])

  return (
    <View style={[styles.wrapper, {backgroundColor: color, height, borderRadius}]}>
      <Animated.View style={[StyleSheet.progress], {backgroundColor: backgroundColor, height, width}} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'left',
  },
  progress: {
    display: 'flex',
  }
})

export default ProgressBar
