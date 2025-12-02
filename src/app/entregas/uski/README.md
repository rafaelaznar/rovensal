## Descripción general
Es una aplicación consuma el API pública de [Escuelajs](https://api.escuelajs.co/api/v1), una plataforma de código abierto donde cualquier persona puede manejar datos de la base de datos (https://api.escuelajs.co/docs). Los datos del catálogo se regeneran automáticamente todos los días a las 10:00 a. m., lo que garantiza que la aplicación disponga de ejemplos recientes para evaluar y demostrar funcionalidades.

## Uso de tecnologías clave
* **Angular + Angular Material** para la experiencia de usuario y componentes reutilizables.
* **API REST abierta de Escuelajs** para productos y categorías, con capacidades completas de lectura y escritura.
* **RxJS** aplicado en dos flujos principales:
  * Un buscador reactivo que combina `fromEvent`, `debounceTime` y `distinctUntilChanged` para filtrar productos sin recargar la página.
  * La filtración por categorías, con resaltado de la categoría activa, implementada mediante streams observables que actualizan dinámicamente la vista.
  * Diálogo (modal) para mostrar la información detallada de un producto utilizando los componentes de Angular Material (MatDialog).
  * El envío del formulario de contacto, gestionado con `Subject`, `filter`, `exhaustMap` y `finalize` para controlar el estado de carga y evitar envíos duplicados.