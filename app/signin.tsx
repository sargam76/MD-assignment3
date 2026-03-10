<<<<<<< HEAD
import { View, Text, StyleSheet } from "react-native";

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In Form</Text>
      <Text style={styles.text}>
        Member 3 will build the sign in form here.
      </Text>
=======
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as z from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  // Track which input is being clicked
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignInFormData) => {
    alert(`Success! Logging in as ${data.email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                focusedField === "email" && styles.inputFocused, // Change border if focused
                errors.email && styles.inputError, // Change border if there's an error
              ]}
              placeholder="Email Address"
              onFocus={() => setFocusedField("email")}
              onBlur={() => {
                setFocusedField(null);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                focusedField === "password" && styles.inputFocused,
                errors.password && styles.inputError,
              ]}
              placeholder="Password"
              secureTextEntry
              onFocus={() => setFocusedField("password")}
              onBlur={() => {
                setFocusedField(null);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Pressable
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
>>>>>>> 986f5da (Adding The sign Up page and Fixing Errors)
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
  },
});
=======
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#0f172a",
  },
  inputWrapper: { marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#2563eb", // Blue border on focus
    backgroundColor: "#fff",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Slight shadow for Android
  },
  inputError: { borderColor: "#ef4444" },
  errorText: {
    color: "#ef4444",
    fontSize: 13,
    marginTop: 6,
    fontWeight: "500",
  },
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
>>>>>>> 986f5da (Adding The sign Up page and Fixing Errors)
