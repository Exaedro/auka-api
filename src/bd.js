import mysql from 'mysql2/promise'

const CONFIGURACION = {
    user: process.env.BD_USUARIO,
    database: process.env.BD_BASE,
    password: process.env.BD_CONTRASENA,
    port: process.env.BD_PUERTO,
    host: process.env.BD_HOST
}

export async function query(sql, valores) {
    try {
        const conexion = await mysql.createConnection(CONFIGURACION)

        const [data] = await conexion.query(sql, valores)
        await conexion.end()

        return data.length == 0 ? null : data
    } catch(err) {
        console.error(err)
        throw new Error('No se pudo conectar con la base de datos.')
    }
}