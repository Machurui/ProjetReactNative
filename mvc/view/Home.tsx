import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import { auth } from '../controller/Firebase';
import { signOutFun } from '../controller/Deco';

const Home = () => {
    const navigation = useNavigation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifiez si l'utilisateur est connecté
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {

                console.log("User is authenticated");

                // Si l'utilisateur est connecté, mettez à jour l'état
                setIsAuthenticated(true);
            }
        });
        return unsubscribe;

    }), [];

    // Fonction pour naviguer vers la page de connexion
    const goToSignIn = () => {
        navigation.navigate('SignIn' as never);
    }

    // Fonction pour naviguer vers la page d'inscription
    const goToSignUp = () => {
        navigation.navigate('SignUp' as never);
    }

    // Fonction pour naviguer vers la page d'historique
    const goToHistorique = () => {
        navigation.navigate('Hist' as never);
    }

    // Fonction pour naviguer vers la page de liste
    const goToList = () => {
        navigation.navigate('List' as never);
    }

    // Fonction pour se déconnecter
    const handleSignOut = () => {
        // Appelle la fonction de déconnexion
        signOutFun().then((result) => {
            if (result.success) {
                setIsAuthenticated(false);
            } else {
                console.error(result.message);
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            {isAuthenticated ? (
                <>
                    <View style={styles.form}>
                        <Button
                            onPress={goToList}
                            title="Liste"
                        />
                        <Divider inset={true} insetType="middle" style={styles.divider} />
                        <Button
                            onPress={goToHistorique}
                            title="Historique"
                        />
                        <Divider inset={true} insetType="middle" style={styles.divider} />
                        <Button
                            onPress={handleSignOut}
                            title="Sign out"
                        />
                    </View>
                </>
            ) : (
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
                </View>
            )}
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
    divider: {
        padding: 10,
    },
});

export default Home;