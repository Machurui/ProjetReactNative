import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { FlatList } from 'react-native-gesture-handler';
import IP from '../model/IP';

const Historique = () => {
    const [listIP, setListIP] = useState<IP[]>([]);
    const [isGood, setIsGood] = useState(false);

    // Utilisez useEffect pour récupérer l'historique de recherche de l'utilisateur
    useEffect(() => {
        const storage = new MMKV();
        const historique = storage.getString("Historique");

        if (historique) {
            try {
                const historiqueParsed: IP[] = JSON.parse(historique);
                setListIP(historiqueParsed);
                setIsGood(true);
            } catch (error) {
                console.error("Erreur lors du parsing de l'historique:", error);
            }
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.list}>
                <Text style={styles.label}>Historique</Text>
                {isGood && listIP ? (
                    <FlatList
                        data={listIP}
                        renderItem={({ item }) => (
                            <View style={styles.list}>
                                <Text>IP: {item.IpAddress}</Text>
                                <Text>Type: {item.Type}</Text>
                                <Text>Continent: {item.Continent}</Text>
                                <Text>Country: {item.Country}</Text>
                                <Text>Région: {item.Region}</Text>
                                <Text>Ville: {item.City}</Text>
                                <Text>Latitude: {item.Latitude}</Text>
                                <Text>Longitude: {item.Longitude}</Text>
                                <Text>Flag: {item.Flag}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => `${item.IpAddress}-${index}`}
                    />
                ) : <Text>No data</Text>}
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
});

export default Historique;