import "./App.css";

function App() {
  return (
    <>
      <div data-theme="mytheme">
        <h1 className="w-1/2 h-32 text-center text-headline2 font-noto-serif-display bg-gray-800">Neatly Hotel</h1>
        <h1 className="w-1/2 h-32 text-center text-headline2 font-noto-serif-display bg-clean">hello world</h1>
        <h1 className="w-1/2 h-32 text-center text-headline2 font-noto-serif-display bg-dirty">hello world</h1>
        <h1 className="w-1/2 h-32 text-center text-headline2 font-inter bg-inspected">hello world</h1>
        <button className="btn Button">Book Now</button>
      </div>
    </>
  );
}

export default App;
