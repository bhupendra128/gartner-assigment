import logo from "./logo.svg";
import "./App.scss";
import Search from "./container/Search";
import DisplayArtists from "./container/DisplayArtists";
import HeroPanel from "./container/HeroPanel";
import Filter from "./container/filter";

function App() {
  return (
    <div className="app">
      <HeroPanel />
      <div className="section-wrapper">
        <div className="left">
          <Filter />
        </div>
        <div className="right">
          <Search />
          <DisplayArtists />
        </div>
      </div>
    </div>
  );
}

export default App;
