import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
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
    email: z.string().email("That doesn't look like a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onRegister = (data: SignUpFormData) => {
    console.log("Account Created!", data);
    alert("Welcome to the team! Your account is ready.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>Join Us! 🚀</Text>
        <Text style={styles.subText}>Create an account to get started.</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  activeInput === "fullName" && styles.inputActive,
                  errors.fullName && styles.inputError,
                ]}
                placeholder="John Doe"
                onFocus={() => setActiveInput("fullName")}
                onBlur={() => {
                  setActiveInput(null);
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.errorLabel}>{errors.fullName.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email Address</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  activeInput === "email" && styles.inputActive,
                  errors.email && styles.inputError,
                ]}
                placeholder="hello@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setActiveInput("email")}
                onBlur={() => {
                  setActiveInput(null);
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorLabel}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  activeInput === "password" && styles.inputActive,
                  errors.password && styles.inputError,
                ]}
                placeholder="Must be 8+ characters"
                secureTextEntry
                onFocus={() => setActiveInput("password")}
                onBlur={() => {
                  setActiveInput(null);
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorLabel}>{errors.password.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  activeInput === "confirmPassword" && styles.inputActive,
                  errors.confirmPassword && styles.inputError,
                ]}
                placeholder="Repeat your password"
                secureTextEntry
                onFocus={() => setActiveInput("confirmPassword")}
                onBlur={() => {
                  setActiveInput(null);
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorLabel}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        <Pressable
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={handleSubmit(onRegister)}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Create My Account</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f8fafc",
    flexGrow: 1,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  subText: { fontSize: 16, color: "#64748b", marginBottom: 32 },
  fieldGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#475569", marginBottom: 8 },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    fontSize: 16,
  },
  inputActive: { borderColor: "#2563eb", backgroundColor: "#fff" },
  inputError: { borderColor: "#ef4444" },
  errorLabel: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonDisabled: { backgroundColor: "#cbd5e1" },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
