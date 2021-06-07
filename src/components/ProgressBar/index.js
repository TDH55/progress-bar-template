import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

const ProgressBar = props => {

  const { progressValue, maxValue, backgroundColor, progressColor, animationSpeed, animationBounciness, rounding, _height: height } = props
  let animation = useRef(new Animated.Value(0))
  const width = animation.current.interpolate({
    inputRange: [0, maxValue],
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
    <View style={[styles.wrapper, {backgroundColor: backgroundColor, height, borderRadius}]}>
      <Animated.View style={[StyleSheet.progress], {backgroundColor: progressColor, height, width}} />
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
