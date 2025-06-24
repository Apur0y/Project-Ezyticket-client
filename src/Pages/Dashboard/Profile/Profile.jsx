import AdminProfile from "./ProfileComponents/AdminProfile";
import EntertainmentManagerProfile from "./ProfileComponents/EntertainmentManagerProfile";
import EventManagerProfile from "./ProfileComponents/EventManagerProfile";
import TravelManagerProfile from "./ProfileComponents/TravelManagerProfile";
import UserProfile from "./ProfileComponents/UserProfile";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Shared/Loading/Loading";

const Profile = () => {
    const { userInfo, userInfoLoading } = useAuth();

    if (userInfoLoading) {
        return (
            <div className="my-36 w-full flex-col justify-center text-center items-center">
                <p className="mt-4 text-gray-600">Data is Loading...</p>
            </div>
        );
    }

    return (
        <div>
            {
                userInfo?.role === 'admin' ? <AdminProfile></AdminProfile>
                    :
                    userInfo.role === 'travelManager' ? <TravelManagerProfile></TravelManagerProfile>
                        :
                        userInfo.role === 'eventManager' ? <EventManagerProfile></EventManagerProfile>
                            :
                            userInfo === 'entertainmentManager' ? <EntertainmentManagerProfile></EntertainmentManagerProfile>
                                :
                                <UserProfile></UserProfile>
            }
        </div>
    )
};

export default Profile;