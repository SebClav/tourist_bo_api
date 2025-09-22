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

  
  input CreateLineaDeTransporteInput {
    nombre: String!
    tipo: String!
    categoria: String!
    descripcion: String
    rutas: [Ruta]
  }

  input UpdateLineaDeTransporteInput {
    id: ID!
    nombre: String!
    tipo: String!
    categoria: String!
    descripcion: String
    rutas: [Ruta]
  }

  input DeleteLineaDeTransporteInput {
    id: ID!
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

    
  input CreateRutaInput {
    linea_id: String!
    tipo: String!
    nombre: String!
    descripcion: String
    obtenerRuta: RutaTrazada
  }

  input UpdateRutaInput {
    id: ID!
    linea_id: String!
    tipo: String!
    nombre: String!
    descripcion: String
    obtenerRuta: RutaTrazada
  }

  input DeleteRutaInput {
    id: ID!
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


  # Queries
  type Query {
    lugares: [Lugar]
    lineas: [LineaDeTransporte]
    rutas: [Ruta]
    coordenada: [Coordenada]
    rutastrazadas: [RutaTrazada]

  }

  # Mutations 
  type Mutation {
    # Places Mutation
    createLugar(input: CreateLugarInput!): Lugar!
    updateLugar(input: UpdateLugarInput!): Lugar!
    deleteLugar(input: DeleteLugarInput!): Lugar!
  }
`;

export default typeDefs;
