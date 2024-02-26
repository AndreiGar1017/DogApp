import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default App = () => {
  const [imageData, setImageData] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const [error, setError] = useState(null);
  const [imgIndex, setImgIndex] = useState(null);
  const [imgArray, setImgArray] = useState([]);

  const getImage = async() => {
    try{
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setImageData(data);
      setError(null);
    }catch(err){
      setError(`Error finding dog Image!: ${err}`)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      storeData(result.assets[0].uri);
    }
  };

  const storeData = async (value) => {
    try {
      const counter = await AsyncStorage.getItem('counter');
      let newCounter = 0;
  
      if (counter !== null) {
        newCounter = parseInt(counter) + 1;
      }
  
      await AsyncStorage.setItem(`Img${newCounter}`, value);
      await AsyncStorage.setItem('counter', newCounter.toString());
      setImgArray([...imgArray, newCounter]);

      if (counter !== null) {
        lastCounter = parseInt(counter) + 1
      }else{
        lastCounter = 0
      }
      const newImage = await AsyncStorage.getItem(`Img${lastCounter}`)
      setLocalImage(newImage);
    } catch (e) {
      console.error('Error on saving dog image!:', e);
    }
  };

  const randomImage = async() =>{
    console.log("Este es el arreglo cuando randomizo: ",imgArray);
    let randomIndex 
    if(imgArray.length > 0){
      randomIndex = Math.floor(Math.random() * (imgArray.length));
    }else{
      randomIndex = null;
    }
    setImgIndex(randomIndex);
    console.log("Este es el index randomizado:",randomIndex);
    const newImage = await AsyncStorage.getItem(`Img${imgArray[randomIndex]}`)
    setLocalImage(newImage);
  }

  const removeImage = async() =>{
    console.log("Este es el index que deberia eliminar: ", imgIndex)
    const newArray = imgArray.filter((_, index) => index !== imgIndex);
    setImgArray(newArray);
    console.log("Este es el nuevo arreglo: ", newArray)
  }
  
  const restartAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage has been restarted');
    } catch (error) {
      console.error('Error on restarting AsyncStorage', error);
    }
  };

  const localOnInit = async() =>{
    const counter = await AsyncStorage.getItem('counter');
    if(counter>0){
      randomImage();
    }
  }

  useEffect(() => {
    getImage();
    localOnInit();
    restartAsyncStorage();
  }, []); 


  return[
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to DogApp!</Text>
      <TouchableOpacity onPress={getImage}>
        <Text>Random Dog</Text>
      </TouchableOpacity>
      {error && (<Text>{error}</Text>)}
      {imageData && (<Image style={styles.imageAPI} source={{uri:imageData.message}}/>)}
      <TouchableOpacity onPress={pickImage}>
        <Text>Pick an image from camera roll</Text>
      </TouchableOpacity>
      {localImage && <Image style={styles.imageAPI} source={{ uri: localImage }} />}
      {localImage &&  <TouchableOpacity onPress={randomImage}>
                        <Text>Randomize Local Images</Text>
                      </TouchableOpacity>}
      {localImage &&  <TouchableOpacity onPress={removeImage}>
                        <Text>Delete this Image</Text>
                      </TouchableOpacity>}
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
  imageAPI:{
    width: 200,
    height: 180,
    margin: 10
  }
})