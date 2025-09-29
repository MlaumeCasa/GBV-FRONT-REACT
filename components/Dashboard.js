import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Dashboard({ navigation }) {
  const features = [
    { id: 1, title: "Report Incident", icon: "pencil-square-o", color: "#8B5CF6", screen: "Report" },
    { id: 2, title: "My Reports", icon: "clipboard", color: "#6366F1", screen: "Reports" },
    { id: 3, title: "View Hotspot Map", icon: "map-marker", color: "#3B82F6", screen: "Map" },
    { id: 4, title: "Resources", icon: "cogs", color: "#0EA5E9", screen: "Resources" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Dashboard</Text>

      {/* Red Octagon Icon */}
      <View style={styles.stopShape} />

      {/* Feature List */}
      <ScrollView contentContainerStyle={styles.list}>
        {features.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={[styles.iconWrapper, { backgroundColor: item.color + "20" }]}>
              <Icon name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace("Login")}
      >
        <Icon name="sign-out" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },
  stopShape: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    alignSelf: "center",
    marginBottom: 30,
    transform: [{ rotate: "22.5deg" }], // tilt square to form octagon
    borderRadius: 15,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
