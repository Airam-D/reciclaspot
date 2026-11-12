import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockUsuario } from '../services/mockPontos';
import { Colors } from '../theme/colors';

export default function PerfilScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.logoRow}>
                    <View style={styles.logoIcon}>
                        <Ionicons name="sync" size={16} color="#FFF" />
                    </View>
                    <Text style={styles.logoText}>loop</Text>
                </View>

                <View style={styles.titleRow}>
                    <Text style={styles.headerTitle}>Seu perfil</Text>
                    <Ionicons name="options-outline" size={22} color={Colors.textPrimary} />
                </View>

                <View style={styles.userRow}>
                    <Image source={{ uri: mockUsuario.fotoPerfilUri }} style={styles.avatar} />
                    <View>
                        <Text style={styles.userName}>{mockUsuario.nome}</Text>
                        <Text style={styles.userCity}>{mockUsuario.cidade}</Text>
                        <View style={styles.roleBadge}>
                            <Ionicons name="leaf" size={12} color={Colors.primaryDark} />
                            <Text style={styles.roleText}>Cidadão</Text>
                        </View>
                    </View>
                </View>

                {/* Card Verde Escuro de Impacto */}
                <View style={styles.impactCard}>
                    <View style={styles.impactHeader}>
                        <Text style={styles.impactLabel}>SEU IMPACTO LOCAL</Text>
                        <Ionicons name="leaf-outline" size={20} color="#A3C9BE" />
                    </View>
                    <Text style={styles.impactValue}>
                        Descarte Consciente: {mockUsuario.pontosReciclagem}
                    </Text>
                    <Text style={styles.impactSub}>
                        {mockUsuario.pontosReciclagem} pequenas escolhas. Uma cidade mais limpa.
                    </Text>
                </View>

                {/* Menu de Opções */}
                <View style={styles.menuBox}>
                    <TouchableOpacity style={styles.menuRow}>
                        <Ionicons name="time-outline" size={20} color={Colors.textPrimary} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.menuTitle}>Histórico de descarte</Text>
                            <Text style={styles.menuSub}>Suas {mockUsuario.pontosReciclagem} entregas responsáveis</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.menuRow}>
                        <Ionicons name="person-outline" size={20} color={Colors.textPrimary} />
                        <Text style={[styles.menuTitle, { flex: 1 }]}>Dados pessoais</Text>
                        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.menuRow}>
                        <Ionicons name="shield-checkmark-outline" size={20} color={Colors.textPrimary} />
                        <Text style={[styles.menuTitle, { flex: 1 }]}>Privacidade e segurança</Text>
                        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.volunteerLink}>
                    <Ionicons name="heart-outline" size={16} color={Colors.primaryDark} />
                    <Text style={styles.volunteerText}>Quer fazer mais? Seja um voluntário</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.photoBtn}>
                    <Ionicons name="camera-outline" size={20} color="#FFF" />
                    <Text style={styles.photoBtnText}>Registrar nova foto de descarte</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
    logoIcon: { backgroundColor: Colors.primaryDark, padding: 5, borderRadius: 8 },
    logoText: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    headerTitle: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary },
    userRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
    avatar: { width: 64, height: 64, borderRadius: 32 },
    userName: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
    userCity: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.badgeGreenBg,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 6,
    },
    roleText: { fontSize: 12, color: Colors.primaryDark, fontWeight: '700' },
    impactCard: { backgroundColor: Colors.cardImpacto, padding: 20, borderRadius: 16, marginBottom: 20 },
    impactHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    impactLabel: { color: '#A3C9BE', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
    impactValue: { color: '#FFF', fontSize: 22, fontWeight: '800', marginVertical: 8 },
    impactSub: { color: '#D1E5DF', fontSize: 13 },
    menuBox: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
    menuTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
    menuSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
    divider: { height: 1, backgroundColor: Colors.border, marginVertical: 10 },
    volunteerLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 },
    volunteerText: { fontSize: 13, fontWeight: '600', color: Colors.primaryDark },
    photoBtn: {
        backgroundColor: Colors.primaryDark,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    photoBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});
