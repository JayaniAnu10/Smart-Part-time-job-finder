import NavBar from "../components/NavBar";
import heroBackground from "@/assets/hero.png";

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
          <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/5 to-background/15 z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-background/20 via-transparent to-background/40 z-10" />
          <div className="absolute top-30 right-10 max-w-md text-left z-20 flex flex-col drop-shadow-2xl space-y-2">
            <span className="text-7xl  font-extrabold text-secondary space-y-2">
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
