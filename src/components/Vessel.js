import React from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../images/boat.jpg';
import propTypes from 'prop-types';
import styled from "styled-components";

const BoatContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const BoatImg = styled.img`
  width: 200px;
  margin: 5px;
`;


// export default function App() {
// 	return (
// 	  <div className="App">
// 		<h1>Behold: boats.</h1>
// 		<BoatContainer>
// 		  <BoatImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Motorboat_at_Kankaria_lake.JPG/1920px-Motorboat_at_Kankaria_lake.JPG" />
// 		  <BoatImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Boats_at_Bhimili_beach_in_Visakhapatnam.jpg/1280px-Boats_at_Bhimili_beach_in_Visakhapatnam.jpg" />
// 		  <BoatImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Motorboat_at_Kankaria_lake.JPG/1920px-Motorboat_at_Kankaria_lake.JPG" />
// 		  <BoatImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Boats_at_Bhimili_beach_in_Visakhapatnam.jpg/1280px-Boats_at_Bhimili_beach_in_Visakhapatnam.jpg" />
// 		  <BoatImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Motorboat_at_Kankaria_lake.JPG/1920px-Motorboat_at_Kankaria_lake.JPG" />
// 		  <BoatImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Boats_at_Bhimili_beach_in_Visakhapatnam.jpg/1280px-Boats_at_Bhimili_beach_in_Visakhapatnam.jpg" />
// 		</BoatContainer>
// 	  </div>
// 	);
//   }
  
  

// import { VesselProvider } from '../context';
export default function Vessel({ vessel }) {
	const { name, slug, images /* size */ } = vessel;

	return (
		<div>
		<article className="room">
			<div className="img-container">
				<img src={images[0] || defaultImg} alt="single room" />
				<div className="price-top">
					<h6>View</h6>
				</div>
				<Link to={`/vessels/${slug}`} className="btn-primary room-link">
					Features
				</Link>
			</div>
			<p className="room-info">{name}</p>
		</article>
		</div>
	);
}

Vessel.propTypes = {
	vessel: propTypes.shape({
		name: propTypes.string.isRequired,
		slug: propTypes.string.isRequired,
		images: propTypes.arrayOf(propTypes.string).isRequired
		// size: propTypes.number.isRequired
	})
};
