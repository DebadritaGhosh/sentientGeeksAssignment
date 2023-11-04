//Importing System
import { useState, useEffect } from 'react';
//Importing style
import './App.css';
//Importing Components
import ModalComponent from './component/ModalComponent/ModalComponent';
import CustomDropdownComponent from './component/DropdownModalComponent/DropdownModalComponent';
//Importing icons
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import StarComponent from './component/StarComponent/StarComponent';
import RatingDropdonModal from './component/RatingDropdonModal/RatingDropdonModal';
import GenreDropdonModal from './component/GenreDropdonModal/GenreDropdonModal';


function App() {

  // Initial States
  const [movieData] = useState([
    {
      title: "The Matrix",
      rating: 7.5,
      category: "Action"
    },
    {
      title: "Focus",
      rating: 6.9,
      category: "Comedy"
    },
    {
      title: "The Lazarus Effect",
      rating: 6.4,
      category: "Thriller"
    },
    {
      title: "Everly",
      rating: 5.0,
      category: "Action"
    },
    {
      title: "Maps to the Stars",
      rating: 7.5,
      category: "Drama"
    }]);
  const [allRatings] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [allCategory] = useState(["Any genre", "Action", "Comedy", "Drama", "Thriller"]);

  ///Filtered state
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([0]);
  const [selectedGenres, setSelectedGenres] = useState(["Any genre",]);


  // States for opening custom dropdowns
  const [openRecomendationModal, setOpenRecomendationModal] = useState(false);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [openGenreModal, setOpenGenreModal] = useState(false);

  //Other states
  const [searchQuery, setSearchQuery] = useState("");


  // This useEffect will add data inside filteredMovies state
  useEffect(() => {
    setFilteredMovies(movieData);
  }, []);


  // This useEffect will call filterMovies everytime we changes anything from dependency array 
  useEffect(() => {
    filterMovies();
  }, [searchQuery, selectedRatings, selectedGenres]);


  // This is the function which will do the filtering part
  const filterMovies = () => {
    const filtered = movieData.filter((movie) => {
      const lowerTitle = movie.title.toLowerCase();
      
      if (searchQuery && !lowerTitle.includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (selectedRatings.length > 0 && !selectedRatings.includes(0)) {
        if (!selectedRatings.includes(parseInt(movie.rating))) {
          return false;
        }
      }

      if (selectedGenres.length > 0 && selectedGenres[0] !== "Any genre") {
        if (!selectedGenres.includes(movie.category)) {
          return false;
        }
      }
      return true;
    });

    setFilteredMovies(filtered);
  };


  const handleCheckboxChange = (choice, allData, setAllData, itemNeedsToCheck) => {
    if (choice === itemNeedsToCheck) {
      if (allData.includes(itemNeedsToCheck)) {
        setAllData([]);
      } else {
        setFilteredMovies(movieData);
        setAllData([itemNeedsToCheck]);
      }
      return;
    } else {
      let tempSelectedData = [...allData]
      if (tempSelectedData.includes(itemNeedsToCheck)) {
        tempSelectedData = []
      }
      if (tempSelectedData.includes(choice)) {
        setAllData(tempSelectedData.filter((r) => r !== choice));
      } else {
        setAllData([...tempSelectedData, choice]);
      }
    }
  };


  return (
    <div className="app__container">
      <div className="app__innerContainer">
        <div className="app__inputContainer">
          <input
            value={searchQuery}
            onFocus={() => setOpenRecomendationModal(true)}
            // onBlur={() => setOpenRecomendationModal(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {openRecomendationModal && <ModalComponent data={filteredMovies} />}

        </div>
        <div className="app__dropdownContainer">
          <div className='app__dropdownInnerContainer'>
            <div className="app__dropdown" onClick={() => {
              setOpenGenreModal(false);
              setOpenRatingModal(!openRatingModal);
            }}>
              <p>Rating</p>
              {openRatingModal ?
                <AiOutlineUp /> :
                <AiOutlineDown />
              }
            </div>
            <div className="app__dropdown" onClick={() => {
              setOpenGenreModal(!openGenreModal);
              setOpenRatingModal(false);
            }}><p>Genre</p>
              {openGenreModal ?
                <AiOutlineUp /> :
                <AiOutlineDown />
              }</div>
          </div>


          <div className="app__dropdownItems">
            <RatingDropdonModal openRatingModal={openRatingModal} allRatings={allRatings} handleCheckboxChange={handleCheckboxChange} selectedRatings={selectedRatings} setSelectedRatings={setSelectedRatings} />
            <GenreDropdonModal openGenreModal={openGenreModal} allCategory={allCategory} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} handleCheckboxChange={handleCheckboxChange} />
          </div>
 
        </div>
      </div>
    </div>
  );
}

export default App;



// const handleGenreChange = (genre) => {
//   if (genre === "Any genre") {
//     if (selectedGenres.includes("Any genre")) {
//       setSelectedGenres([]);
//     } else {
//       setFilteredMovies(movieData);
//       // handleAnyRating();
//       setSelectedGenres(["Any genre"]);
//     }
//     return;
//   } else {
//     let tempSelectedGenres = [...selectedGenres];

