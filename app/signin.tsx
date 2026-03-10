import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as z from "zod";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSignIn = (data: SignInData) => {
    console.log("Logged in:", data);
    alert("Welcome back!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Sign In</Text>
        <Text style={styles.subHeader}>Enter your details to continue</Text>

        {/* Email Field */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isEmailFocused && styles.inputFocused,
                  errors.email && styles.inputError,
                ]}
                placeholder="email@example.com"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => {
                  setIsEmailFocused(false);
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isPassFocused && styles.inputFocused,
                  errors.password && styles.inputError,
                ]}
                placeholder="Your password"
                secureTextEntry
                onFocus={() => setIsPassFocused(true)}
                onBlur={() => {
                  setIsPassFocused(false);
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <Pressable
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={handleSubmit(onSignIn)}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  innerContainer: { padding: 24, flex: 1, justifyContent: "center" },
  header: { fontSize: 30, fontWeight: "bold", color: "#0f172a" },
  subHeader: { fontSize: 16, color: "#64748b", marginBottom: 32 },
  inputBox: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#475569", marginBottom: 8 },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    fontSize: 16,
  },
  inputFocused: { borderColor: "#2563eb" },
  inputError: { borderColor: "#ef4444" },
  errorText: { color: "#ef4444", fontSize: 12, marginTop: 6 },
  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: "#cbd5e1" },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
