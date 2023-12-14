import { View, StyleSheet } from 'react-native'
import React from 'react'

export default function Template() {
  return (
    <View>
      <View style={styles.circle3}/>
      <View style={styles.circle4}/>
      <View style={styles.circle1}/>
      <View style={styles.circle2}/>
    </View>
  )
}

const styles = StyleSheet.create({
  circle1: {
    flexDirection: 'row',
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#EFAC00", 
    top: -90,
    left: -5
  },
  circle2: {
    flexDirection: 'row',
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#F08D18", 
    top: -80,
    right: -80
  },
  circle3: {
    flexDirection: 'row',
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F08D18", 
    left: -50,
  },
  circle4: {
    flexDirection: 'row',
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white", 
    left: -20,
    top: 20
  },
});