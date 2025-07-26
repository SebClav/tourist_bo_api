const resolvers = {
  Query: {
    lugares: async (_, __, { db }) => {
      const [rows] = await db.execute('SELECT * FROM lugares');
      return rows;
    },
    lineas: async (_, __, { db }) => {
      const [rows] = await db.execute('SELECT * FROM lineas_transporte');
      return rows;
    },
    rutas: async (_, __, { db }) => {
      const [rows] = await db.execute('SELECT * FROM rutas');
      return rows;
    }
  }
};

export default resolvers;
