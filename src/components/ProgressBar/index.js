import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

const ProgressBar = props => {

  console.log(props)
  const { progressValue, maxValue, color, backgroundColor, rounding, _width, _height } = props
  const width = (progressValue / maxValue) * _width
  const height = _height
  const borderRadius = (rounding / 100) * (height / 2)

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
  },
  progress: {
    display: 'flex',
  }
})

export default ProgressBar
