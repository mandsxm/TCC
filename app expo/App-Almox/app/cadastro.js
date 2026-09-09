import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { useFonts} from '@expo-google-fonts/inter';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Cadastro() {

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Montserrat_400Regular,
  });

  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <View style={styles.background}>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuAberto(!menuAberto)}
        >
          <MaterialIcons
            name="menu"
            size={30}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/tabela')}>
          <Text style={styles.link}>ESTOQUE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/editar')}>
          <Text style={styles.link}>EDITAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/contas')}>
          <Text style={styles.link}>CONTAS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.link}>CADASTRO</Text>
        </TouchableOpacity>
      </View>

      {/* SIDEBAR */}
      {menuAberto && (
        <View style={styles.sidebar}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setMenuAberto(false)}
          >
            <MaterialIcons
              name="close"
              size={25}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.sidebarTitulo}>USUÁRIO</Text>
          <Text style={styles.usuario}>Róger</Text>
          <Text style={styles.tipo}>Usuário</Text>

          <TouchableOpacity
            style={styles.logout}
            onPress={() => router.replace('/login')}
          >
            <MaterialIcons
              name="logout"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.logoutTexto}>DESLOGAR</Text>
          </TouchableOpacity>
        </View>
      )}
        <View>
            <Text style={styles.titulo}>
                {"Boas-vindas ao\nCadastro de Usuários!"} {/* \n serve pra quebrar a linha, "Cadastro de Usuários!" fica embaixo de "Boas-vindas ao"*/}
            </Text>

            {/* FORMULÁRIO DE CADASTRO DE USUÁRIOS */}
            <Text style={styles.email}>
                Email
            </Text>
        
            <TextInput
                style={[
                    styles.input,
                    emailFocus && styles.inputFocus
                ]}
                placeholder="seunome@empresa.com"
                placeholderTextColor="#888"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                />
        
                <Text style={styles.senha}>
                    Senha
                </Text>
        
                <TextInput
                style={[
                    styles.input,
                    senhaFocus && styles.inputFocus
                ]}
                placeholder="Digite sua senha"
                placeholderTextColor="#888"
                onFocus={() => setSenhaFocus(true)}
                onBlur={() => setSenhaFocus(false)}
                />
        
                <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/tabela')}
                >
                <Text style={styles.buttonText}>
                    ENTRAR
                </Text>
                </TouchableOpacity>
        </View>            
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F0F1F2',
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    color: '#1D3273',
    marginBottom: 25,
    fontFamily: 'Poppins_700Bold',
  },
  navbar: {
    height: 60,
    backgroundColor: '#1D3273',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingLeft: 10,
    marginTop: 30,
    marginBottom: 30,
    zIndex: 10,
  },
  link: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 25,
    fontFamily: 'Poppins_700Bold',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 30,
    width: 250,
    height: '100%',
    backgroundColor: '#1D3273',
    zIndex: 100,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sidebarTitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 30,
  },
  usuario: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 5,
  },
  tipo: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 30,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  logoutTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});