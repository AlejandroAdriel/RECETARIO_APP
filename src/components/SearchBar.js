import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { useState } from "react";

export default function SearchBar({ value, onChange, onSubmit, placeholder }) {
  const [local, setLocal] = useState(value || "");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={(t) => { setLocal(t); onChange?.(t); }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        onSubmitEditing={() => onSubmit?.(local)}
      />
      <Pressable style={styles.btn} onPress={() => onSubmit?.(local)}>
        <Text style={styles.btnText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: SIZES.radius,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.honey,
    color: COLORS.ink,
  },
  btn: {
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
