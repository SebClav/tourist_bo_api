const resolvers = {
  Query: {
    lugares: async (_, __, { db }) => {
      const [rows] = await db.execute('SELECT * FROM lugares');
      return rows;
    }
  }
};

export default resolvers;
