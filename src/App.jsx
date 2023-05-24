import React from "react";
import { useState, useEffect } from "react";
import Movies from "./components/Movies";
import SearchBar from "./components/SearchBar";
import movieData from "./utils/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    const sortedMovies = [...movieData].sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.length - b.length;
      } else {
        return b.length - a.length;
      }
    });

    setMovies(
      sortedMovies.filter((movie) => {
        return (
          movie.title.toUpperCase().includes(search.toUpperCase()) &&
          ([NaN, 0].includes(parseInt(maxLength, 10)) ||
            parseInt(maxLength, 10) >= movie.length)
        );
      })
    );

    // setMovies(movieData.filter(movie => {
    //   return (movie.title.toUpperCase().includes(search.toUpperCase())) &&
    //      ([NaN,0].includes(parseInt(maxLength,10)) || parseInt(maxLength,10) >= movie.length )
    //  }));
  }, [search, maxLength, sortOrder]);

  const handleSortOrder = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "descending" ? "ascending" : "descending"
    );
  };

  return (
    <>
      {/* Header Bar for Searching */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        maxLength={maxLength}
        setMaxLength={setMaxLength}
        sortOrder={sortOrder}
        setSortOrder={handleSortOrder}
      />
      {/* Output the Movies */}
      <Movies movies={movies} />
    </>
  );
}

export default App;
