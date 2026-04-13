// import { View, Text, Image,TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import * as ImagePicker from "expo-image-picker";
// import { Platform } from "react-native";


// export default function HostProfile() {
//     const [host,setHost]=useState(null);
//     const [username,setUsername] = useState("");
//     const [photo,setPhoto] = useState(null)
//     useEffect(() => {
//   const getHost = async () => {
//     try {

//       const hostData = await AsyncStorage.getItem("host");
//       console.log("Hostdata is ",hostData);

//       if (hostData && hostData !== "undefined") {
//         const parsedhost=JSON.parse(hostData);
//         setHost(parsedhost);
//         setUsername(parsedhost.username);
//       }
      

//     } catch (error) {
//       console.log("AsyncStorage error:", error);
//     }
//   };

//   getHost();
// }, []);

// const updateUsername = async () => {
//   try{

// const token = await AsyncStorage.getItem("token")

// const res = await fetch(
//   "http://192.168.31.126:8000/api/v1/host/updateusername",
//   {
//     method:"PUT",
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":`Bearer ${token}`
//     },
//     body:JSON.stringify({
//       username
//     })
//   }
// )

// const text = await res.text();   // 👈 json nahi text

//     console.log("SERVER RESPONSE:", text);

//     const data = JSON.parse(text);

// if(!data.success){
//   alert(data.message)
//   return
// }

// alert("Username updated")
// await AsyncStorage.setItem(
//   "host",
//   JSON.stringify(data.data)
// )
// setUsername(data.data.username);
// setHost(data.data);
//   }
//   catch (error) {
//     console.log("username not edited", error);
//     alert(error);
//   }

// }

// const updateProfilePicture = async () => {

//   try {

//     if (!photo) {
//       alert("Please select an image first");
//       return;
//     }

//     const token = await AsyncStorage.getItem("token");

//     const formData = new FormData();

//     // formData.append("avatar", {
//     //   uri: photo,
//     //   name: "profile.jpg",
//     //   type: "image/jpeg"
//     // });

//     if (photo) {
    
//       if (Platform.OS === "web") {
//         const response = await fetch(photo);
//         const blob = await response.blob();
    
//         formData.append("avatar", blob, "host.jpg");
//       } else {
//         formData.append("avatar", {
//           uri: photo,
//           type: "image/jpeg",
//           name: "host.jpg",
//         });
//       }
    
//     }

//     const res = await fetch(
//       "http://192.168.31.126:8000/api/v1/host/updateprofile",
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       }
//     );

//     const data = await res.json();

//     if (!data.success) {
//       alert(data.message);
//       return;
//     }

//     alert("Profile picture updated");

//     // AsyncStorage update
//     await AsyncStorage.setItem(
//       "host",
//       JSON.stringify(data.data)
//     );

//     setHost(data.data);
//     setPhoto(null);

//   } catch (error) {
//     console.log("Profile picture error:", error);
//     alert("Image upload failed");
//   }

// };


// const pickImage = async () => {

//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     quality:1
//   })

//   if(!result.canceled){
//     setPhoto(result.assets[0].uri)
//   }
// }
//   return (
//     <View style={styles.container}>
// <TextInput
//   style={styles.input}
//   value={username}
//    placeholder="Enter new username"
//   placeholderTextColor="#94a3b8"
//   onChangeText={setUsername}
// />

// <TouchableOpacity style={styles.btn} onPress={updateUsername}>
//   <Text style={styles.btnText}>Edit Username</Text>
// </TouchableOpacity>


//   <Image
//     source={
//       host?.avatar
//         ? { uri: host.avatar }
//         : require("../../../assets/images/icon.png")
//     }
//     style={styles.avatar}
//   />
// <TouchableOpacity style={styles.secondaryBtn} onPress={pickImage}>
//   <Text style={styles.secondaryText}>Select Image</Text>
// </TouchableOpacity>

// <TouchableOpacity style={styles.btn} onPress={updateProfilePicture}>
//   <Text style={styles.btnText}>Change Profile Picture</Text>
// </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({

// container:{
//   flex:1,
//   backgroundColor:"#020617",
//   padding:24,
//   alignItems:"center"
// },

// avatar:{
//   width:120,
//   height:120,
//   borderRadius:60,
//   borderWidth:3,
//   borderColor:"#38bdf8",
//   marginBottom:20
// },

// label:{
//   color:"#94a3b8",
//   fontSize:14,
//   alignSelf:"flex-start",
//   marginBottom:6
// },

// input:{
//   width:"100%",
//   borderWidth:1,
//   borderColor:"#1e293b",
//   backgroundColor:"#020617",
//   padding:14,
//   borderRadius:10,
//   color:"#fff",
//   marginBottom:15
// },

