# Utiliser une image officielle Node.js comme image de base
FROM node:16

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application dans le répertoire de travail
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser une image Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits dans le dossier où Nginx attend les fichiers
COPY --from=0 /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
