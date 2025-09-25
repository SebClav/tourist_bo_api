import { doc, getDoc } from 'firebase/firestore'; 

const resolvers = {
  Query: {
    //Select Place Graphql Query
    lugares: async (_, __, { db }) => {
      const [rows] = await db.execute('SELECT * FROM lugares');
      return rows;
    }, 
    //Select Transport Lines Query
    lineas: async (_, __, { db }) => {
      const [rows] = await db.execute('SELECT * FROM lineas_transporte');
      return rows;
    },
   rutas: async (_, __, { db, firebase }) => {
      const [rows] = await db.execute("SELECT * FROM rutas");

      const firestore = firebase;
      const docRef = doc(firestore, "coordenadas_rutas", "rutas");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Documento de coordenadas no encontrado en Firebase.");
      }

      const rutasCoordenadas = docSnap.data();

      const rutasCombinadas = rows.map((ruta) => {
        const coordenadasRaw = rutasCoordenadas[ruta.nombre];

        const coordenadas = coordenadasRaw?.map((coord) => ({
          lat: coord.latitude,
          lng: coord.longitude,
        })) || [];

        return {
          ...ruta,
          obtenerRuta: {
            id: ruta.nombre,
            coordenadas,
          },
        };
      });

      return rutasCombinadas;
    },
  },
  Mutation:{
    //Create Place Graphql Mutation
    createLugar: async (_, {input}, { db }) => {
      const { nombre, tipo, latitud, longitud, descripcion } = input;
      const [result] = await db.execute(
        `INSERT INTO lugares (nombre, tipo, latitud, longitud, descripcion) 
         VALUES (?, ?, ?, ?, ?)`,
        [nombre, tipo, latitud, longitud, descripcion]
      );
      return {
        nombre,
        tipo,
        latitud,
        longitud,
        descripcion,
      }; 
    },
    //Update Place Graphql Mutation
    updateLugar: async (_, {input}, { db }) => {
      const { nombre, tipo, latitud, longitud, descripcion, id } = input;
      await db.execute(
        `UPDATE lugares SET nombre = ?, tipo = ?, latitud = ?, longitud = ?, descripcion = ?) 
         WHERE id = ?`,
        [nombre, tipo, latitud, longitud, descripcion, id]
      );
    
    const [rows] = await db.execute('SELECT * FROM lugares WHERE id = ?', [id]);
    return rows[0];
      
    },
    //Delete Place Graphql Mutation
    deleteLugar: async (_, {input}, { db }) => {
      const { id } = input;
      await db.execute(
        `DELETE FROM lugares 
         WHERE id = ?`,
        [id]
      );
    
    const [rows] = await db.execute('SELECT * FROM lugares');
    return rows[0];
      
    }
  },
  LineaDeTransporte: {
    rutas: async (parent, _, { db }) => {
      const [rows] = await db.execute("SELECT * FROM rutas WHERE linea_id = ?", [parent.id]);
      return rows;
    }
  },

  Ruta: {
    obtenerRuta: async (parent, _, { firebase }) => {
      const docRef = doc(firebase, "coordenadas_rutas", "rutas");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return null;

      const rutas = docSnap.data();
      const coordenadasRaw = rutas[parent.nombre];

      if (!coordenadasRaw) return null;

      const coordenadas = coordenadasRaw.map((coord) => ({
        lat: coord.latitude,
        lng: coord.longitude,
      }));

      return {
        id: parent.nombre,
        coordenadas,
      };
    }
  }
};

export default resolvers;