//     if (tempSelectedGenres.includes("Any genre")) {
//       tempSelectedGenres = []
//     }


//     if (tempSelectedGenres.includes(genre)) {
//       setSelectedGenres(tempSelectedGenres.filter((g) => g !== genre));
//     } else {
//       setSelectedGenres([...tempSelectedGenres, genre]);
//     }
//   }
// };



// const handleRatingChange = (rating) => {
//   console.log('TESTING RATING ========> ', rating)
//   // Checking that if user presses on ny Rating or not (we will get 0 if the user clicked on any rating)
//   if (rating === 0) {
//     if (selectedRatings.includes(0)) {
//       setSelectedRatings([]);
//     } else {
//       setFilteredMovies(movieData);
//       // handleAnyRating();
//       setSelectedRatings([0]);
//     }
//     return;
//   } else {
//     // console.log("IN ELSE")
//     let tempSelectedRatings = [...selectedRatings]
//     if (tempSelectedRatings.includes(0)) {
//       // setSelectedRatings([]);
//       tempSelectedRatings = []
//     }
//     if (tempSelectedRatings.includes(rating)) {
//       setSelectedRatings(tempSelectedRatings.filter((r) => r !== rating));
//     } else {
//       setSelectedRatings([...tempSelectedRatings, rating]);
//       console.log("TEST handleRatingChange  ===> ", [...selectedRatings, rating]);
//       console.log("TEST ====> ", filteredMovies)
//     }
//   }
// };


// const filterMovies = () => {
//   let filtered = movieData;

//   if (searchQuery) {
//     console.log("SEARCH QUERY", searchQuery);
//     filtered = filtered.filter((movie) =>
//       movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   if (selectedRatings.length > 0 && !selectedRatings.includes(0)) {
//     console.log("SELECTED RATINGS", selectedRatings);
//     filtered = filtered.filter((movie) =>
//       selectedRatings.includes(parseInt(movie.rating))
//     );
//   }

//   if (selectedGenres.length > 0 && !selectedGenres.includes("Any genre")) {
//     console.log("SELECTED GENRES", selectedGenres);
//     filtered = filtered.filter((movie) =>
//       selectedGenres.includes(movie.category)
//     );
//   }

//   setFilteredMovies(filtered);
// };




// const handleAnyRating = () => {
//   let filtered = movieData;

//   if (searchQuery) {
//     console.log("SEARCH QUERY", searchQuery);
//     filtered = filtered.filter((movie) =>
//       movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   // if (selectedRatings.length > 0 && !selectedRatings.includes(0)) {
//   //   console.log("SELECTED RATINGS", selectedRatings);
//   //   filtered = filtered.filter((movie) =>
//   //     selectedRatings.includes(parseInt(movie.rating))
//   //   );
//   // }

//   if (selectedGenres.length > 0) {
//     console.log("SELECTED GENRES", selectedGenres);
//     filtered = filtered.filter((movie) =>
//       selectedGenres.includes(movie.category)
//     );
//   }

//   setFilteredMovies(filtered);
// };

// const handleButtonClick = (index, allData, setAllData) => {
//   const updatedData = [...allData];
//   updatedData[index].isSelected = !updatedData[index].isSelected;
//   setAllData(updatedData);
// };



// {openRatingModal &&
//   allRatings.map((rating, index) => (
//     <CustomDropdownComponent>
//       <div className='customDropdownComponent__leftItem' key={index}>
//         {/* {rating.isSelected ? <GrCheckboxSelected /> : <GrCheckbox />} */}
//         <label >
//           <input
//             type="checkbox"
//             value={rating}
//             checked={selectedRatings.includes(rating)}
//             // onChange={() => handleRatingChange(rating)}
//             onChange={() => handleCheckboxChange(rating, selectedRatings, setSelectedRatings, 0)}

//           />
//           {/* {rating} */}
//         </label>
//       </div>
//       <div className='customDropdownComponent__rightItem'>{rating === 0 ? <p>Any Rating</p> : <StarComponent numberOfStars={rating} />}</div>
//     </CustomDropdownComponent>

//   ))
// }



// {openGenreModal &&
//   allCategory.map((category, index) => (
//     <CustomDropdownComponent style={{ "margin-left": "44%", "max-width": "50% !important" }}>
//       <div className='customDropdownComponent__leftItem' key={index}>
//         {/* {category.isSelected ? <GrCheckboxSelected /> : <GrCheckbox />} */}
//         <label >
//           <input
//             type="checkbox"
//             value={category}
//             checked={selectedGenres.includes(category)}
//             // onChange={() => onGenreChange(genre)}
//             // onChange={() => handleGenreChange(category)}
//             onChange={() => handleCheckboxChange(category, selectedGenres, setSelectedGenres, "Any genre")}

//           />
//         </label>
//       </div>
//       <div className='customDropdownComponent__rightItem'><p>{category}</p></div>
//     </CustomDropdownComponent>

//   ))
// }