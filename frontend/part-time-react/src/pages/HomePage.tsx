import NavBar from "../components/NavBar";
import heroBackground from "@/assets/hero.png";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div>
        <section
          className="relative flex flex-col items-center justify-center min-h-screen  bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${heroBackground})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/5 to-background/15 z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-background/20 via-transparent to-background/40 z-10" />
          <div>
            <span className="text-4xl font-extrabold text-right text-secondary">
              Find Your Perfect Part-Time Fit.
            </span>
          </div>
        </section>
        <div>jp</div>
      </div>
    </div>
  );
};

export default HomePage;
