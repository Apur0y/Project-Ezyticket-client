import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useEventReview = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: eventReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["eventReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/event-reviews");
      return res.data;
    },
  });

  return [eventReviews, refetch, isLoading];
};

export default useEventReview;
