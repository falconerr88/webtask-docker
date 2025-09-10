# 🐳 Docker Practice - Todo App

Una aplicación web de lista de tareas desarrollada para aprender Docker y contenerización.

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

## 📋 Descripción

Aplicación web full-stack que permite gestionar una lista de tareas con las siguientes funcionalidades:
- ✅ Crear nuevas tareas
- ✅ Marcar tareas como completadas
- ✅ Eliminar tareas
- ✅ API REST completa
- ✅ Totalmente contenerizada con Docker

**🤝 Desarrollado por:** Thiago Lovey Castelan con ayuda de Claude Sonnet 4  
**🐳 Contenerizado por:** Thiago Lovey Castelan  
**📅 Fecha:** Septiembre 2025

## 🚀 Inicio Rápido

### Opción 1: Docker Hub (Recomendada)
```bash
# Descargar y ejecutar desde Docker Hub
docker run -p 3000:3000 falconerr88/imagenes-pruebas:app-tasklist-node 
# Abrir en el navegador
open http://localhost:3000
```

### Opción 2: Clonar y construir
```bash
# Clonar el repositorio
git clone git@github.com:falconerr88/webtask-docker.git
cd mi-docker-app

# Construir y ejecutar
docker build -t mi-todoapp .
docker run -p 3000:3000 mi-todoapp

# Abrir en el navegador
open http://localhost:3000
```


## 🏗️ Arquitectura

```
📦 Docker Container
├── 🚀 Node.js + Express.js (Puerto 3000)
├── 🗃️ SQLite Database (Persistente)
├── 🎨 Frontend (HTML5 + CSS3 + JavaScript)
└── 📡 API REST (/api/tasks)
```

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de datos:** SQLite
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Contenerización:** Docker, 
- **Proxy:** Nginx (opcional)

## 📊 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas |
| POST | `/api/tasks` | Crear nueva tarea |
| PUT | `/api/tasks/:id` | Actualizar tarea |
| DELETE | `/api/tasks/:id` | Eliminar tarea |
| GET | `/api/health` | Health check |

### Ejemplo de uso de la API:

```bash
# Obtener todas las tareas
curl http://localhost:3000/api/tasks

# Crear nueva tarea
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"text":"Mi nueva tarea"}'

# Marcar tarea como completada
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

## 📁 Estructura del Proyecto

```
mi-docker-app/
├── 📄 Dockerfile              # Configuración de Docker
├── 📄 package.json            # Dependencias de Node.js
├── 📄 server.js               # Servidor Express + API
├── 📄 .dockerignore           # Archivos excluidos del build
├── 📂 public/                 # Archivos estáticos
│   └── 📄 index.html          # Frontend de la aplicación
├── 📂 data/                   # Base de datos SQLite (persistente)
└── 📄 README.md               # Este archivo
```

## 🔧 Desarrollo Local

```bash
# Clonar el repositorio
git clone git@github.com:falconerr88/webtask-docker.git 

cd mi-docker-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# O ejecutar en producción
npm start

# Abrir en el navegador
open http://localhost:3000
```

## 🐳 Comandos Docker Útiles

```bash
# Construir imagen
docker build -t mi-todoapp .

# Ejecutar contenedor
docker run -p 3000:3000 mi-todoapp

# Ejecutar en background
docker run -d -p 3000:3000 --name todoapp mi-todoapp

# Ver logs
docker logs todoapp

# Parar contenedor
docker stop todoapp

# Eliminar contenedor
docker rm todoapp

# Ver contenedores activos
docker ps
```


## 🌟 Características

- ✅ **Totalmente contenerizada** - Ejecuta en cualquier lugar con Docker
- ✅ **API REST completa** - CRUD operations
- ✅ **Interfaz moderna** - CSS3 con gradientes y animaciones
- ✅ **Health checks** - Monitoreo de la aplicación
- ✅ **Optimizada para producción** - Usuario no-root, multi-stage builds
- ✅ **Docker Compose ready** - Fácil orquestación

## 🔍 Health Check

La aplicación incluye un endpoint de health check:

```bash
curl http://localhost:3000/api/health
```

Respuesta:
```json
{
  "status": "OK",
  "timestamp": "2025-09-08T20:30:45.123Z",
  "uptime": 125.456,
  "environment": "production"
}
```

## 🚀 Despliegue

### Docker Hub
```bash
# Build y push
docker build -t tuusuario/mitodoapp:latest .
docker push tuusuario/mi-todoapp:latest
```

### Ejecutar desde Docker Hub
```bash
docker run -p 3000:3000 tuusuario/mi-todoapp:latest
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Thiago Lovey Castelan**
- Desarrollado con la asistencia de Claude Sonnet 4
- Proyecto de aprendizaje Docker - Septiembre 2025

## 🙏 Agradecimientos

- Claude Sonnet 4 por la asistencia en el desarrollo
- Comunidad Docker por la documentación
- Express.js y Node.js communities

---

⭐ **¡Dale una estrella al proyecto si te fue útil para aprender Docker!**
