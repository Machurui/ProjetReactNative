import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, TextInput, StyleSheet, View, Text, Alert } from 'react-native';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { MMKV } from 'react-native-mmkv';
import { getAllStats } from '../controller/Api';
import { FlatList } from 'react-native-gesture-handler';
import { set } from 'firebase/database';


const List = () => {
    const [ip, setIp] = useState("");
    const [datas, setDatas] = useState<string[]>([]);
    const [isGood, setIsGood] = useState(false);
    const storage = new MMKV();

    const handleSubmit = async () => {
        try {
            if (ip) {
                const stats = await getAllStats(ip);
                if (stats.success) {
                    // Ajustez selon la structure réelle de vos données
                    setDatas(stats || []);
                    if (stats.length > 0) {
                        setIsGood(true);
                    }
                } else {
                    setIsGood(false);
                    Alert.alert("Invalid IP");
                }
            } else {
                setIsGood(false);
                Alert.alert("Empty IP");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setIsGood(true);

        // const interval = setInterval(() => {
        //     NetInfo.fetch().then(state => {
        //         if (state.isConnected) {
        //             console.log('Connected', 'You are connected to the internet');
        //         }
        //     });
        // }, 100000);

        // return () => {
        //     clearInterval(interval);
        // };
    }, []);

    return (
        <SafeAreaView>

            <Text style={styles.label}>IP</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the ip"
                value={ip}
                onChangeText={setIp}
            />
            <Button
                onPress={handleSubmit}
                title="Rechercher"
            />

            {isGood ? (
                <View>
                    <Text>IP: {datas.ip}</Text>
                    <Text>Type: {datas.type}</Text>
                    <Text>Continent: {datas.continent}</Text>
                    <Text>Country: {datas.country}</Text>
                    <Text>Région: {datas.region}</Text>
                    <Text>Ville: {datas.city}</Text>
                    <Text>Latitude: {datas.latitude}</Text>
                    <Text>Longitude: {datas.longitude}</Text>
                    <Text>Flag: {datas.flag.emoji}</Text>
                </View>
            ) : <Text>No data or invalid IP</Text>}
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

export default List;