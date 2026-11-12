import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { Colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoRow}>
                    <View style={styles.logoBadge}>
                        <Ionicons name="sync" size={24} color={Colors.primaryDark} />
                    </View>
                    <Text style={styles.logoText}>loop</Text>
                </View>

                <Text style={styles.title}>
                    TECNOLOGIA{'\n'}AMBIENTAL{'\n'}PARA CIDADES{'\n'}INTELIGENTES
                </Text>

                <Text style={styles.subtitle}>
                    Dê o destino correto aos seus resíduos. Faça a diferença, perto de casa.
                </Text>

                <View style={styles.locationTag}>
                    <Ionicons name="location-outline" size={16} color={Colors.primaryLight} />
                    <Text style={styles.locationText}>Feito para uma Brasil mais verde</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Ionicons name="arrow-forward" size={18} color={Colors.textPrimary} />
                    <Text style={styles.buttonText}>ENTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginHint}>Já faz parte do Green Code? Faça login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryDark,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    content: { marginTop: 28 },
    logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
    logoBadge: {
        backgroundColor: Colors.primaryLight,
        padding: 8,
        borderRadius: 12,
        marginRight: 10,
    },
    logoText: { color: '#FFF', fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
    title: {
        color: '#FFF',
        fontSize: 34,
        fontWeight: '900',
        lineHeight: 40,
        marginBottom: 20,
    },
    subtitle: {
        color: '#E0F2E9',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    locationTag: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    locationText: { color: '#E0F2E9', fontSize: 13 },
    footer: { marginBottom: 16, alignItems: 'center', gap: 16 },
    button: {
        backgroundColor: Colors.primaryLight,
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: { color: Colors.textPrimary, fontWeight: '800', fontSize: 15 },
    loginHint: { color: '#FFF', fontSize: 13, fontWeight: '500' },
});