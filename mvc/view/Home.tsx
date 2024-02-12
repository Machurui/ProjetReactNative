import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, TextInput, StyleSheet, View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';

const Home = () => {
    const navigation = useNavigation();

    const goToSignIn = () => {
        navigation.navigate('SignIn' as never);
    }

    const goToSignUp = () => {
        navigation.navigate('SignUp' as never);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Button
                    onPress={goToSignIn}
                    title="Se connecter"
                />
                <Divider inset={true} insetType="middle" style={styles.divider} />
                <Button
                    onPress={goToSignUp}
                    title="S'inscrire"
                />
                <Divider inset={true} insetType="middle" style={styles.divider} />
                <Button
                    onPress={() => navigation.navigate('List' as never)}
                    title="Liste des blockchains"
                />
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
    divider: {
        padding: 10,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});

export default Home;