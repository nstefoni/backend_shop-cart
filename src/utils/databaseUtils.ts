import * as bcrypt from 'bcrypt';
import * as sqlite3 from 'better-sqlite3';

const db = new sqlite3('database.sqlite');

//inicializa la tabla de usuarios si no existe.
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

//guardar la base de datos en el archivo SQLite.
export async function saveToDatabase(data: any) {
  const insertUserStmt = db.prepare(`
    INSERT OR REPLACE INTO users (id, username, password)
    VALUES (?, ?, ?)
  `);
  for (const user of data.users) {
    insertUserStmt.run(user.id, user.username, user.password);
  }
}

//crear un nuevo usuario.
export async function createUser(
  username: string,
  password: string,
): Promise<any> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
    );
    const info = stmt.run(username, password);

    const newUser = {
      id: info.lastInsertRowid,
      username,
      password: hashedPassword,
    };

    return newUser;
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw new Error('El nombre de usuario ya está en uso');
    } else {
      throw error;
    }
  }
}

//buscar un usuario por su nombre de usuario.
export function findUserByUsername(username: string): any | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  const user = stmt.get(username);
  return user;
}
