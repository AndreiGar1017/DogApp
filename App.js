import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'



export default App = () => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  const getImage = async() => {
    try{
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setImageData(data);
      setError(null);
      console.log(imageData.message)
    }catch(err){
      setError(`Error finding dog Image!: ${err}`)
    }
  }


  return[
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to DogApp!</Text>
      <TouchableOpacity onPress={getImage}>
        <Text>Get Image</Text>
      </TouchableOpacity>
      {error && (<Text>{error}</Text>)}
      {imageData && (<Image style={styles.image} source={{uri:imageData.message}}/>)}
    </View>
  ]
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
  },
  image:{
    width: 200,
    height: 180,
    margin: 10
  }
})