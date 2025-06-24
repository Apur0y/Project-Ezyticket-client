
import AllMovies from "./AllMovie/AllMovies";
import MovieMarquee from "./Components/MovieMarquee";
import DiscountOffer from "./Discount/DiscountOffer";
import FeaturedTrailers from "./FeaturedTrailers";
import MovieHero from "./MovieHero";
import MovieNews from "./MovieNews";
import TrendingMovies from "./TrendingMovies";

const Entertainment = () => {


console.log("Entermain ghete");
  return ( 
    <div >
      <MovieHero></MovieHero>
      <AllMovies></AllMovies>
      {/* <TrendingMovies></TrendingMovies> */}
      {/* <FeaturedTrailers></FeaturedTrailers> */}
      <MovieNews></MovieNews>
      <DiscountOffer></DiscountOffer>
      <MovieMarquee></MovieMarquee>
    </div>
  );
};

export default Entertainment;
