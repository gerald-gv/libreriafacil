import ContentLoader from 'react-content-loader';

const SkeletonLibros = () => (
    <div>
        <ContentLoader
            speed={2}
            width={250}
            height={360}
            viewBox="0 0 250 350"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
        >
            {/* Imagen del libro */}
            <rect x="25" y="20" rx="8" ry="8" width="200" height="180" />

            {/* Título */}
            <rect x="25" y="210" rx="4" ry="4" width="160" height="18" />

            {/* Descripción */}
            <rect x="25" y="240" rx="3" ry="3" width="200" height="12" />
            <rect x="25" y="260" rx="3" ry="3" width="180" height="12" />

            {/* Precio */}
            <rect x="25" y="290" rx="4" ry="4" width="90" height="18" />

            {/* Botón Comprar */}
            <rect x="25" y="320" rx="6" ry="6" width="120" height="30" />
        </ContentLoader>
    </div>
);

export default SkeletonLibros;