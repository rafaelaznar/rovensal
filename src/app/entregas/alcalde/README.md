# 🦴 Aplicación de Animales Extintos - Alcalde

## 📋 Descripción
Aplicación web desarrollada en Angular que consume la API de Cheba (Extinct API) para mostrar información sobre animales extintos durante el Holoceno (últimos 11.650 años).

## 🎯 Características Implementadas

### Arquitectura y Estructura
- ✅ Componentes standalone (sin NgModules)
- ✅ Arquitectura modular dentro de la carpeta `entregas/alcalde`
- ✅ Separación de responsabilidades: models, services, components

### Modelos e Interfaces
- ✅ `ExtinctAnimal` - Interfaz con tipado fuerte para animales extintos
- ✅ `ApiResponse` - Interfaz para respuestas de la API
- ✅ Documentación JSDoc en todas las interfaces

### Servicios
- ✅ `ExtinctAnimalsService` - Servicio singleton (providedIn: 'root')
- ✅ Inyección con `inject()` en lugar de constructor
- ✅ Uso de HttpClient para peticiones HTTP
- ✅ Observables y RxJS (map, catchError, of)
- ✅ Métodos de filtrado de datos

### Componentes

#### 1. AlcaldeComponent (Enrutado)
- Componente raíz que actúa como contenedor
- Utiliza `RouterOutlet` para rutas hijas
- OnPush change detection

#### 2. AnimalListComponent (Enrutado)
- Gestión de estado con Signals
- Computed signals para estado derivado
- Comunicación con API mediante subscripciones
- Filtros dinámicos por nombre y ubicación
- Validación de entrada de datos
- Eventos de botones y controles
- Comunicación bidireccional con componentes hijos

#### 3. AnimalCardComponent (No enrutado, reutilizable)
- Input signals para recibir datos del padre
- Output signals para emitir eventos al padre
- Uso de Angular Material (Card, Button, Chips)
- NgOptimizedImage para imágenes
- OnPush change detection

#### 4. AnimalDetailDialogComponent (Diálogo)
- Ventana emergente de Angular Material
- Comunicación bidireccional con el padre
- Inyección de datos con MAT_DIALOG_DATA
- MatDialogRef para cerrar y retornar datos

### Angular Material
- ✅ MatCardModule
- ✅ MatButtonModule
- ✅ MatDialogModule
- ✅ MatInputModule
- ✅ MatFormFieldModule
- ✅ MatSelectModule
- ✅ MatChipsModule
- ✅ MatProgressSpinnerModule

### Funcionalidades Técnicas
- ✅ Diferenciación constructor vs ngOnInit
- ✅ Inyección de dependencias con inject()
- ✅ Interpolación y expresiones en templates
- ✅ Control de flujo con @if, @for
- ✅ Event binding para interactividad
- ✅ Property binding dinámico
- ✅ Validación de datos de entrada
- ✅ Manejo de errores en peticiones HTTP
- ✅ Programación orientada a objetos
- ✅ Patrón Singleton en servicios
- ✅ Tipado fuerte (sin any)

### Rutas
```typescript
{
  path: 'alcalde',
  component: AlcaldeComponent,
  children: [
    { path: '', redirectTo: 'animals', pathMatch: 'full' },
    { path: 'animals', component: AnimalListComponent }
  ]
}
```

## 🚀 API Utilizada
**Extinct API** - https://extinct-api.herokuapp.com/api/v1/animal/

### Endpoints:
- `GET /api/v1/animal/` - Animal aleatorio
- `GET /api/v1/animal/:number` - N animales (1-804)
- Parámetro: `imageRequired={true/false}`

## 📂 Estructura de Archivos
```
entregas/alcalde/
├── models/
│   └── animal.interface.ts       # Interfaces TypeScript
├── services/
│   └── extinct-animals.service.ts # Servicio singleton
└── component/
    ├── alcaldeComponent/          # Componente raíz enrutado
    ├── animal-list/               # Lista de animales (enrutado)
    ├── animal-card/               # Tarjeta de animal (no enrutado)
    └── animal-detail-dialog/      # Diálogo de detalles
```

## 🔧 Tecnologías
- Angular 19+ (standalone components)
- TypeScript (strict mode)
- Angular Material
- RxJS
- Signals API
- HttpClient

## 📱 Funcionalidades de Usuario
1. **Ver lista de animales extintos** con imágenes y datos básicos
2. **Buscar por nombre** (común o científico)
3. **Filtrar por ubicación** geográfica
4. **Seleccionar cantidad** de animales a mostrar (10, 20, 50, 100)
5. **Cargar animal aleatorio**
6. **Ver detalles completos** en ventana emergente
7. **Acceder a Wikipedia** de cada animal
8. **Recargar datos** desde la API
9. **Limpiar filtros** aplicados

## 👨‍💻 Autor
Alcalde - Entrega para proyecto de clase Angular

## 📄 Licencia
MIT
