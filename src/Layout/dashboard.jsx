import { FaBullhorn, FaBus, FaCalendarAlt, FaHome, FaList, FaShoppingCart, FaUsers, FaWallet } from "react-icons/fa";
import { TbHomePlus } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaHouseCircleExclamation } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
// import noImage from "../assets/Common_image/noImage.png";
import useEventManager from "../Hooks/useEventManager";
import useTravelManager from "../Hooks/useTravelManager";
import useEntertainmentManager from "../Hooks/useEntertainmentManager";
import { MdEmojiEvents } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { useState } from "react";

const Dashboard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdmin] = useAdmin();
    const [isEventManager] = useEventManager();
    const [isTravelManager] = useTravelManager();
    const [isEntertainmentManager] = useEntertainmentManager();
    const { user, userInfo } = useAuth();

    // Active link style function
    const getNavLinkClass = ({ isActive }) => 
        isActive ? 'bg-main text-white' : 'hover:bg-main';
    const closeMenu = ()=>{
        setIsMobileMenuOpen(false)
    }

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden flex justify-between items-center p-4 bg-background border-b border-gray-200">
                <Link to={'/'}>
                    <p className="text-2xl text-main font-bold">Ezy Tickets</p>
                </Link>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-700 focus:outline-none"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0
                fixed md:relative
                w-64
                bg-background border-r border-gray-200
                h-full
                z-40
                transition-transform duration-300 ease-in-out
                overflow-y-auto
            `}>
                <div className="p-4">
                    {/* Desktop Logo */}
                    <Link to={'/'} className="hidden md:block">
                        <div className="flex items-center justify-center gap-1 pt-4">
                            <p className="text-3xl text-main font-bold">Ezy Tickets</p>
                        </div>
                    </Link>

                    {/* User Role Badge */}
                    <div className="mt-4 md:mt-0">
                        {isAdmin ? (
                            <h2 className="dashboard-badge bg-green-200 text-green-800">ADMIN</h2>
                        ) : isTravelManager ? (
                            <h2 className="dashboard-badge bg-purple-200 text-purple-800">TRAVEL MANAGER</h2>
                        ) : isEventManager ? (
                            <h2 className="dashboard-badge bg-teal-200 text-teal-800">EVENT MANAGER</h2>
                        ) : isEntertainmentManager ? (
                            <h2 className="dashboard-badge bg-amber-200 text-amber-800">ENTERTAINMENT MANAGER</h2>
                        ) : (
                            <h2 className="dashboard-badge bg-red-200 text-red-800">USER</h2>
                        )}
                    </div>

                    <div className="divider"></div>
                    
                    {/* ----------------User Profile---------------- */}
                    <div className="flex flex-col items-center space-y-2 mb-4 text-center">
                        <h3 className="text-2xl font-bold">{userInfo?.name}</h3>
                        <p className="font-semibold text-gray-500">{user?.email}</p>
                    </div>
                    
                    <div className="divider"></div>
                    
                    {/* Navigation Menu */}
                    <ul className="menu space-y-2 w-full">
                        {isAdmin ? (
                            <>
                                <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> Admin Profile</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/manageEvents" className={getNavLinkClass}><MdEmojiEvents /> Manage Events</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/manageTravel" className={getNavLinkClass}><FaBus /> Manage Travel</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/manageEntertainments" className={getNavLinkClass}><BiMoviePlay /> Manage Entertainments</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/manageUsers" className={getNavLinkClass}><FaUsers /> Manage Users</NavLink></li>
                            </>
                        ) : isEventManager ? (
                            <>
                                <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> My Profile</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/addEvent" className={getNavLinkClass}><TbHomePlus /> Add Post</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/myAddedEvents" className={getNavLinkClass}><FaList /> My added Post</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/soldEventTickets" className={getNavLinkClass}><HiCurrencyDollar /> Ticket Sold</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/manageEventReview" className={getNavLinkClass}><FaHouseCircleExclamation /> Manage Review</NavLink></li>
                            </>
                        ) : isTravelManager ? (
                            <>
                                <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> My Profile</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/add-bus-service" className={getNavLinkClass}><TbHomePlus /> Add Bus Service</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/MyBusServices" className={getNavLinkClass}><FaList /> My Bus Services</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/soldTickets" className={getNavLinkClass}><HiCurrencyDollar /> Ticket Sold</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/manageReview" className={getNavLinkClass}><FaHouseCircleExclamation /> Manage Review</NavLink></li>
                            </>
                        ) : isEntertainmentManager ? (
                            <>
                                <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> My Profile</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/addcineplex" className={getNavLinkClass}><TbHomePlus /> Add Cinema Hall</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/addmovie" className={getNavLinkClass}><TbHomePlus /> Add Movie Show</NavLink></li>


                                <li onClick={closeMenu}><NavLink to="/dashboard/ticketcineplex" className={getNavLinkClass}><HiCurrencyDollar /> Ticket Manager</NavLink></li>
                                

                                <li onClick={closeMenu}><NavLink to="/dashboard/managemovie" className={getNavLinkClass}><FaHouseCircleExclamation /> Manage Movies</NavLink></li>

                                
                                <li onClick={closeMenu}><NavLink to="/dashboard/managecineplex" className={getNavLinkClass}><FaList /> Manage Halls</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> My Profile</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/wishlist" className={getNavLinkClass}><FaCalendarAlt /> Wishlist</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/propertyBought" className={getNavLinkClass}><FaWallet /> Ticket Bought</NavLink></li>

                                <li onClick={closeMenu}><NavLink to="/dashboard/myReview" className={getNavLinkClass}><FaShoppingCart /> My Review</NavLink></li>
                            </>
                        )}

                        <div className="divider"></div>
                        <li><NavLink to="/" className={getNavLinkClass}><FaHome /> Home</NavLink></li>
                        <li><NavLink to="/contact" className={getNavLinkClass}><IoMdMail /> Support</NavLink></li>
                    </ul>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 h-full overflow-y-auto">
                <div >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;