import React, { Component, useState, useEffect } from 'react';
//import styles from '../styles/Home.module.css'
import SideMenu from '../components/sidemenu';
import Carousel from '../components/carousel';
import MovieList from '../components/movieList';

import { getMovies, getCategories } from '../actions';

// class Home extends Component {

//   //It called only client
//   static async getInitialProps() {
//     const movies = await getMovies()
//     return {
//       movies
//     }
//   }

// constructor(props) {
//   super()
//   this.state = {
//     movies: [],
//     errorMessage: ''
//   }
// }

// componentDidMount() {
//   getMovies()
//     .then((movies) => {
//       this.setState({ movies })
//     })
//     .catch((error) => {
//       this.setState({ errorMessage: error })
//     })
// }

//   render() {
//     const { movies, errorMessage } = this.props
//     return (
//       <div>
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-3">
//               <SideMenu />
//             </div>
//             <div className="col-lg-9">
//               <Carousel />
//               <div className="row">
//                 <MovieList movies={movies || []} />
//               </div>
//               {/* END */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Home;

const Home = (props) => {
  // console.log(JSON.stringify(props.images))
  const { images, categories } = props
  const [filter, setFilter] = useState('all')

  const changeCategory = category => {
    console.log('click!')
    setFilter(category)
  }

  const filterMovies = movies => {

    if (filter === 'all') {
      return movies
    }

    return movies.filter(m => {
      return m.genre && m.genre.includes(filter)
    })
  }

  return (
    <div>
      <div className="homePage">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SideMenu
                changeCategory={changeCategory}
                categories={categories}
                activeCategory={filter}
              />
            </div>
            <div className="col-lg-9">
              <Carousel images={images} test="Slider" />
              <h1>Display {filter} movies</h1>
              <div className="row">
                <MovieList movies={filterMovies(props.movies) || []} />
              </div>
              {/* END */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


Home.getInitialProps = async () => {
  const movies = await getMovies()
  const categories = await getCategories()
  const images = movies.map((movie) => {
    return {
      id: `image-${movie.id}`,
      url: movie.image,
      name: movie.name
    }
  })

  return {
    movies,
    images,
    categories
  }
}

export default Home;