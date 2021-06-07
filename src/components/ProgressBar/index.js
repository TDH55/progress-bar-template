import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

const ProgressBar = props => {
  // console.log(props)
  const { progressValue, maxValue, backgroundColor, progressColor, animationSpeed, animationBounciness, rounding, _height: height, _width, direction } = props
  let animation = useRef(new Animated.Value(0))
  let width
  let innerHeight
  let alignSelf
  let flexDirection
  // console.log(direction)
  switch (direction) {
    case 0:
      flexDirection = "row"
      // alignSelf = 'flex-start'
      width = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
      })
      innerHeight = height
      break;
    case 1:
      flexDirection = "row-reverse"
      // alignSelf = 'flex-end'
      width = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
      })
      innerHeight = height
      break;
    case 2:
      flexDirection = "column"
      innerHeight = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
      })
      width = _width
      break;
    case 3:
      flexDirection = "column-reverse"
      innerHeight = animation.current.interpolate({
        inputRange: [0, maxValue],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
      })
      width = _width
      break;
    // default:
    //   console.log("This shouldn't happen")
    //   break;
  }

  
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
    <View style={[styles.wrapper, {backgroundColor: backgroundColor, height, borderRadius, flexDirection, overflow: 'hidden'}]}>
      <Animated.View style={[StyleSheet.progress], {backgroundColor: progressColor, height: innerHeight, width, borderRadius}} />
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
