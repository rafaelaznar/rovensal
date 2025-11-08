export interface Libro {
    thumbnail: string; // Portada
    title: string; // Título
    publishedDate: string; // Fecha de publicación
    publisher: string; // Editorial
    categories: string; // Categorias
    pageCount: number; // Cantidad de páginas
    description: string; // Descripción
}

// Se añade una segunda interfaz que modela un ítem (libro) de la respuesta de la API de Google Books
export interface LibroGoogleBooks {
    volumeInfo: {
        title: string;
        publishedDate: string;
        publisher: string;
        categories: string[];
        pageCount: number;
        description: string;
        imageLinks: {
            thumbnail: string;
        };
    };
}