import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import noImage from "../../../../assets/Common_image/noImage.png"


const ManageEntertainment = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: allMovies = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['allmovies'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allmovies');
            return res.data;
        }
    });

    const handleVerifyClick = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };
    const handleApprove = (id) => {
        axiosSecure.patch(`/verifyMovie/${id}`, { status: 'verified' })
            .then(res => {
                const data = res.data;
                refetch();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Congratulation! The Movie has been verified',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        handleCloseModal();
    };
    const handleReject = (id) => {
        axiosSecure.patch(`/verifyMovie/${id}`, { status: 'rejected' })
            .then(res => {
                const data = res.data;
                refetch();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Sorry! The Movie has been rejected',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        handleCloseModal();
    };
    if (isLoading) return <div className="text-center my-8">Loading movies...</div>;
    if (isError) return <div className="text-center my-8 text-red-500">Error loading movies</div>;

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-center my-8">Manage Movies</h2>

            <div className="bg-background rounded-lg shadow-md p-4">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-4 px-4">Photo</th>
                                <th className="text-left py-4 px-4">Title</th>
                                <th className="text-left py-4 px-4">Category</th>
                                <th className="text-left py-4 px-4">Release Date</th>
                                <th className="text-left py-4 px-4">Cinema Halls</th>
                                <th className="text-right py-4 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMovies.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No movies available
                                    </td>
                                </tr>
                            ) : (
                                allMovies.map((movie) => (
                                    <tr key={movie._id} className="hover:bg-gray-50">
                                        <td className="p-2">
                                            <img src={movie?.imageLink ? movie.imageLink : noImage} alt={movie.title} className="w-20 h-24 rounded" />
                                        </td>
                                        <td className="p-2">{movie.name}</td>
                                        <td className="p-2">{movie.category}</td>
                                        <td className="p-2">
                                            {new Date(movie.releaseDate).toLocaleDateString()}
                                            <br />
                                            <span className="text-sm text-gray-500">{movie.movieTime}</span>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                {movie.cinemaHalls?.join(", ")}
                                            </div>
                                        </td>
                                        <td className="p-2 flex justify-end">
                                            {movie?.status === "rejected" ? (
                                                <p className="py-1 px-3 bg-red-100 text-red-600 border border-red-300 w-fit rounded">
                                                    Rejected
                                                </p>
                                            ) : movie?.status === "verified" ? (
                                                <p className="py-1 px-3 bg-green-100 text-green-600 border border-green-300 w-fit rounded">
                                                    Verified
                                                </p>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-outline btn-primary"
                                                    onClick={() => handleVerifyClick(movie)}
                                                >
                                                    Verify
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedMovie && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-5">
                            <img src={selectedMovie?.imageLink ? selectedMovie.imageLink : noImage} alt={selectedMovie.title} className="w-full h-80 rounded-md mb-3" />
                        </div>
                        <div className="md:col-span-7 flex flex-col gap-3">
                            <h3 className="text-xl font-semibold mb-4">Name: {selectedMovie.name}</h3>

                            <p><strong>Type:</strong> {selectedMovie.genre}</p>
                            <p><strong>Category:</strong> {selectedMovie.category}</p>
                            <p><strong>Language:</strong> {selectedMovie.language}</p>
                            <p><strong>CinemaHalls:</strong> {selectedMovie.cinemaHalls.join(" , ")}</p>

                            <p><strong>Release Date:</strong> {new Date(selectedMovie.releaseDate).toLocaleDateString()}</p>

                            <p><strong>Duration:</strong> {selectedMovie.duration}</p>

                            <div className="flex justify-center items-end gap-2 md:gap-4 mt-auto">
                                <button className="ezy-button-primary-sm" onClick={() => handleApprove(selectedMovie._id)}>
                                    Approve
                                </button>
                                <button className="ezy-button-secondary-sm" onClick={() => handleReject(selectedMovie._id)}>
                                    Reject
                                </button>
                                <button className="btn btn-outline btn-sm" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>





                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEntertainment;