import Navbar from "../components/Navbar.tsx";
import Search from "../components/Search.tsx";

function Header() {
  return (
    <div className="h-screen w-screen bg-coverLanding bg-cover">
      <Navbar />
      <div className="relative mt-32 flex justify-center">
        <div className="text-center font-noto-serif-display text-headline2 text-white">
          A Best Place for Your<br></br>
          Neatly Experience
        </div>
        <Search />
      </div>
    </div>
  );
}

export default Header;
