

const EventCard = ({ event }) => {
    // console.log(event)
    return (
        <div className="card bg-base-100 w-full shadow-sm">
            <figure>
                <img
                    src={event.photo}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;