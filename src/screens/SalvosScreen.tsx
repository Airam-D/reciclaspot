import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { mockPontos } from '../services/mockPontos';
import { PontoColeta, RootStackParamList } from '../types';
import { Colors } from '../theme/colors';

export default function SalvosScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const salvos = mockPontos.slice(0, 2);

    const renderItem = ({ item }: { item: PontoColeta }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { ponto: item })}
        >
            <View style={styles.cardTop}>
                <Image source={{ uri: item.imagemUri }} style={styles.thumb} />
                <View style={styles.info}>
                    <View style={styles.titleRow}>
                        <Text style={styles.cardTitle}>{item.nome}</Text>
                        <Ionicons name="bookmark" size={18} color={Colors.primaryDark} />
                    </View>
                    <Text style={styles.addr}>{item.endereco}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.verified}>✓ Verified</Text>
                        <Text style={styles.dist}>{item.distanciaKm}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.catsLine}>{item.categoriasAceitas.join('  ·  ')}</Text>

            <View style={styles.offlineFooter}>
                <View style={styles.offlineLeft}>
                    <Ionicons name="download-outline" size={14} color={Colors.textPrimary} />
                    <Text style={styles.offlineText}>Disponível offline</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoRow}>
                <View style={styles.logoIcon}>
                    <Ionicons name="sync" size={16} color="#FFF" />
                </View>
                <Text style={styles.logoText}>loop</Text>
            </View>

            <Text style={styles.title}>Seus lugares Salvos</Text>
            <Text style={styles.subtitle}>{salvos.length} Ecopontos, prontos para quando você precisar.</Text>

            <View style={styles.banner}>
                <Ionicons name="cloud-offline-outline" size={22} color={Colors.textPrimary} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.bannerTitle}>Sem sinal? Sem problemas</Text>
                    <Text style={styles.bannerDesc}>
                        Endereços salvos, horários e regras de descarte estão disponíveis para consulta offline.
                    </Text>
                </View>
            </View>

            <FlatList
                data={salvos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />

            <Text style={styles.syncNote}>
                ✓ Todos os locais sincronizados · Hoje, 09:32{'\n'}
                Instruções em tempo real exigem uma conexão com a internet.
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
    logoIcon: { backgroundColor: Colors.primaryDark, padding: 5, borderRadius: 8 },
    logoText: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
    title: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary },
    subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 4, marginBottom: 16 },
    banner: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: Colors.offlineBannerBg,
        padding: 14,
        borderRadius: 14,
        marginBottom: 16,
    },
    bannerTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 3 },
    bannerDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardTop: { flexDirection: 'row', gap: 12 },
    thumb: { width: 62, height: 62, borderRadius: 10 },
    info: { flex: 1 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardTitle: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
    addr: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
    verified: { fontSize: 12, color: Colors.primaryDark, fontWeight: '600' },
    dist: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
    catsLine: { fontSize: 11, color: Colors.textSecondary, marginVertical: 10 },
    offlineFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 10,
    },
    offlineLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    offlineText: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary },
    syncNote: {
        textAlign: 'center',
        fontSize: 11,
        color: Colors.textSecondary,
        lineHeight: 16,
        marginTop: 8,
    },
});
