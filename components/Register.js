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
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "gray", borderRadius: 8, paddingHorizontal: 10, marginBottom: 15 },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 40 },
  registerButton: { backgroundColor: "green", padding: 12, borderRadius: 8, marginTop: 10, alignItems: "center" },
  registerText: { color: "white", fontWeight: "bold" },
  footer: { marginTop: 20, textAlign: "center" },
  link: { color: "blue", fontWeight: "bold" },
});
