import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
   .min(8, 'Password must be at least 8 characters')
   .max(16, 'Password must be at most 16 characters')
   .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState("");
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characters = '';
    const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberCharacters = '0123456789';
    const specialCharacters = '!@#$%^&*()_+';

    if (lowerCase) {
      characters += lowerCaseCharacters;
    }
    if (upperCase) {
      characters += upperCaseCharacters;
    }
    if (number) {
      characters += numberCharacters;
    }
    if (specialCharacter) {
      characters += specialCharacters;
    }

    if (!characters) {
      alert('Please select at least one character type');
      return;
    }

    const passwordResult = createPassword(characters, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let index = 0; index < passwordLength; index++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Password Generator</Text>
        </View>
        <Formik
          initialValues={{ passwordLength: '' }}
          validationSchema={PasswordSchema}
          onSubmit={(values) => {
            generatePasswordString(parseInt(values.passwordLength, 10));
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('passwordLength')}
                onBlur={handleBlur('passwordLength')}
                value={values.passwordLength}
                keyboardType="numeric"
                placeholder="Enter password length"
              />
              {errors.passwordLength && touched.passwordLength && (
                <Text style={styles.error}>{errors.passwordLength}</Text>
              )}
              <Button title="Generate Password" onPress={handleSubmit} />
              <Button title="Reset" onPress={resetPassword} />
            </View>
          )}
        </Formik>
        <View style={styles.characterOptions}>
          <Text>Character Options:</Text>
          <View style={styles.option}>
            <Text>Lowercase</Text>
            <Button title={lowerCase? 'Selected' : 'Select'} onPress={() => setLowerCase(!lowerCase)} />
          </View>
          <View style={styles.option}>
            <Text>Uppercase</Text>
            <Button title={upperCase? 'Selected' : 'Select'} onPress={() => setUpperCase(!upperCase)} />
          </View>
          <View style={styles.option}>
            <Text>Numbers</Text>
            <Button title={number? 'Selected' : 'Select'} onPress={() => setNumber(!number)} />
          </View>
          <View style={styles.option}>
            <Text>Special Characters</Text>
            <Button title={specialCharacter? 'Selected' : 'Select'} onPress={() => setSpecialCharacter(!specialCharacter)} />
          </View>
        </View>
        {isPasswordGenerated && (
          <View style={styles.generatedPassword}>
            <Text>Generated Password:</Text>
            <Text style={styles.generatedPasswordText}>{password}</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  characterOptions: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  generatedPassword: {
    marginBottom: 20,
  },
  generatedPasswordText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});