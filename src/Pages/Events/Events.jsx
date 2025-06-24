
import useAuth from "../../Hooks/useAuth";
import AllEvents from "./AllEvents/AllEvents";
import EventBanner from "./EventsComponents/EventBanner";
import EventCards from "./EventsComponents/EventCards";
import EventInfo from "./EventsComponents/EventInfo";
import EventReview from "./EventsComponents/EventReview";
import TopEvents from "./EventsComponents/TopEvents";

const Events = () => {
  const { darkMode } = useAuth();

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={`${darkMode
        ? "bg-dark-background text-dark-primary"
        : "bg-background text-black"
        } `}
    >
      <EventBanner scrollToSection={scrollToSection}></EventBanner>
      {/* <EventCards></EventCards> */}
      <TopEvents></TopEvents>
      <AllEvents></AllEvents>
      <EventInfo></EventInfo>
    </div>
  );
};

export default Events;
