import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiX, FiCheckCircle, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const AddBusServiceForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  const removeImage = () => {
    setLogoPreview(null);
    URL.revokeObjectURL(logoPreview);
  };

  const onSubmit = async data => {
    setIsSubmitting(true);
    const formData = {
      ...data,
      logo: logoPreview,
      ticketPrice: Number(data.ticketPrice),
      refund: data.refund === 'true'
    };
    console.log(formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50/10 to-green-50/10 rounded-3xl shadow-2xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        <span className=" px-6 py-2 ">
          Add New Bus Service
        </span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Enhanced Image Upload with Preview */}
        <div className="text-center group">
          <div
            {...getRootProps()}
            className={`mx-auto w-56 h-56 rounded-full border-4 border-dashed cursor-pointer
              ${isDragActive ? 'border-main bg-blue-100/50' : 'border-gray-300/50'}
              ${logoPreview ? 'border-transparent' : ''}
              transition-all duration-300 hover:border-main relative overflow-hidden`}
          >
            <input {...getInputProps()} />
            
            {logoPreview ? (
              <>
                <img 
                  src={logoPreview} 
                  alt="Bus preview" 
                  className="w-full h-full object-cover rounded-full"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-white transition-all"
                >
                  <FiX className="w-5 h-5 text-red-600" />
                </button>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-3">
                <div className="p-3 bg-blue-100/50 rounded-full transform group-hover:scale-110 transition-all">
                  <FiUploadCloud className="w-8 h-8 text-main/80" />
                </div>
                <p className="text-sm font-medium text-gray-600 px-4">
                  {isDragActive ? 'Drop logo here' : 'Drag & drop or click to upload'}
                </p>
                {isDragActive && (
                  <div className="absolute inset-0 bg-main/10 backdrop-blur-sm rounded-full" />
                )}
              </div>
            )}
          </div>
          <p className="mt-3 text-sm text-gray-500">Recommended size: 500x500px</p>
        </div>

        {/* Bus Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Bus Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('busName', { required: true })}
                  defaultValue="Shohagh Paribahan"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-main focus:ring-2 focus:ring-blue-200/50 outline-none bg-white/95 shadow-sm"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FiMapPin className="w-5 h-5 text-gray-400 group-focus-within:text-main" />
                </div>
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">From Location</label>
              <div className="relative">
                <input
                  {...register('from')}
                  defaultValue="Mohakhali Bus Terminal, Dhaka"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-main focus:ring-2 focus:ring-blue-200/50 outline-none bg-white/95 shadow-sm"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FiMapPin className="w-5 h-5 text-gray-400 group-focus-within:text-main" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">To Location</label>
              <div className="relative">
                <input
                  {...register('to')}
                  defaultValue="Kamalapur Bus Stand, Dhaka"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-main focus:ring-2 focus:ring-blue-200/50 outline-none bg-white/95 shadow-sm"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FiMapPin className="w-5 h-5 text-gray-400 group-focus-within:text-main" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Departure Date</label>
                <div className="relative">
                  <input
                    type="date"
                    {...register('date')}
                    defaultValue="2025-03-01"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-main focus:ring-2 focus:ring-blue-200/50 outline-none bg-white/95 shadow-sm"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <FiClock className="w-5 h-5 text-gray-400 group-focus-within:text-main" />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Departure Time</label>
                <div className="relative">
                  <input
                    type="time"
                    {...register('busTimes')}
                    defaultValue="08:30"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-main focus:ring-2 focus:ring-blue-200/50 outline-none bg-white/95 shadow-sm"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <FiClock className="w-5 h-5 text-gray-400 group-focus-within:text-main" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-3">Pricing & Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Ticket Price (৳)</label>
              <div className="relative">
                <input
                  type="number"
                  {...register('ticketPrice')}
                  defaultValue={350}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-main focus:ring-2 focus:ring-blue-200/50 outline-none bg-white/95"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FaBangladeshiTakaSign className="w-5 h-5 text-gray-400 group-focus-within:text-main" />
                </div>
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Bus Type</label>
              <select
                {...register('type')}
                defaultValue="AC"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-main focus:ring-2 focus:ring-blue-200/50 outline-none bg-white/95 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]"
              >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Refund Policy</label>
              <select
                {...register('refund')}
                defaultValue="true"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-main focus:ring-2 focus:ring-blue-200/50 outline-none bg-white/95 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]"
              >
                <option value="true">Refund Available</option>
                <option value="false">Non-refundable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all transform
            ${isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-main to-main hover:from-main hover:to-main hover:shadow-lg hover:scale-[1.005]'} 
            relative overflow-hidden group`}
        >
          <span className={`relative z-10 ${isSubmitting ? 'opacity-50' : ''}`}>
            {isSubmitting ? 'Publishing Service...' : 'Publish Bus Service'}
          </span>
          {!isSubmitting && (
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBusServiceForm;