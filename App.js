import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default App = () => {
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to DogApp!</Text>
  </View>
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom:20,
    fontWeight: "bold"
  }
})