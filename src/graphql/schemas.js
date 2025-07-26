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

  # TransportLine Type
  type LineaDeTransporte {
    id: ID!
    nombre: String!
    tipo: String!
    categoria: String!
    descripcion: String
  }

  # Routes Type
  type Ruta {
    id: ID!
    linea_id: String!
    tipo: String!
    nombre: String!
    descripcion: String
  }

  type Query {
    lugares: [Lugar]
    lineas: [LineaDeTransporte]
    rutas: [Ruta]
  }
`;

export default typeDefs;