// btn:{
//   width:"100%",
//   backgroundColor:"#38bdf8",
//   padding:14,
//   borderRadius:10,
//   marginBottom:20
// },

// btnText:{
//   textAlign:"center",
//   fontWeight:"700",
//   color:"#020617",
//   fontSize:16
// },

// secondaryBtn:{
//   width:"100%",
//   borderWidth:1,
//   borderColor:"#38bdf8",
//   padding:14,
//   borderRadius:10,
//   marginBottom:20
// },

// secondaryText:{
//   textAlign:"center",
//   color:"#38bdf8",
//   fontWeight:"700"
// }

// });


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function HostProfile() {
  const [host, setHost] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getHost = async () => {
      try {
        const hostData = await AsyncStorage.getItem("host");
        if (hostData && hostData !== "undefined") {
          const parsedHost = JSON.parse(hostData);
          setHost(parsedHost);
          setUsername(parsedHost.username || "");
        }
      } catch (error) {
        console.log("AsyncStorage error:", error);
      }
    };

    getHost();
  }, []);

  const updateUsername = async () => {
    if (!username.trim()) {
      alert("Error Username cannot be empty");
      return;
    }

    setLoadingUsername(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        "http://192.168.31.126:8000/api/v1/host/updateusername",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }),
        }
      );

      const text = await res.text();
      console.log("SERVER RESPONSE:", text);

      const data = JSON.parse(text);

      if (!data.success) {
        alert("Failed Failed to update username"+data.message);
        return;
      }

      alert("Success Username updated successfully");

      await AsyncStorage.setItem("host", JSON.stringify(data.data));
      setHost(data.data);
      setUsername(data.data.username);
    } catch (error) {
      console.log("Username update error:", error);
      alert("Error Failed to update username");
    } finally {
      setLoadingUsername(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const updateProfilePicture = async () => {
    if (!photo) {
      alert("No Image Please select a profile picture first");
      return;
    }

    setUploading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();

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
        alert("Failed to update profile picture"+data.message);
        return;
      }

      alert("Success Profile picture updated successfully");

      await AsyncStorage.setItem("host", JSON.stringify(data.data));
      setHost(data.data);
      setPhoto(null); // Clear selected photo
    } catch (error) {
      console.log("Profile picture error:", error);
      alert("Error Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                photo
                  ? { uri: photo }
                  : host?.avatar
                  ? { uri: host.avatar }
                  : require("../../../assets/images/icon.png")
              }
              style={styles.avatar}
            />
            {photo && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
            )}
          </View>

          <Text style={styles.username}>
            {host?.username || "Host Profile"}
          </Text>
          <Text style={styles.email}>{host?.email || ""}</Text>
        </View>

        {/* Username Update Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Update Username</Text>

          <TextInput
            style={styles.input}
            value={username}
            placeholder="Enter new username"
            placeholderTextColor="#475569"
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.btn, loadingUsername && styles.btnDisabled]}
            onPress={updateUsername}
            disabled={loadingUsername}
          >
            {loadingUsername ? (
              <ActivityIndicator color="#020617" />
            ) : (
              <Text style={styles.btnText}>Update Username</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Profile Picture Update Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Picture</Text>

          <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
            <Ionicons name="image-outline" size={22} color="#38bdf8" />
            <Text style={styles.pickButtonText}>
              {photo ? "Change Selected Image" : "Choose New Photo"}
            </Text>
          </TouchableOpacity>

          {photo && (
            <Text style={styles.previewText}>Image selected and ready to upload</Text>
          )}

          <TouchableOpacity
            style={[styles.btn, uploading && styles.btnDisabled]}
            onPress={updateProfilePicture}
            disabled={uploading || !photo}
          >
            {uploading ? (
              <ActivityIndicator color="#020617" />
            ) : (
              <Text style={styles.btnText}>Upload Profile Picture</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#38bdf8",
  },
  newBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#22c55e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  username: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: "#94a3b8",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#38bdf8",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    backgroundColor: "#0f172a",
    borderWidth: 2,
    borderColor: "#1e293b",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  btn: {
    width: "100%",
    backgroundColor: "#38bdf8",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnDisabled: {
    backgroundColor: "#64748b",
  },
  btnText: {
    color: "#020617",
    fontSize: 17,
    fontWeight: "800",
  },
  pickButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    borderWidth: 2,
    borderColor: "#38bdf8",
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 12,
    gap: 10,
  },
  pickButtonText: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "700",
  },
  previewText: {
    color: "#22c55e",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 14,
  },
});