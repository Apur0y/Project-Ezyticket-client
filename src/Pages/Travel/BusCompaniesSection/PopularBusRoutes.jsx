import { FaArrowRight, FaBus, } from "react-icons/fa";
import { motion } from "framer-motion";
import Heading from "../../../components/Heading";
import useTravelContext from "../../../Hooks/TrevalHook/useTravelContext";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const PopularBusRoutes = () => {
  const { allBusData, setSearchData } = useTravelContext()
  const { darkMode } = useAuth()
  const navigate = useNavigate()


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

   const handelPopularRoute = (bus)=>{
      const fromDistrict = bus.from;
      const toDistrict = bus.to;
      const date = new Date().toISOString().split("T")[0]


      const placeTimeData = { 
        stand1: fromDistrict, 
        stand2: toDistrict, 
        date: date
      } 


      if(!fromDistrict || !toDistrict || !date || !placeTimeData){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonColor: "#53b17a"
        });
       }else {
         setSearchData(placeTimeData)
         navigate("/travel/bus-ticket-book")
       }
      
   }

  return (
    <section
      className="pb-14 bg-gradient-to-br  relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10"
      >
        <div
          className="absolute top-20 -left-20 w-96 h-96 bg-main rounded-full blur-3xl"
        ></div>
        <div
          className="absolute bottom-0 -right-20 w-96 h-96 bg-main rounded-full blur-3xl"
        ></div>
      </div>

      <div
        className="container mx-auto px-4 sm:px-5  relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div
            className="inline-block relative">
            <Heading
              subtitle={"Popular Routs"}
              title={"Discover Bangladesh's Most Traveled Highways"}
            />
          </div>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allBusData.map((bus, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-2xl ${darkMode ? "bg-[#1d1d1d]" : "bg-white"}`}
            >
              {/* Animated route line */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute left-12 top-1/2 w-24 h-px bg-gradient-to-r from-main to-supporting  transform -translate-y-1/2"
                ></div>
                <div
                  className="absolute right-12 top-1/2 w-24 h-px bg-gradient-to-r from-main to-supporting transform -translate-y-1/2"></div>
              </div>
              {/* Action Button */}
              <button onClick={()=>handelPopularRoute(bus)} className="text-left">
                <div
                  className={`relative h-full p-8 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 `}
                >
                  <div
                    className="flex items-start space-x-4"
                  >
                    {/* Animated icon container */}
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className="relative flex-shrink-0"
                    >
                      <div
                        className="absolute inset-0 bg-main rounded-xl blur opacity-30"
                      ></div>
                      <div
                        className="w-14 h-14 rounded-xl bg-main flex items-center justify-center relative"
                      >
                        <FaBus className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>

                    <div
                      className="flex-1">
                      <h3
                        className="text-xl font-bold bg-gradient-to-r from-main to-supporting transform bg-clip-text text-transparent"
                      >
                        {bus.from}
                        <FaArrowRight
                          className={`${darkMode ? "text-white" : "text-black"}  inline-flex mx-2`} />
                        {bus.to}
                      </h3>
                      <div
                        className="mt-3 flex items-center space-x-2">
                        <span className={`text-sm font-medium text-dark-secondary 
                        ${darkMode ? "bg-dark-surface" : "bg-purple-50"} px-3 py-1 rounded-full`}
                        >
                          12 Daily Trips
                        </span>
                        <span className={`text-sm font-medium text-dark-secondary 
                        ${darkMode ? "bg-dark-surface" : "bg-purple-50"} px-3 py-1 rounded-full`}
                        >
                          AC Available
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect connector */}
                  <div
                    className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-main to-supporting transform -translate-x-1/2 group-hover:w-4/5 transition-all duration-500"
                  ></div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBusRoutes;