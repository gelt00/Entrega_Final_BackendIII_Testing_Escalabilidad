# Imagen base liviana y actualizada
FROM node:22-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar manifiestos de dependencias para aprovechar el almacenamiento en caché de capas Docker
COPY package*.json ./

# Instalar únicamente dependencias de producción y limpiar caché para reducir el tamaño de la imagen
RUN npm ci --only=production && npm cache clean --force

# Copiar el resto del código fuente del proyecto con los permisos correspondientes
COPY --chown=node:node . .

# Ajustar variables de entorno por defecto
ENV NODE_ENV=production \
    PORT=3000

# Usar usuario no-root por seguridad en contenedores
USER node

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando de inicio del servidor
CMD [ "npm", "run", "start" ]