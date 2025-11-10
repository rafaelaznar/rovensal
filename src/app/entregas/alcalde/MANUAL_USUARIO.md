# 🦴 Manual de Usuario - Animales Extintos

## 🌟 Bienvenido

Esta aplicación te permite explorar más de 800 especies animales que se extinguieron durante el Holoceno (últimos 11.650 años). Descubre información fascinante sobre animales perdidos, sus ubicaciones y sus historias.

## 🚀 Acceso a la Aplicación

1. Abre tu navegador web
2. Navega a: `http://localhost:4200/alcalde`
3. La aplicación cargará automáticamente la lista de animales

## 📖 Características Principales

### 1. 🔍 Búsqueda por Nombre
- Escribe en el campo "Buscar por nombre"
- Busca por nombre común (ej: "Kioea") o nombre científico (ej: "Chaetoptila")
- Los resultados se filtran en tiempo real mientras escribes

### 2. 🌍 Filtrar por Ubicación
- Usa el campo "Filtrar por ubicación"
- Escribe un país o región (ej: "Hawaii", "Australia", "New Zealand")
- Combina con búsqueda por nombre para filtros más precisos

### 3. 📊 Controlar Cantidad de Animales
- Usa el selector desplegable para elegir cuántos animales ver
- Opciones disponibles: 10, 20, 50 o 100 animales
- La aplicación recargará los datos automáticamente

### 4. 🎲 Animal Aleatorio
- Haz clic en el botón "🎲 Animal aleatorio"
- La aplicación mostrará un animal al azar
- Perfecto para descubrir especies nuevas

### 5. 🔄 Recargar Datos
- Haz clic en "🔄 Recargar" para obtener nuevos datos de la API
- Útil si quieres ver diferentes animales con la misma cantidad

### 6. 🗑️ Limpiar Filtros
- Haz clic en "🗑️ Limpiar filtros"
- Elimina todos los filtros aplicados
- Vuelve a la vista completa de animales

## 🃏 Tarjetas de Animales

Cada animal se muestra en una tarjeta con:

- **📸 Imagen** del animal (si está disponible)
- **🏷️ Nombre común** y nombre científico
- **📝 Descripción corta** del animal
- **📍 Ubicación** donde habitaba
- **📅 Último registro** conocido
- **🔗 Botones de acción**:
  - "Ver más" - Abre detalles completos
  - "Wikipedia" - Abre la página de Wikipedia

## 💬 Ventana de Detalles

Al hacer clic en "Ver más":

1. Se abre una ventana emergente con información detallada
2. Incluye imagen más grande (si está disponible)
3. Muestra todos los datos del animal:
   - Nombre científico completo
   - Nombre común
   - Descripción extensa
   - Ubicación detallada
   - Fecha del último registro
4. Botones disponibles:
   - "Cerrar" - Cierra la ventana
   - "Ver en Wikipedia" - Abre Wikipedia en nueva pestaña

## 🎨 Leyenda de Iconos

- 🔍 = Búsqueda
- 🌍 = Ubicación
- 📊 = Cantidad
- 🔄 = Recargar
- 🎲 = Aleatorio
- 🗑️ = Limpiar
- 📍 = Ubicación geográfica
- 📅 = Fecha
- 📸 = Imagen
- 🏷️ = Nombre

## 💡 Consejos de Uso

### Búsqueda Efectiva
- Usa términos específicos para mejores resultados
- Prueba tanto nombres comunes como científicos
- Combina filtros de nombre y ubicación

### Exploración
- Usa "Animal aleatorio" para descubrir especies desconocidas
- Experimenta con diferentes cantidades para ver variedad
- Lee las descripciones para aprender sobre cada animal

### Rendimiento
- Usa cantidades menores (10-20) para carga más rápida
- La primera carga puede tardar más (la API está en Heroku)
- Los filtros funcionan instantáneamente sin llamar a la API

## ⚠️ Notas Importantes

1. **Primera carga lenta**: La API puede tardar ~30 segundos en despertar
2. **Animales sin imagen**: 220 de 804 animales no tienen imagen
3. **Información en inglés**: Los datos provienen de Wikipedia en inglés
4. **Conexión requerida**: Necesitas internet para cargar datos

## 🐛 Problemas Comunes

### No se cargan animales
- **Solución**: Espera 30 segundos y haz clic en "Recargar"
- La API puede estar "dormida" (Heroku)

### No aparece imagen
- **Solución**: Es normal, algunos animales no tienen imagen disponible
- Se muestra un placeholder "Sin imagen disponible"

### Búsqueda sin resultados
- **Solución**: Verifica la ortografía o usa menos términos específicos
- Haz clic en "Limpiar filtros" y vuelve a intentar

### Página lenta
- **Solución**: Reduce la cantidad de animales mostrados (usa 10 o 20)
- Cierra ventanas de detalles que no uses

## 🎓 Información Educativa

Esta aplicación es ideal para:
- 📚 Estudiantes de biología y conservación
- 🔬 Investigadores de extinción
- 🌱 Entusiastas de la naturaleza
- 👨‍🏫 Educadores ambientales
- 🦕 Curiosos sobre historia natural

## 📊 Datos Disponibles

- **Total de animales**: 804 especies
- **Con imagen**: 584 especies
- **Sin imagen**: 220 especies
- **Período**: Últimos 11.650 años (Holoceno)
- **Fuente**: Wikipedia

## 🔗 Enlaces Útiles

- **API Original**: https://extinct-api.herokuapp.com/
- **Documentación**: https://cheba-apis.vercel.app/
- **Wikipedia (Extinción)**: https://en.wikipedia.org/wiki/Timeline_of_extinctions_in_the_Holocene

## ❓ Preguntas Frecuentes

### ¿Puedo guardar animales favoritos?
Actualmente no, pero puedes abrir Wikipedia para guardar la información.

### ¿Los datos son reales?
Sí, todos los datos provienen de Wikipedia y están documentados.

### ¿Se actualiza la información?
Los datos son estáticos de la API, basados en scraping de Wikipedia.

### ¿Puedo contribuir con más animales?
Los datos son de la API externa, contacta al desarrollador de la API (Cheba).

## 🌍 Conservación

Esta aplicación sirve como recordatorio de la importancia de la conservación de especies. Cada animal en esta lista representa una pérdida irreparable para nuestro planeta.

**Recuerda**: Podemos aprender del pasado para proteger el futuro de las especies actuales en peligro.

---

**¡Disfruta explorando la historia natural de nuestro planeta!** 🦴🌍
