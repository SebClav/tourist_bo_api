import { doc, getDoc } from 'firebase/firestore'; 

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

    async obtenerRuta(_, { nombreRuta }, { firebase }) {
      const firestore = firebase;
      const docRef = doc(firestore, "coordenadas_rutas", "rutas");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Documento de rutas no encontrado");
      }

      const rutas = docSnap.data();

      if (!rutas[nombreRuta]) {
        throw new Error(`Ruta "${nombreRuta}" no encontrada en la base de datos`);
      }

      const coordenadasRaw = rutas[nombreRuta];
      
      const coordenadas = coordenadasRaw.map((coord) => {
            return { 
              lat: coord.latitude, 
              lng: coord.longitude 
            };
        }); //Fetching coordinates from Firebase of the 'geopoint' type.

      return {
        id: nombreRuta,
        coordenadas
      };
    },
  }
};

export default resolvers;
