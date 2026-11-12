export type CategoriaResiduo =
  | 'Eletrônicos'
  | 'Óleo Usado'
  | 'Pilhas/Baterias'
  | 'Recicláveis Gerais'
  | 'Medicamentos';

export interface PontoColeta {
  id: string;
  nome: string;
  categoria: CategoriaResiduo;
  categoriasAceitas: string[];
  endereco: string;
  cepCidade: string;
  bairro: string;
  distanciaKm: string;
  horarioFuncionamento: string;
  statusAberto: string;
  latitude: number;
  longitude: number;
  imagemUri: string;
  telefoneContato: string;
  aceitaEntulho: boolean;
  instrucoesAntesDeDeixar: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cidade: string;
  pontosReciclagem: number;
  fotoPerfilUri: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
  Detalhes: { ponto: PontoColeta };
};

export type BottomTabParamList = {
  Explorar: undefined;
  Mapa: undefined;
  Salvos: undefined;
  Perfil: undefined;
};