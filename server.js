const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dbPath = path.resolve(__dirname, 'data' ,'tasks.db'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar base de datos SQLite
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:', err.message);
    } else {
        console.log('✅ Conectado a la base de datos SQLite.');
    }
});

// Crear tabla de tareas si no existe
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error('❌ Error al crear la tabla:', err.message);
    } else {
        console.log('📋 Tabla de tareas lista.');
        
        // Insertar datos de ejemplo
        const sampleTasks = [
            'Crear Dockerfile',
            'Configurar docker-compose.yml',
            'Probar la aplicación en contenedor',
            'Hacer push a Docker Hub'
        ];
        
        db.get("SELECT COUNT(*) as count FROM tasks", (err, row) => {
            if (err) {
                console.error('❌ Error al contar tareas:', err.message);
            } else if (row.count === 0) {
                console.log('🌱 Insertando datos de ejemplo...');
                sampleTasks.forEach(task => {
                    db.run("INSERT INTO tasks (text) VALUES (?)", [task]);
                });
            }
        });
    }
});

// =================== RUTAS API ===================

// GET /api/tasks - Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    db.all("SELECT * FROM tasks ORDER BY created_at DESC", (err, rows) => {
        if (err) {
            console.error('❌ Error al obtener tareas:', err.message);
            res.status(500).json({ error: 'Error al obtener tareas' });
        } else {
            res.json(rows);
        }
    });
});

// POST /api/tasks - Crear nueva tarea
app.post('/api/tasks', (req, res) => {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: 'El texto de la tarea es requerido' });
    }

    db.run("INSERT INTO tasks (text) VALUES (?)", [text.trim()], function(err) {
        if (err) {
            console.error('❌ Error al crear tarea:', err.message);
            res.status(500).json({ error: 'Error al crear la tarea' });
        } else {
            res.status(201).json({
                id: this.lastID,
                text: text.trim(),
                completed: false,
                message: 'Tarea creada exitosamente'
            });
        }
    });
});

// PUT /api/tasks/:id - Actualizar tarea (completar/descompletar)
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed, text } = req.body;

    let query = "";
    let params = [];

    if (completed !== undefined && text !== undefined) {
        query = "UPDATE tasks SET completed = ?, text = ? WHERE id = ?";
        params = [completed ? 1 : 0, text, id];
    } else if (completed !== undefined) {
        query = "UPDATE tasks SET completed = ? WHERE id = ?";
        params = [completed ? 1 : 0, id];
    } else if (text !== undefined) {
        query = "UPDATE tasks SET text = ? WHERE id = ?";
        params = [text, id];
    } else {
        return res.status(400).json({ error: 'Se requiere al menos completed o text' });
    }

    db.run(query, params, function(err) {
        if (err) {
            console.error('❌ Error al actualizar tarea:', err.message);
            res.status(500).json({ error: 'Error al actualizar la tarea' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Tarea no encontrada' });
        } else {
            res.json({ 
                message: 'Tarea actualizada exitosamente',
                changes: this.changes 
            });
        }
    });
});

// DELETE /api/tasks/:id - Eliminar tarea
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM tasks WHERE id = ?", [id], function(err) {
        if (err) {
            console.error('❌ Error al eliminar tarea:', err.message);
            res.status(500).json({ error: 'Error al eliminar la tarea' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Tarea no encontrada' });
        } else {
            res.json({ 
                message: 'Tarea eliminada exitosamente',
                changes: this.changes 
            });
        }
    });
});

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Ruta principal - Servir la aplicación web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('❌ Error del servidor:', err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Cerrar base de datos correctamente
process.on('SIGINT', () => {
    console.log('\n🔄 Cerrando servidor...');
    db.close((err) => {
        if (err) {
            console.error('❌ Error al cerrar la base de datos:', err.message);
        } else {
            console.log('✅ Base de datos cerrada correctamente.');
        }
        process.exit(0);
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 API disponible en http://localhost:${PORT}/api/tasks`);
    console.log(`🏥 Health check en http://localhost:${PORT}/api/health`);
});
