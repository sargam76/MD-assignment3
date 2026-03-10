import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as z from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const [focused, setFocused] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignUpData) => {
    alert("Success! Account created.");
    console.log(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={styles.inputGroup}>
            <TextInput
              style={[
                styles.input,
                focused === "name" && styles.focused,
                errors.fullName && styles.errorInput,
              ]}
              placeholder="Full Name"
              onFocus={() => setFocused("name")}
              onBlur={() => {
                setFocused(null);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={styles.inputGroup}>
            <TextInput
              style={[
                styles.input,
                focused === "email" && styles.focused,
                errors.email && styles.errorInput,
              ]}
              placeholder="Email"
              onFocus={() => setFocused("email")}
              onBlur={() => {
                setFocused(null);
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

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={styles.inputGroup}>
            <TextInput
              style={[
                styles.input,
                focused === "pass" && styles.focused,
                errors.password && styles.errorInput,
              ]}
              placeholder="Password (min 8 chars)"
              onFocus={() => setFocused("pass")}
              onBlur={() => {
                setFocused(null);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={styles.inputGroup}>
            <TextInput
              style={[
                styles.input,
                focused === "confirm" && styles.focused,
                errors.confirmPassword && styles.errorInput,
              ]}
              placeholder="Confirm Password"
              onFocus={() => setFocused("confirm")}
              onBlur={() => {
                setFocused(null);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
        )}
      />

      <Pressable
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f8fafc",
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 30,
    textAlign: "center",
  },
  inputGroup: { marginBottom: 16 },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  focused: { borderColor: "#2563eb", borderWidth: 2 },
  errorInput: { borderColor: "#ef4444" },
  errorText: { color: "#ef4444", fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: "#94a3b8" },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
