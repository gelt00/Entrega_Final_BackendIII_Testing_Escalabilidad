# API REST - Sistema de Ecommerce y Adopciones (Backend 3)

Proyecto backend desarrollado en **Node.js (Express)** con arquitectura multicapa y pruebas funcionales con **Jest** y **Supertest**, además de paquetización con **Docker**.

## 📌 Enlaces del Proyecto

- **Repositorio GitHub**: `https://github.com/gelt00/Entrega_Final_BackendIII_Testing_Escalabilidad`
- **Imagen en DockerHub**: `https://hub.docker.com/r/gelt0/entrega_final_backend3`

---

## 🛠️ Tecnologías y Arquitectura

- **Node.js (ES Modules)** + **Express 5**
- **MongoDB** + **Mongoose ODM**
- **Jest** + **Supertest**
- **Docker** (Imagen optimizada basada en `node:22-alpine` y ejecutor no-root)
- **Swagger / OpenAPI** (`/api/docs`)

---

## 🚀 Instrucciones de Ejecución

### 1. Clonar el Repositorio

```bash
git clone https://github.com/gelt00/Entrega_Final_BackendIII_Testing_Escalabilidad
cd Entrega_Final_BackendIII_Testing_Escalabilidad
```

### 2. Instalación de Dependencias Localmente

```bash
npm install
```

### 3. Poblar la Base de Datos

Para cargar datos iniciales de prueba (usuarios, productos y mascotas disponibles) en MongoDB:

```bash
npm run seed
```

### 4. Ejecutar la Suite de Pruebas Funcionales

Para ejecutar los tests funcionales con mocks del router de adopciones:

```bash
npm test tests/adoption.test.js
```

Para correr toda la suite de tests y ver la cobertura:

```bash
npm run test:coverage
```

### 5. Construcción y Ejecución con Docker

#### Construir la imagen localmente:

```bash
docker build -t entrega_final_backend3:1.0.0 .
```

#### Ejecutar el contenedor:

```bash
docker run -d -p 3000:3000 --name api-adoption-container entrega_final_backend3:1.0.0
```

#### Verificar logs del contenedor:

```bash
docker logs -f api-adoption-container
```

#### Probar endpoints en ejecución:

- **Healthcheck**: `http://localhost:3000/api/health`
- **Adopciones**: `http://localhost:3000/api/adoptions`
- **Mascotas**: `http://localhost:3000/api/pets`
- **Documentación Swagger**: `http://localhost:3000/api/docs`

---

## 📊 Evidencia de Pruebas Funcionales (`adoption.router.js`)

```text
PASS tests/adoption.test.js
  Router de Adopciones: GET & POST /api/adoptions
    GET /api/adoptions -> Obtener todas las adopciones
      ✓ Debería retornar 200 y el listado de adopciones (22 ms)
      ✓ Debería manejar errores y pasar al middleware de errores (3 ms)
    GET /api/adoptions/:aid -> Obtener adopción por ID
      ✓ Debería retornar 200 y la adopción si existe (4 ms)
      ✓ Debería retornar 404 si la adopción no existe (3 ms)
    POST /api/adoptions/:uid/:pid -> Crear registro de adopción
      ✓ Debería crear una adopción exitosamente (Status 201) (3 ms)
      ✓ Debería retornar 404 si el usuario no existe (3 ms)
      ✓ Debería retornar 404 si la mascota no existe (2 ms)
      ✓ Debería retornar 400 si la mascota ya fue adoptada previamente (2 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.7 s
```
