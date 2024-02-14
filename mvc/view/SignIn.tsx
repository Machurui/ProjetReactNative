import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput, StyleSheet, Alert, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import User from '../model/User';
import { signIn } from '../controller/Conn';
import { auth } from '../controller/Firebase';


const SignIn = () => {
    const navigation = useNavigation();
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    // Fonction pour soumettre le formulaire
    const handleSubmit = () => {
        // Vérifie si l'email et le mot de passe ne sont pas vides
        if (email != "" && password != "") {
            // Crée un objet User avec l'email et le mot de passe
            const user: User = {
                email: email,
                password: password,
            };

            // Appelle la fonction signIn du contrôleur Conn
            signIn(user);

            // Vérifie si l'utilisateur est connecté
            auth.onAuthStateChanged((user) => {
                if (user) {
                    navigation.navigate('List' as never);
                }
            });

        } else {
            // Affiche une alerte si l'email et le mot de passe sont vides
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

                <Button title="Sign In" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    );
};

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
});

export default SignIn;