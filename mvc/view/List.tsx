import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, TextInput, StyleSheet, View, Text, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Divider } from '@rneui/themed';
import { MMKV } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';
import { getAllStats } from '../controller/Api';
import IP from '../model/IP';
import { set } from 'firebase/database';

const List = () => {
    const navigation = useNavigation();
    const [ip, setIp] = useState("");
    const [listIP, setListIP] = useState<IP | null>(null);
    const [histIP, setHistIP] = useState<IP[]>([]);
    const [isGood, setIsGood] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const storage = new MMKV();

    useEffect(() => {

        // Vérifie si l'utilisateur est en ligne toutes les 15 secondes
        const interval = setInterval(() => {
            NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                    console.log('Not connected', 'You are not connected to the internet');
                    setIsOnline(false);
                    setIsDisabled(true);
                } else {
                    console.log('Connected', 'You are connected to the internet');
                    setIsOnline(true);
                    setIsDisabled(false);
                }
            });
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    // Fonction pour naviguer vers la page d'historique
    const Historique = () => {
        navigation.navigate('Hist' as never);
    }

    // Fonction pour soumettre le formulaire
    const handleSubmit = async () => {
        try {
            // Vérifie si l'IP est vide
            if (!ip) {
                setIsGood(false);
                Alert.alert("Empty IP");
                return;
            }

            // Vérifie si l'utilisateur est en ligne
            if (!isOnline) {
                setIsGood(false);
                Alert.alert("Offline");
                return;
            }

            // Récupère toutes les stats de l'API
            const stats = await getAllStats(ip);
            if (!stats.success) {
                setIsGood(false);
                Alert.alert("Invalid IP");
                return;
            }

            // Stocke les données de l'API dans une interface IP
            const ipData: IP = {
                IpAddress: stats.ip,
                Type: stats.type,
                Continent: stats.continent,
                Country: stats.country,
                Region: stats.region,
                City: stats.city,
                Latitude: stats.latitude,
                Longitude: stats.longitude,
                Flag: stats.flag.emoji,
            };

            // Met à jour listIP et isGood
            setListIP(ipData);
            setIsGood(true);

            // Met à jour histIP et le stockage local de manière synchronisée
            setHistIP(prevHistIP => {
                const updatedHistIP = [...prevHistIP, ipData];
                storage.set("Historique", JSON.stringify(updatedHistIP));
                console.log(updatedHistIP);

                return updatedHistIP;
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>IP</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the ip"
                    value={ip}
                    onChangeText={setIp}
                />
                <Button onPress={handleSubmit} title="Rechercher" disabled={isDisabled} />
                <Divider inset={true} insetType="middle" style={styles.divider} />
                <Button onPress={Historique} title="Historique" />
            </View>
            <View style={styles.list}>
                {isGood && listIP ? (
                    <View>
                        <Text>IP: {listIP.IpAddress}</Text>
                        <Text>Type: {listIP.Type}</Text>
                        <Text>Continent: {listIP.Continent}</Text>
                        <Text>Country: {listIP.Country}</Text>
                        <Text>Région: {listIP.Region}</Text>
                        <Text>Ville: {listIP.City}</Text>
                        <Text>Latitude: {listIP.Latitude}</Text>
                        <Text>Longitude: {listIP.Longitude}</Text>
                        <Text>Flag: {listIP.Flag}</Text>
                    </View>
                ) : <Text>No data or invalid IP</Text>}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    list: {
        justifyContent: "center",
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        alignItems: "center",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 20,
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
        padding: 4,
    },
});

export default List;