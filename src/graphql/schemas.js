import { gql } from 'apollo-server-express';

const typeDefs = gql`

  # Places Type
  type Lugar {
    id: ID!
    nombre: String!
    tipo: String!
    latitud: Float!
    longitud: Float!
    descripcion: String
  }


  input CreateLugarInput {
    nombre: String!
    tipo: String!
    latitud: Float!
    longitud: Float!
    descripcion: String
  }

  input UpdateLugarInput {
    id: ID!
    nombre: String!
    tipo: String!
    latitud: Float!
    longitud: Float!
    descripcion: String
  }

  input DeleteLugarInput {
    id: ID!
  }

  # TransportLine Type
  type LineaDeTransporte {
    id: ID!
    nombre: String!
    tipo: String!
    categoria: String!
    descripcion: String
    rutas: [Ruta]
  }

  # Routes Type
  type Ruta {
    id: ID!
    linea_id: String!
    tipo: String!
    nombre: String!
    descripcion: String
    obtenerRuta: RutaTrazada
  }

  # Coordinates Type
  type Coordenada {
    lat: Float!
    lng: Float!
  }

  # TracedRoutes Type
  type RutaTrazada {
    id: ID!
    coordenadas: [Coordenada!]!
  }

  type Query {
    lugares: [Lugar]
    lineas: [LineaDeTransporte]
    rutas: [Ruta]
    coordenada: [Coordenada]
    rutastrazadas: [RutaTrazada]

  }
`;

export default typeDefs;
