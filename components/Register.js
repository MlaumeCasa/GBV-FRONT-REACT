import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!username || !email || !password) {
      Alert.alert("⚠️ Error", "All fields are required!");
      return;
    }
    Alert.alert("✅ Success", "Registration successful!");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.caption}>
        Join us and take the first step towards safety and empowerment.
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Icon name="check-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 25, 
    backgroundColor: "#F9FAFB" 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 8, 
    textAlign: "center",
    color: "#4B0082" 
  },
  caption: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "#D1D5DB", 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  icon: { 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    height: 50, 
    color: "#111827",
  },
  registerButton: { 
    flexDirection: "row",
    backgroundColor: "#8a2be2", 
    padding: 15, 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 10 
  },
  registerText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  footer: { 
    marginTop: 20, 
    textAlign: "center",
    fontSize: 14,
    color: "#6B7280",
  },
  link: { 
    color: "#8a2be2", 
    fontWeight: "bold" 
  },
});
