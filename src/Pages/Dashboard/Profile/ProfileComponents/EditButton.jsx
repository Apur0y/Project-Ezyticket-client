import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const EditButton = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  // Set initial form values
  useEffect(() => {
    reset({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      email: user?.email || ''
    });
  }, [user, reset]);

  // Modal functions using ref
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      refetch();
      modalRef.current.close();
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/users/${user?.email}`, data);

      if (res.data.modifiedCount > 0) {
        await refetch();
        await Swal.fire({
          title: "Updated!",
          text: 'Profile Update Successful',
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        closeModal();
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || 'Profile Update Failed',
        icon: "error",
        timer: 2000,
        showConfirmButton: false
      });
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="ezy-button-primary mt-8"
      >
        <MdEdit className="mr-2" />
        Edit Profile
      </button>

      <dialog ref={modalRef} id='updateProfile' className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.name && (
                <span className="text-error text-sm">{errors.name.message}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                disabled
                {...register('email')}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Phone Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone Number is required' })}
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.phone && (
                <span className="text-error text-sm">{errors.phone.message}</span>
              )}
            </div>

            {/* Address Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                {...register('address', {required: 'Address is required'})}
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.address && (
                <span className="text-error text-sm">{errors.address.message}</span>
              )}
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost"
                disabled={isSubmitting}
              >
                Close
              </button>
              <button
                type="submit"
                className="ezy-button-primary-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditButton;