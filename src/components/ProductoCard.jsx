function ProductoCard({ producto }) {
    const estado = producto.stock > 0 ? 'Disponible' : 'Agotado';
    return (
        <article className="producto-card">
            <h2>{producto.nombre}</h2>
            <p>Categoria: {producto.categoria}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
            <strong>{estado}</strong>
        </article>
    );
}

export default ProductoCard;