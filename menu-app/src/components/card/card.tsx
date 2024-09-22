import "./card.css"

interface CardProps {
    price: number,
    title: string,
    image: string,
    onDelete: () => void,
    onEdit: (updatedData: unknown) => void
}

export function Card({ price, image, title, onDelete, onEdit }: CardProps) {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p><b>Preço: </b>{price}</p>
            <div className="card-buttons">
                <button className="edit-button" onClick={onEdit}>Editar</button>
                <button className="delete-button" onClick={onDelete}>Excluir</button>
            </div>
        </div>
    )
}
