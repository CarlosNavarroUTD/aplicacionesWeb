import mongoose from 'mongoose';

export const connectDBMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tu_basededatos'); // ← puerto correcto
    console.log("Conexión a MongoDB establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
};
