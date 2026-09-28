import { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity,} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Editar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const produtos = [
    {
      nome: '...',
      responsavel: '..',
      vermais: '...',
    },
  ];

  return (
    <View style={styles.container}>

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

            <Text style={styles.logoutTexto}>
              DESLOGAR
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* TÍTULO */}
      <Text style={styles.titulo}>
        {'Boas-vindas ao\nEditar almoxarifado!'}
      </Text>

      {/* TABELA */}
      <ScrollView horizontal>
        <View style={styles.tabela}>

          {/* CABEÇALHO */}
          <View style={styles.linha}>
            <Text style={[styles.celula, styles.cabecalho]}>
              Nome
            </Text>

            <Text style={[styles.celula, styles.cabecalho]}>
              Responsável
            </Text>

            <Text style={[styles.celula, styles.cabecalho]}>
              Ver mais
            </Text>

        </View>    


          {/* PRODUTOS */}
          {produtos.map((produto, index) => (
            <View style={styles.linha} key={index}>

              <Text style={styles.celula}>
                {produto.nome}
              </Text>

              <Text style={styles.celula}>
                {produto.responsavel}
              </Text>

              <Text style={styles.celula}>
                {produto.vermais}
              </Text>

            </View>
          ))}

        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* NAVBAR */
  navbar: {
    height: 70,
    backgroundColor: '#1D3273',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 18,
    marginTop: 18,
  },

  menuButton: {
    marginRight: 10,
  },

  /* SIDEBAR */
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#1D3273',
    padding: 20,
    zIndex: 10,
  },

  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },

  sidebarTitulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  usuario: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5,
  },

  tipo: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 30,
  },

  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },

  logoutTexto: {
    color: ' #FFFFFF',
    fontWeight: 'bold',
  },

  
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    color: '#1D3273',
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },

  
  tabela: {
    borderWidth: 2,
    borderColor: ' #F28705',
    marginHorizontal: 9,
    borderRadius: 10,
  },

  linha: {
    flexDirection: 'row',
  },

  celula: {
    width: 150,
    padding: 13,
    borderWidth: 1,
    borderColor: ' #F28705',
  },

  cabecalho: {
    backgroundColor: '#FFFFF',
    fontWeight: 'bold',
  },

});
