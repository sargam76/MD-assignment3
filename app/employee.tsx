import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { z } from "zod";


const employeeSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be under 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be under 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/, "Please enter a valid phone number"),
  jobTitle: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be under 100 characters"),
  department: z
    .string()
    .min(2, "Department must be at least 2 characters")
    .max(100, "Department must be under 100 characters"),
  employeeId: z
    .string()
    .regex(/^[A-Z0-9]{4,12}$/, "Employee ID must be 4–12 uppercase letters/numbers"),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
  salary: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid salary (e.g. 75000 or 75000.00)"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be under 200 characters"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;
type FieldErrors = Partial<Record<keyof EmployeeFormData, string>>;


const INITIAL_FORM: EmployeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  department: "",
  employeeId: "",
  startDate: "",
  salary: "",
  address: "",
};


const FIELD_CONFIG: {
  key: keyof EmployeeFormData;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric" | "decimal-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  section: string;
}[] = [
  { key: "firstName",   label: "First Name",   placeholder: "Jane",                section: "Personal",  autoCapitalize: "words" },
  { key: "lastName",    label: "Last Name",    placeholder: "Smith",               section: "Personal",  autoCapitalize: "words" },
  { key: "email",       label: "Email",        placeholder: "jane@company.com",    section: "Personal",  keyboardType: "email-address", autoCapitalize: "none" },
  { key: "phone",       label: "Phone",        placeholder: "+1 555 000 0000",     section: "Personal",  keyboardType: "phone-pad" },
  { key: "address",     label: "Address",      placeholder: "123 Main St, City",   section: "Personal",  autoCapitalize: "words" },
  { key: "employeeId",  label: "Employee ID",  placeholder: "EMP001",              section: "Employment", autoCapitalize: "characters" },
  { key: "jobTitle",    label: "Job Title",    placeholder: "Senior Engineer",     section: "Employment", autoCapitalize: "words" },
  { key: "department",  label: "Department",   placeholder: "Engineering",         section: "Employment", autoCapitalize: "words" },
  { key: "startDate",   label: "Start Date",   placeholder: "YYYY-MM-DD",          section: "Employment" },
  { key: "salary",      label: "Salary (USD)", placeholder: "75000",               section: "Employment", keyboardType: "decimal-pad" },
];

const SECTIONS = ["Personal", "Employment"];


export default function EmployeeScreen() {
  const [form, setForm] = useState<EmployeeFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (key: keyof EmployeeFormData, value: string) => {
    const partial = { ...form, [key]: value };
    const result = employeeSchema.safeParse(partial);
    if (!result.success) {
      const fieldError = result.error.flatten().fieldErrors[key];
      return fieldError?.[0] ?? null;
    }
    return null;
  };

  const handleChange = (key: keyof EmployeeFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (submitAttempted) {
      const err = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: err ?? undefined }));
    }
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);

    const result = employeeSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const mapped: FieldErrors = {};
      (Object.keys(fieldErrors) as (keyof EmployeeFormData)[]).forEach((k) => {
        mapped[k] = fieldErrors[k]?.[0];
      });
      setErrors(mapped);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API call
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitAttempted(false);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successCard}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Employee Added</Text>
          <Text style={styles.successName}>
            {form.firstName} {form.lastName}
          </Text>
          <Text style={styles.successSub}>{form.jobTitle} · {form.department}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Add Another Employee</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>HR</Text>
          </View>
          <Text style={styles.headerTitle}>Employee Information</Text>
          <Text style={styles.headerSubtitle}>
            Complete all fields to register a new employee
          </Text>
        </View>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <View key={section} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>{section} Details</Text>
            </View>

            {FIELD_CONFIG.filter((f) => f.section === section).map((field) => {
              const hasError = !!errors[field.key] && submitAttempted;
              const isValid = submitAttempted && !errors[field.key] && form[field.key].length > 0;

              return (
                <View key={field.key} style={styles.fieldWrapper}>
                  <Text style={styles.label}>{field.label}</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      hasError && styles.inputError,
                      isValid && styles.inputValid,
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      value={form[field.key]}
                      onChangeText={(v) => handleChange(field.key, v)}
                      placeholder={field.placeholder}
                      placeholderTextColor="#94a3b8"
                      keyboardType={field.keyboardType ?? "default"}
                      autoCapitalize={field.autoCapitalize ?? "sentences"}
                      autoCorrect={false}
                    />
                    {isValid && <Text style={styles.validIcon}>✓</Text>}
                  </View>
                  {hasError && (
                    <Text style={styles.errorText}>⚠ {errors[field.key]}</Text>
                  )}
                </View>
              );
            })}
          </View>
        ))}

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Register Employee</Text>
          )}
        </TouchableOpacity>

        <View style={styles.bottomPad} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#f1f5f9" },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 32 },
  header: { alignItems: "center", marginBottom: 32 },
  headerBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#1e40af",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerBadgeText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  headerSubtitle: { fontSize: 14, color: "#64748b", textAlign: "center" },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1e40af",
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1e40af",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Field
  fieldWrapper: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
    letterSpacing: 0.1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0f172a",
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fff5f5",
  },
  inputValid: {
    borderColor: "#22c55e",
    backgroundColor: "#f0fdf4",
  },
  validIcon: { color: "#22c55e", fontSize: 14, fontWeight: "700" },
  errorText: { marginTop: 5, fontSize: 12, color: "#ef4444", fontWeight: "500" },

  submitButton: {
    backgroundColor: "#1e40af",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  submitButtonDisabled: { opacity: 0.7 },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },

  
  successContainer: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  successCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 36,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  successIcon: {
    fontSize: 44,
    color: "#22c55e",
    marginBottom: 16,
  },
  successTitle: { fontSize: 22, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
  successName: { fontSize: 17, fontWeight: "700", color: "#1e40af", marginBottom: 4 },
  successSub: { fontSize: 14, color: "#64748b", marginBottom: 28 },
  resetButton: {
    backgroundColor: "#1e40af",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 28,
  },
  resetButtonText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  bottomPad: { height: 20 },
});