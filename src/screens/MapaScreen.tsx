import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { mockPontos } from '../services/mockPontos';
import { PontoColeta, RootStackParamList } from '../types';
import { Colors } from '../theme/colors';

export default function MapaScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [pontoSelecionado, setPontoSelecionado] = useState<PontoColeta>(mockPontos[0]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Topo com Logo e Barra de Busca */}
            <View style={styles.header}>
                <View style={styles.logoRow}>
                    <View style={styles.logoIcon}>
                        <Ionicons name="sync" size={16} color="#FFF" />
                    </View>
                    <Text style={styles.logoText}>loop</Text>
                </View>

                <View style={styles.searchBox}>
                    <Ionicons name="search" size={18} color={Colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar nesta área"
                        placeholderTextColor={Colors.textSecondary}
                    />
                </View>
            </View>

            {/* Visualização Geográfica Prévia com Pins Interativos */}
            <View style={styles.mapContainer}>
                <Text style={styles.mapRegionTitle}>ALCÂNTARA · BELÉM</Text>

                {/* Pin 1 - Plástico */}
                <TouchableOpacity
                    style={[styles.pinWrapper, { top: 80, left: 60 }]}
                    onPress={() => setPontoSelecionado(mockPontos[0])}
                >
                    <View style={[styles.pinBubble, { backgroundColor: Colors.primaryDark }]}>
                        <Ionicons name="leaf" size={16} color="#FFF" />
                    </View>
                    <Text style={styles.pinLabel}>Plástico</Text>
                </TouchableOpacity>

                {/* Pin 2 - Baterias */}
                <TouchableOpacity
                    style={[styles.pinWrapper, { top: 65, right: 45 }]}
                    onPress={() => setPontoSelecionado(mockPontos[3])}
                >
                    <View style={[styles.pinBubble, { backgroundColor: '#9C5A16' }]}>
                        <Ionicons name="battery-charging" size={16} color="#FFF" />
                    </View>
                    <Text style={styles.pinLabel}>Baterias</Text>
                </TouchableOpacity>

                {/* Pin 3 - Eletrônico */}
                <TouchableOpacity
                    style={[styles.pinWrapper, { top: 145, right: 90 }]}
                    onPress={() => setPontoSelecionado(mockPontos[0])}
                >
                    <View style={[styles.pinBubble, { backgroundColor: '#1E463C' }]}>
                        <Ionicons name="laptop" size={16} color="#FFF" />
                    </View>
                    <Text style={styles.pinLabel}>Eletrônico</Text>
                </TouchableOpacity>

                {/* Pin 4 - Óleo */}
                <TouchableOpacity
                    style={[styles.pinWrapper, { bottom: 60, left: 45 }]}
                    onPress={() => setPontoSelecionado(mockPontos[1])}
                >
                    <View style={[styles.pinBubble, { backgroundColor: '#9C5A16' }]}>
                        <Ionicons name="water" size={16} color="#FFF" />
                    </View>
                    <Text style={styles.pinLabel}>Óleo</Text>
                </TouchableOpacity>

                <View style={styles.locateBtn}>
                    <Ionicons name="locate" size={20} color={Colors.textPrimary} />
                </View>
            </View>

            {/* Card Inferior do Ponto Selecionado */}
            <View style={styles.bottomCard}>
                <View style={styles.cardTop}>
                    <Image source={{ uri: pontoSelecionado.imagemUri }} style={styles.thumb} />
                    <View style={styles.cardInfo}>
                        <View style={styles.titleRow}>
                            <Text style={styles.cardTitle}>{pontoSelecionado.nome}</Text>
                            <Text style={styles.distText}>{pontoSelecionado.distanciaKm}</Text>
                        </View>
                        <Text style={styles.verifiedSub}>✓ Verificado</Text>
                        <Text style={styles.addrSub}>{pontoSelecionado.endereco}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.verBtn}
                    onPress={() => navigation.navigate('Detalhes', { ponto: pontoSelecionado })}
                >
                    <Ionicons name="arrow-forward" size={16} color="#FFF" />
                    <Text style={styles.verBtnText}>Ver Ecoponto</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
    header: { marginBottom: 12 },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
    logoIcon: { backgroundColor: Colors.primaryDark, padding: 5, borderRadius: 8 },
    logoText: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    searchInput: { flex: 1, paddingVertical: 10, marginLeft: 8, fontSize: 14 },
    mapContainer: {
        flex: 1,
        backgroundColor: '#E3ECE6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    mapRegionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#7A8F84',
        letterSpacing: 2,
    },
    pinWrapper: { position: 'absolute', alignItems: 'center' },
    pinBubble: { padding: 10, borderRadius: 22, elevation: 3 },
    pinLabel: {
        backgroundColor: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 4,
        color: Colors.textPrimary,
    },
    locateBtn: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 12,
    },
    bottomCard: {
        backgroundColor: Colors.surface,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardTop: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    thumb: { width: 64, height: 64, borderRadius: 12 },
    cardInfo: { flex: 1, justifyContent: 'center' },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between' },
    cardTitle: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
    distText: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary },
    verifiedSub: { fontSize: 12, color: Colors.primaryDark, fontWeight: '600', marginTop: 2 },
    addrSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
    verBtn: {
        backgroundColor: Colors.primaryDark,
        paddingVertical: 13,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    verBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});