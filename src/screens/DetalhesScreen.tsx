import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { Colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ route, navigation }: Props) {
    const { ponto } = route.params;
    const [favorito, setFavorito] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Image source={{ uri: ponto.imagemUri }} style={styles.banner} />
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favBtn} onPress={() => setFavorito(!favorito)}>
                        <Ionicons
                            name={favorito ? 'heart' : 'heart-outline'}
                            size={20}
                            color={favorito ? Colors.primaryDark : Colors.textPrimary}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{ponto.nome}</Text>

                    <View style={styles.metaRow}>
                        <View style={styles.verifiedTag}>
                            <Ionicons name="checkmark-circle-outline" size={15} color={Colors.primaryDark} />
                            <Text style={styles.verifiedText}>Verificado</Text>
                        </View>
                        <Text style={styles.distanceMeta}>
                            A {ponto.distanciaKm} de distância · Coleta municipal
                        </Text>
                    </View>

                    <Text style={styles.sectionLabel}>O que você pode levar</Text>
                    <View style={styles.badgesRow}>
                        {ponto.categoriasAceitas.map((cat) => (
                            <View key={cat} style={styles.badge}>
                                <Text style={styles.badgeText}>{cat}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={20} color={Colors.primaryDark} />
                        <View>
                            <Text style={styles.statusOpen}>{ponto.statusAberto}</Text>
                            <Text style={styles.hoursSub}>{ponto.horarioFuncionamento}</Text>
                        </View>
                    </View>

                    <View style={styles.warningBox}>
                        <View style={styles.warningHeader}>
                            <Ionicons name="warning-outline" size={18} color={Colors.warningText} />
                            <Text style={styles.warningTitle}>Antes de deixar</Text>
                        </View>
                        <Text style={styles.warningBody}>{ponto.instrucoesAntesDeDeixar}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={22} color={Colors.textPrimary} />
                        <View>
                            <Text style={styles.addressMain}>{ponto.endereco}</Text>
                            <Text style={styles.hoursSub}>{ponto.cepCidade}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.routeBtn}>
                        <Ionicons name="navigate-outline" size={18} color="#FFF" />
                        <Text style={styles.routeBtnText}>Obter rotas</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.surface },
    banner: { width: '100%', height: 220 },
    backBtn: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
    },
    favBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
    },
    content: { padding: 20 },
    title: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6, marginBottom: 20 },
    verifiedTag: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    verifiedText: { fontSize: 13, color: Colors.primaryDark, fontWeight: '700' },
    distanceMeta: { fontSize: 12, color: Colors.textSecondary },
    sectionLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10 },
    badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 22 },
    badge: {
        backgroundColor: Colors.badgeGreenBg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    badgeText: { color: Colors.badgeGreenText, fontWeight: '700', fontSize: 12 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
    statusOpen: { fontSize: 15, fontWeight: '700', color: Colors.primaryDark },
    hoursSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
    warningBox: {
        backgroundColor: Colors.warningBg,
        padding: 16,
        borderRadius: 12,
        marginBottom: 22,
    },
    warningHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
    warningTitle: { fontSize: 15, fontWeight: '700', color: Colors.warningText },
    warningBody: { fontSize: 13, color: Colors.warningText, lineHeight: 20 },
    addressMain: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
    routeBtn: {
        backgroundColor: Colors.primaryDark,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    routeBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});