# Gestor de Tareas

Proyecto de prueba pensado para desplegar en un VPS. Frontend hecho con **React 19 + TypeScript + Vite + Tailwind CSS v4**, sin backend: los datos se persisten en el navegador con `localStorage`.

## Funcionalidades

- Crear tareas
- Editar tareas en línea (Enter guarda, Esc cancela)
- Marcar / desmarcar como completadas
- Eliminar tareas individuales
- Filtros: Todas / Activas / Completadas (con contadores)
- Borrar todas las completadas de una vez
- Persistencia automática en `localStorage`
- Estados vacíos y diseño responsive

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build    # genera la carpeta dist/
npm run preview  # sirve el build localmente para verificarlo
```

## Despliegue en VPS

El resultado de `npm run build` es un sitio 100% estático (carpeta `dist/`). Solo hay que copiarla al servidor y servir con Nginx, Apache o Caddy, por ejemplo:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/gestor-tareas;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
