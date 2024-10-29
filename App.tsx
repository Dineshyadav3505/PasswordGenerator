import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'

const  PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(8, 'Password must be at least 8 characters')
  .max(16, 'Password must be at most 16 characters')
  .required('Length is required'),
})

export default function App() {
  
  const [password, setPassword] = useState("")
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [upperCase, setUpperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [specialCharacter, setSpecialCharacter] = useState(false)

  const generatePasswordString = (passwordLength:number, ) => {
    let characters = '';
    const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberCharacters = '0123456789'
    const specialCharacters = '!@#$%^&*()_+'

    if(lowerCase) {
      characters += lowerCaseCharacters
    }
    if(upperCase) {
      characters += upperCaseCharacters
    }
    if(number) {
      characters += numberCharacters
    }
    if(specialCharacter) {
      characters += specialCharacters
    }

    const passwordResult = createPassword(characters, passwordLength)
    setPassword(passwordResult) 
    setIsPasswordGenerated(true)

  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let index = 0; index < passwordLength; index++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const resetPassword = () => {
    setPassword('')
    setIsPasswordGenerated(false)
  }

  return (
    <View>
      <Text>App</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({})