import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { Colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [perfilTipo, setPerfilTipo] = useState<'cidadao' | 'voluntario'>('cidadao');
    const [modoAuth, setModoAuth] = useState<'entrar' | 'criar'>('entrar');
    const [email, setEmail] = useState('sofia.martins@email.com');
    const [senha, setSenha] = useState('1234567890123');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.logoRow}>
                    <View style={styles.logoIcon}>
                        <Ionicons name="sync" size={18} color="#FFF" />
                    </View>
                    <Text style={styles.logoText}>loop</Text>
                </View>

                <Text style={styles.title}>É bom ter você aqui.</Text>
                <Text style={styles.subtitle}>Escolha como você fará a diferença.</Text>

                {/* Seletor Cidadão / Voluntário */}
                <View style={styles.roleRow}>
                    <TouchableOpacity
                        style={[styles.roleCard, perfilTipo === 'cidadao' && styles.roleCardActive]}
                        onPress={() => setPerfilTipo('cidadao')}
                    >
                        <View style={styles.roleHeader}>
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={perfilTipo === 'cidadao' ? Colors.primaryDark : Colors.textSecondary}
                            />
                            <Ionicons
                                name={perfilTipo === 'cidadao' ? 'checkmark-circle' : 'ellipse-outline'}
                                size={18}
                                color={perfilTipo === 'cidadao' ? Colors.primaryDark : Colors.border}
                            />
                        </View>
                        <Text style={styles.roleTitle}>Cidadão</Text>
                        <Text style={styles.roleDesc}>Encontre e descarte de forma responsável</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.roleCard, perfilTipo === 'voluntario' && styles.roleCardActive]}
                        onPress={() => setPerfilTipo('voluntario')}
                    >
                        <View style={styles.roleHeader}>
                            <Ionicons
                                name="heart-outline"
                                size={20}
                                color={perfilTipo === 'voluntario' ? Colors.primaryDark : Colors.textSecondary}
                            />
                            <Ionicons
                                name={perfilTipo === 'voluntario' ? 'checkmark-circle' : 'ellipse-outline'}
                                size={18}
                                color={perfilTipo === 'voluntario' ? Colors.primaryDark : Colors.border}
                            />
                        </View>
                        <Text style={styles.roleTitle}>Voluntário</Text>
                        <Text style={styles.roleDesc}>Ajude sua comunidade Local</Text>
                    </TouchableOpacity>
                </View>

                {/* Abas Entrar / Criar Conta */}
                <View style={styles.tabSwitch}>
                    <TouchableOpacity
                        style={[styles.tabOption, modoAuth === 'entrar' && styles.tabOptionActive]}
                        onPress={() => setModoAuth('entrar')}
                    >
                        <Text style={[styles.tabText, modoAuth === 'entrar' && styles.tabTextActive]}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabOption, modoAuth === 'criar' && styles.tabOptionActive]}
                        onPress={() => setModoAuth('criar')}
                    >
                        <Text style={[styles.tabText, modoAuth === 'criar' && styles.tabTextActive]}>
                            Criar Conta
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Sua Senha</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={!mostrarSenha}
                    />
                    <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                        <Ionicons
                            name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color={Colors.textSecondary}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotBtn}>
                    <Text style={styles.forgotText}>Esqueceu a Senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => navigation.replace('MainTabs')}
                >
                    <Ionicons name="arrow-forward" size={18} color="#FFF" />
                    <Text style={styles.submitText}>
                        Entrar como {perfilTipo === 'cidadao' ? 'cidadão' : 'voluntário'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.orDivider}>or</Text>

                {/* Botões Sociais */}
                <TouchableOpacity style={styles.socialBtn} onPress={() => navigation.replace('MainTabs')}>
                    <Ionicons name="logo-apple" size={20} color={Colors.textPrimary} />
                    <Text style={styles.socialText}>Continuar com Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialBtn} onPress={() => navigation.replace('MainTabs')}>
                    <Ionicons name="mail-outline" size={20} color={Colors.primaryDark} />
                    <Text style={styles.socialText}>Continuar com Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialBtn} onPress={() => navigation.replace('MainTabs')}>
                    <Ionicons name="logo-microsoft" size={18} color="#00A4EF" />
                    <Text style={styles.socialText}>Continuar com Microsoft</Text>
                </TouchableOpacity>

                <View style={styles.securityFooter}>
                    <Ionicons name="shield-checkmark-outline" size={14} color={Colors.primaryDark} />
                    <Text style={styles.securityText}>
                        Seus dados permanecem seguros. Seu impacto cresce.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scrollContent: { padding: 20, paddingBottom: 32 },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    logoIcon: { backgroundColor: Colors.primaryDark, padding: 6, borderRadius: 8 },
    logoText: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
    title: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary },
    subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 4, marginBottom: 18 },
    roleRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
    roleCard: {
        flex: 1,
        backgroundColor: Colors.surface,
        padding: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    roleCardActive: { borderColor: Colors.primaryDark, backgroundColor: '#F0F9F4' },
    roleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    roleTitle: { fontWeight: '700', fontSize: 15, color: Colors.textPrimary, marginTop: 8 },
    roleDesc: { fontSize: 11, color: Colors.textSecondary, marginTop: 3, lineHeight: 15 },
    tabSwitch: {
        flexDirection: 'row',
        backgroundColor: '#E6ECE9',
        borderRadius: 10,
        padding: 3,
        marginBottom: 16,
    },
    tabOption: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
    tabOptionActive: { backgroundColor: Colors.surface },
    tabText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
    tabTextActive: { color: Colors.textPrimary, fontWeight: '700' },
    label: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 6 },
    input: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 14,
        fontSize: 14,
        color: Colors.textPrimary,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        marginBottom: 8,
    },
    passwordInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: Colors.textPrimary },
    forgotBtn: { alignSelf: 'flex-end', marginBottom: 16 },
    forgotText: { fontSize: 12, color: Colors.primaryDark, fontWeight: '600' },
    submitBtn: {
        backgroundColor: Colors.primaryDark,
        paddingVertical: 15,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    submitText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
    orDivider: { textAlign: 'center', color: Colors.textSecondary, fontSize: 12, marginVertical: 14 },
    socialBtn: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        paddingVertical: 13,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    socialText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
    securityFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginTop: 10,
    },
    securityText: { fontSize: 11, color: Colors.textSecondary },
});