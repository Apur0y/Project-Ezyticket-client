import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div>
            <h2>Error 404 not found</h2>
            <Link to={'/'}>
                <button className="btn bg-button">Back to home</button>
            </Link>
        </div>
    );
};

export default Error;