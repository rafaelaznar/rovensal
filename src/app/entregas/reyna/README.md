# Proyecto Angular - [Reyna]

Este proyecto forma parte del repositorio [rovensal](https://github.com/rafaelaznar/rovensal).  
Se encuentra dentro de la carpeta `/src/app/reyna`.

---

## Descripción general

Aplicación web desarrollada con **Angular standalone**, que consume la **FakeStore API** para mostrar una lista de productos, su detalle individual y categorías.

El objetivo es practicar:
- Creación de componentes enrutados y no enrutados  
- Inyección de servicios  
- Consumo de APIs REST usando `HttpClient`  
- Comunicación entre componentes  
- Control del flujo en la plantilla (`@if`, `@for`)  
- Tipado fuerte en TypeScript  
- Angular Material y Bootstrap para diseño y modales
---

## API utilizada

**FakeStore API**  
🔗 https://fakestoreapi.com/

### Endpoints usados:
- `/products` → obtener lista de productos  
- `/products/:id` → obtener detalle de un producto  
- `/products/category/:category` → productos por categoría, hago uso también con esto de ruta parametrizada
- `/categories` → lista de categorías disponibles  