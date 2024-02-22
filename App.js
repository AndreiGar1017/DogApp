import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'



export default App = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const getImage = async() => {
    try{
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setImage(data);
      setError(null);
    }catch(err){
      setError(`Error finding weather data!`)
    }
  }

  useEffect(()=>{
    getImage();
  },[]);

  return[
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to DogApp!</Text>
      <TouchableOpacity onPress={getImage}>
        <Text>Get Image</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
      {image && <Image source={{uri: image.message}}/>}

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
  }
})