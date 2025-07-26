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

  # Places Type
  type LineaDeTransporte {
    id: ID!
    nombre: String!
    tipo: String!
    categoria: String!
    descripcion: String
  }


  type Query {
    lugares: [Lugar]
    lineas: [LineaDeTransporte]
  }
`;

export default typeDefs;
