import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput, StyleSheet, Alert, Text, Image, View } from 'react-native';
import User from '../model/User';
import { signUp } from '../controller/Insc';

const SignIn = () => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    const handleSubmit = () => {
        if (email != "" && password != "") {
            const user: User = {
                email: email,
                password: password,
            };

            signUp(user);
        } else {
            Alert.alert("Email and password are required");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Image
                    source={{
                        uri: 'https://blog-fr.orson.io/wp-content/uploads/2020/07/logostarbuck.png',
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        alignSelf: "center",
                        marginBottom: 50,
                    }}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={onChangeEmail}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={onChangePassword}
                    secureTextEntry
                />

                <Button title="Login" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#f5f5f5",
    },
    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});

export default SignIn;