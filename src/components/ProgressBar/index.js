import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

const ProgressBar = props => {

  console.log(props)
  const { progressValue, maxValue, color, backgroundColor, rounding, _width, _height } = props
  let width = _width
  const height = _height
  width = (progressValue / maxValue) * width
  const borderRadius = (rounding / 100) * (height / 2)

  console.log(`progress value: ${progressValue}, max value: ${maxValue}, width: ${width}, height: ${_height}`)

  return (
    <View style={[styles.wrapper, {backgroundColor: color, height, borderRadius}]}>
      <View style={[styles.progress,{ backgroundColor: backgroundColor, width, height, borderRadius}]} >
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ProgressBar
