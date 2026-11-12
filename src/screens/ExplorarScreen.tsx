import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { mockPontos } from '../services/mockPontos';
import { PontoColeta, RootStackParamList } from '../types';
import { Colors } from '../theme/colors';

const FILTROS = [
    { nome: 'Eletrônico', icone: 'laptop-outline' as const, bg: Colors.badgeBlueBg, cor: Colors.badgeBlueText },
    { nome: 'Óleo', icone: 'water-outline' as const, bg: Colors.badgeYellowBg, cor: Colors.badgeYellowText },
    { nome: 'Baterias', icone: 'battery-charging-outline' as const, bg: Colors.badgeOrangeBg, cor: Colors.badgeOrangeText },
    { nome: 'Plástico', icone: 'leaf-outline' as const, bg: Colors.badgeGreenBg, cor: Colors.badgeGreenText },
];

export default function ExplorarScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [busca, setBusca] = useState('');
    const [filtroAtivo, setFiltroAtivo] = useState<string | null>(null);
    const [favoritos, setFavoritos] = useState<string[]>(['1', '2']);

    const toggleFavorito = (id: string) => {
        setFavoritos((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const pontosFiltrados = mockPontos.filter((item) => {
        const matchBusca =
            item.nome.toLowerCase().includes(busca.toLowerCase()) ||
            item.endereco.toLowerCase().includes(busca.toLowerCase());
        const matchFiltro = !filtroAtivo || item.categoriasAceitas.includes(filtroAtivo);
        return matchBusca && matchFiltro;
    });

    const renderCard = ({ item }: { item: PontoColeta }) => {
        const isFav = favoritos.includes(item.id);
        return (
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.92}
                onPress={() => navigation.navigate('Detalhes', { ponto: item })}
            >
                <View>
                    <Image source={{ uri: item.imagemUri }} style={styles.cardImage} />
                    <View style={styles.timeBadge}>
                        <Ionicons name="time-outline" size={12} color={Colors.primaryDark} />
                        <Text style={styles.timeBadgeText}>Aberto até 18:00</Text>
                    </View>
                    <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFavorito(item.id)}>
                        <Ionicons
                            name={isFav ? 'heart' : 'heart-outline'}
                            size={18}
                            color={isFav ? Colors.primaryDark : Colors.textPrimary}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardTitle}>{item.nome}</Text>
                        <Text style={styles.distanceText}>{item.distanciaKm}</Text>
                    </View>

                    <View style={styles.addressRow}>
                        <Text style={styles.addressText}>{item.endereco}, São Paulo</Text>
                        <View style={styles.verifiedRow}>
                            <Ionicons name="checkmark-circle-outline" size={14} color={Colors.primaryDark} />
                            <Text style={styles.verifiedText}>Verificado</Text>
                        </View>
                    </View>

                    <View style={styles.badgesRow}>
                        {item.categoriasAceitas.map((cat) => (
                            <View key={cat} style={styles.catBadge}>
                                <Text style={styles.catBadgeText}>{cat}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topHeader}>
                {/* Header Logo + Sino */}
                <View style={styles.brandRow}>
                    <View style={styles.logoRow}>
                        <View style={styles.logoIcon}>
                            <Ionicons name="sync" size={16} color="#FFF" />
                        </View>
                        <Text style={styles.logoText}>loop</Text>
                    </View>
                    <TouchableOpacity style={styles.bellBtn}>
                        <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.locationSmall}>📍 São Paulo, Brasil ⌄</Text>
                <Text style={styles.mainGreeting}>Para onde vai?</Text>

                <View style={styles.searchBox}>
                    <Ionicons name="search" size={18} color={Colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Procurar por lugares ou materiais"
                        placeholderTextColor={Colors.textSecondary}
                        value={busca}
                        onChangeText={setBusca}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                    {FILTROS.map((filtro) => {
                        const ativo = filtroAtivo === filtro.nome;
                        return (
                            <TouchableOpacity
                                key={filtro.nome}
                                style={[
                                    styles.filterChip,
                                    { backgroundColor: filtro.bg },
                                    ativo && styles.filterChipActive,
                                ]}
                                onPress={() => setFiltroAtivo(ativo ? null : filtro.nome)}
                            >
                                <Ionicons name={filtro.icone} size={14} color={filtro.cor} />
                                <Text style={[styles.filterText, { color: filtro.cor }]}>{filtro.nome}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Próximos Ecopontos</Text>
                    <Text style={styles.sortText}>Mais Próximo ⇅</Text>
                </View>
            </View>

            <FlatList
                data={pontosFiltrados}
                keyExtractor={(item) => item.id}
                renderItem={renderCard}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    topHeader: { paddingHorizontal: 16, paddingTop: 10 },
    brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    logoIcon: { backgroundColor: Colors.primaryDark, padding: 5, borderRadius: 8 },
    logoText: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
    bellBtn: {
        backgroundColor: Colors.surface,
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    locationSmall: { fontSize: 12, color: Colors.textSecondary },
    mainGreeting: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary, marginVertical: 6 },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 12,
    },
    searchInput: { flex: 1, paddingVertical: 10, marginLeft: 8, fontSize: 14, color: Colors.textPrimary },
    filterScroll: { marginBottom: 14 },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginRight: 8,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    filterChipActive: { borderColor: Colors.primaryDark },
    filterText: { fontSize: 12, fontWeight: '700' },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
    sortText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
    listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardImage: { width: '100%', height: 145 },
    timeBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary },
    heartBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFF',
        padding: 7,
        borderRadius: 20,
    },
    cardBody: { padding: 14 },
    cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
    distanceText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
    addressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, marginBottom: 10 },
    addressText: { fontSize: 13, color: Colors.textSecondary, flex: 1 },
    verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    verifiedText: { fontSize: 12, color: Colors.primaryDark, fontWeight: '600' },
    badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    catBadge: { flexDirection: 'row', alignItems: 'center' },
    catBadgeText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
});
