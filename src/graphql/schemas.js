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

  type Query {
    lugares: [Lugar]
  }
`;

export default typeDefs;
