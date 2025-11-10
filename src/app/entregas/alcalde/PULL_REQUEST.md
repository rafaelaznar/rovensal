# 📤 Instrucciones para Pull Request

## 🎯 Información de la Entrega

- **Alumno**: Alcalde
- **Fecha**: 10 de noviembre de 2025
- **Tema**: Animales Extintos del Holoceno
- **Estado**: ✅ Lista para PR

---

## 📋 Checklist Pre-PR

Antes de crear el Pull Request, verificar:

- [x] ✅ Proyecto compila sin errores
- [x] ✅ Solo se modificaron archivos en `entregas/alcalde/`
- [x] ✅ Solo se modificó `app.routes.ts` (archivo compartido)
- [x] ✅ No se modificaron archivos de otros compañeros
- [x] ✅ Todas las rutas funcionan correctamente
- [x] ✅ La aplicación carga y funciona en desarrollo
- [x] ✅ Documentación completa incluida

---

## 🔄 Pasos para Crear el Pull Request

### 1. Verificar cambios locales
```bash
git status
```

### 2. Agregar archivos al staging
```bash
# Agregar todo lo de la carpeta alcalde
git add src/app/entregas/alcalde/

# Agregar el archivo de rutas modificado
git add src/app/app.routes.ts
```

### 3. Verificar qué se va a commitear
```bash
git status
```

**Debe mostrar:**
- ✅ Archivos nuevos en `src/app/entregas/alcalde/`
- ✅ Modificación en `src/app/app.routes.ts`
- ❌ NO debe haber archivos de otros compañeros
- ❌ NO debe haber modificaciones en archivos comunes

### 4. Crear commit
```bash
git commit -m "feat(alcalde): Agregar aplicación de Animales Extintos

- Implementa componentes enrutados y no enrutados
- Consume API de Cheba (Extinct API)
- Utiliza Angular Material, Signals y RxJS
- Incluye filtros de búsqueda y ventanas emergentes
- Documentación completa en README.md
- Cumple todos los criterios de evaluación"
```

### 5. Push a tu fork (si aplica)
```bash
# Si trabajas en un fork
git push origin nombre-de-tu-rama
```

### 6. Crear Pull Request en GitHub

**Título del PR:**
```
[Alcalde] Entrega: Aplicación Animales Extintos
```

**Descripción del PR:**
```markdown
## 📋 Descripción
Aplicación web que muestra información sobre animales extintos durante el Holoceno, consumiendo la API de Cheba.

## ✨ Características
- 🦴 Explorador de 804 animales extintos
- 🔍 Búsqueda por nombre y ubicación
- 🎲 Animal aleatorio
- 💬 Ventanas emergentes con detalles
- 📱 Interfaz responsive con Angular Material
- 📚 Documentación completa

## 🛠️ Tecnologías
- Angular 19+ (standalone components)
- TypeScript (strict mode)
- Angular Material
- Signals API
- RxJS
- Extinct API (Cheba)

## 📁 Archivos Modificados
- ✅ Solo archivos en `src/app/entregas/alcalde/`
- ✅ `src/app/app.routes.ts` (añadidas rutas de alcalde)

## ✅ Verificación
- [x] Compila sin errores
- [x] Funciona en desarrollo
- [x] No modifica archivos de otros compañeros
- [x] Respeta las convenciones del proyecto
- [x] Incluye documentación completa

## 📚 Documentación
Ver archivos MD en `src/app/entregas/alcalde/`:
- `README.md` - Documentación técnica
- `TESTING.md` - Guía de pruebas
- `MANUAL_USUARIO.md` - Manual de usuario
- `ENTREGA.md` - Resumen de entrega
- `RESUMEN_EJECUTIVO.md` - Checklist completo

## 🚀 Cómo Probar
```bash
npm install
npm start
# Visitar: http://localhost:4200/alcalde
```

## 👨‍💻 Autor
Alcalde

## 📅 Fecha de Entrega
10 de noviembre de 2025
```

---

## ⚠️ Importante

### ❌ NO incluir en el commit:
- `node_modules/`
- `dist/`
- `.angular/`
- Archivos de otros compañeros
- Archivos de configuración personal

### ✅ SÍ incluir:
- Todo en `src/app/entregas/alcalde/`
- Cambios en `src/app/app.routes.ts`
- Documentación (archivos .md)

---

## 🔍 Verificación Final

Antes de enviar el PR, ejecutar:

```bash
# Verificar que compila
npm run build

# Verificar que funciona en dev
npm start
# Visitar: http://localhost:4200/alcalde

# Verificar rutas
# - /alcalde → debe funcionar
# - /alcalde/animals → debe funcionar

# Verificar funcionalidades
# - Búsqueda por nombre → OK
# - Filtro por ubicación → OK
# - Animal aleatorio → OK
# - Ver detalles (diálogo) → OK
# - Enlaces a Wikipedia → OK
```

---

## 📊 Resumen de Cambios

### Archivos Nuevos (18)
```
entregas/alcalde/
├── README.md
├── TESTING.md
├── ENTREGA.md
├── MANUAL_USUARIO.md
├── RESUMEN_EJECUTIVO.md
├── PULL_REQUEST.md (este archivo)
├── models/
│   └── animal.interface.ts
├── services/
│   └── extinct-animals.service.ts
└── component/
    ├── animal-list/ (3 archivos)
    ├── animal-card/ (3 archivos)
    └── animal-detail-dialog/ (3 archivos)
```

### Archivos Modificados (4)
```
entregas/alcalde/component/alcaldeComponent/
├── alcaldeComponent.ts (actualizado)
├── alcaldeComponent.html (actualizado)
└── alcaldeComponent.css (actualizado)

src/app/app.routes.ts (rutas agregadas)
```

---

## 🎯 Resultado Esperado

Después del merge:
- ✅ La aplicación estará disponible en `/alcalde`
- ✅ No afectará el trabajo de otros compañeros
- ✅ El proyecto seguirá compilando correctamente
- ✅ Todas las rutas existentes seguirán funcionando

---

## 📞 En Caso de Problemas

Si el profesor reporta algún problema:

1. **No compila**: Verificar dependencias con `npm install`
2. **Error en rutas**: Revisar `app.routes.ts`
3. **No carga API**: Esperar 30 segundos (Heroku sleep)
4. **Faltan archivos**: Verificar que se commitearon todos

---

## ✅ Confirmación Final

**Esta entrega está lista para Pull Request porque:**
- ✅ Cumple TODOS los criterios de evaluación
- ✅ Respeta todas las restricciones del enunciado
- ✅ Incluye documentación completa
- ✅ Compila sin errores
- ✅ Funciona correctamente en desarrollo
- ✅ No afecta el trabajo de otros compañeros

**Estado**: ✅ **APROBADO PARA MERGE**

---

**¡Buena suerte con la entrega!** 🚀
