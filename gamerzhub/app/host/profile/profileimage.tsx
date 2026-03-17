import { View, Text, Image,TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";


export default function HostProfile() {
    const [host,setHost]=useState(null);
    const [username,setUsername] = useState("");
    const [photo,setPhoto] = useState(null)
    useEffect(() => {
  const getHost = async () => {
    try {

      const hostData = await AsyncStorage.getItem("host");
      console.log("Hostdata is ",hostData);

      if (hostData && hostData !== "undefined") {
        const parsedhost=JSON.parse(hostData);
        setHost(parsedhost);
        setUsername(parsedhost.username);
      }
      

    } catch (error) {
      console.log("AsyncStorage error:", error);
    }
  };

  getHost();
}, []);

const updateUsername = async () => {
  try{

const token = await AsyncStorage.getItem("token")

const res = await fetch(
  "http://192.168.31.126:8000/api/v1/host/updateusername",
  {
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    },
    body:JSON.stringify({
      username
    })
  }
)

const text = await res.text();   // 👈 json nahi text

    console.log("SERVER RESPONSE:", text);

    const data = JSON.parse(text);

if(!data.success){
  alert(data.message)
  return
}

alert("Username updated")
await AsyncStorage.setItem(
  "host",
  JSON.stringify(data.data)
)
setUsername(data.data.username);
setHost(data.data);
  }
  catch (error) {
    console.log("username not edited", error);
    alert(error);
  }

}

const updateProfilePicture = async () => {

  try {

    if (!photo) {
      alert("Please select an image first");
      return;
    }

    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();

    // formData.append("avatar", {
    //   uri: photo,
    //   name: "profile.jpg",
    //   type: "image/jpeg"
    // });

    if (photo) {
    
      if (Platform.OS === "web") {
        const response = await fetch(photo);
        const blob = await response.blob();
    
        formData.append("avatar", blob, "host.jpg");
      } else {
        formData.append("avatar", {
          uri: photo,
          type: "image/jpeg",
          name: "host.jpg",
        });
      }
    
    }

    const res = await fetch(
      "http://192.168.31.126:8000/api/v1/host/updateprofile",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Profile picture updated");

    // AsyncStorage update
    await AsyncStorage.setItem(
      "host",
      JSON.stringify(data.data)
    );

    setHost(data.data);
    setPhoto(null);

  } catch (error) {
    console.log("Profile picture error:", error);
    alert("Image upload failed");
  }

};


const pickImage = async () => {

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality:1
  })

  if(!result.canceled){
    setPhoto(result.assets[0].uri)
  }
}
  return (
    <View style={styles.container}>
<TextInput
  style={styles.input}
  value={username}
   placeholder="Enter new username"
  placeholderTextColor="#94a3b8"
  onChangeText={setUsername}
/>

<TouchableOpacity style={styles.btn} onPress={updateUsername}>
  <Text style={styles.btnText}>Edit Username</Text>
</TouchableOpacity>


  <Image
    source={
      host?.avatar
        ? { uri: host.avatar }
        : require("../../../assets/images/icon.png")
    }
    style={styles.avatar}
  />
<TouchableOpacity style={styles.secondaryBtn} onPress={pickImage}>
  <Text style={styles.secondaryText}>Select Image</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.btn} onPress={updateProfilePicture}>
  <Text style={styles.btnText}>Change Profile Picture</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#020617",
  padding:24,
  alignItems:"center"
},

avatar:{
  width:120,
  height:120,
  borderRadius:60,
  borderWidth:3,
  borderColor:"#38bdf8",
  marginBottom:20
},

label:{
  color:"#94a3b8",
  fontSize:14,
  alignSelf:"flex-start",
  marginBottom:6
},

input:{
  width:"100%",
  borderWidth:1,
  borderColor:"#1e293b",
  backgroundColor:"#020617",
  padding:14,
  borderRadius:10,
  color:"#fff",
  marginBottom:15
},

btn:{
  width:"100%",
  backgroundColor:"#38bdf8",
  padding:14,
  borderRadius:10,
  marginBottom:20
},

btnText:{
  textAlign:"center",
  fontWeight:"700",
  color:"#020617",
  fontSize:16
},

secondaryBtn:{
  width:"100%",
  borderWidth:1,
  borderColor:"#38bdf8",
  padding:14,
  borderRadius:10,
  marginBottom:20
},

secondaryText:{
  textAlign:"center",
  color:"#38bdf8",
  fontWeight:"700"
}

});