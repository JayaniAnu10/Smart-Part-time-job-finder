import NavBar from "../components/NavBar";
import heroBackground from "@/assets/hero6.png";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div>
        <section
          className="relative flex flex-col items-end justify-center min-h-screen  bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${heroBackground})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/35 to-background/20 z-10" />
          <div className=" text-center z-30 ">
            <span className="text-7xl  font-extrabold text-secondary dark:text-yellow-50 space-y-2">
              Find Your
            </span>
            <span className="text-7xl  font-extrabold text-secondary space-y-2">
              Perfect
            </span>
            <span className="text-7xl  font-extrabold text-secondary shadow-yellow-400 drop-shadow-2xl">
              Part-Time Fit
            </span>
          </div>
        </section>
        <div>jp</div>
      </div>
    </div>
  );
};

export default HomePage;
