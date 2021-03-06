import React, { Component } from 'react'
import defaultBcg from "../images/boat.jpg";
// import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from "react-router-dom";
import {VesselContext} from "../context";
import StyledHero from "../components/StyledHero";

export default class SingleVessel extends Component {

    // Accessing the url parameters
    constructor(props) {
        super(props);

        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        };
    }

    static contextType = VesselContext;

// componentDidMount() {}

    render() {

        const {getVessel} = this.context;
        const vessel = getVessel(this.state.slug);
        if(!vessel) {
            return (
            <div className="error">
                {/* if we do an API call we should write "Loading..." */}
                <h3>no such vessel could be found...</h3>
                <Link to="/vessels" className="btn-primary">
                    back to vessels
                </Link>

            </div>
            );
        }


    // if the vessel is defined

    const {
        name, 
        description, 
        capacity, 
        size, 
        price, 
        extras, 
        // breakfast, 
        // pets, 
        images
    } = vessel;

    const[mainImg, ...defaultImg] = images;

    return (
        <>
        <StyledHero img = {mainImg || this.state.defaultBcg}>
            <Banner title={`${name} `}>
                <Link to="/vessels" className="btn-primary">
                    back to vessels
                </Link>
            </Banner>
        </StyledHero>

        <section className="single-room">
            <div className="single-room-images">
            {defaultImg.map((item, index) => {
                return <img key = {index} src = {item} alt= {name} />;
            })}
            </div>
            <div className="single-room-info">
                <article className="desc">
                    <h3>details</h3>
                    <p>{description}</p>
                </article>
                <article className="info">
                    <h3>info</h3>
                    {/* <h6>price: ${price}</h6> */}
                    <h6>Length: {price} Length (ft)</h6>
                    <h6>Size: {size} Width (ft)</h6>
                    <h6>
                        max capacity : {" "}
                            {capacity > 1 ? `${capacity} cy`:
                            `${capacity} cy`}
                        
                    </h6>
                    {/* <h6>{pets ? "pets allowed":"no pets allowed"}</h6>
                    <h6>{breakfast && "free breakfast included"}</h6> */}

                </article>
            </div>
        </section>

        <section className="room-extras">
            <h6>extras</h6>
            <ul className="extras">
                {extras.map((item, index) => {
                return <li key = {index}>- {item}</li> 
                })}
            </ul>
        </section>

        </>
    );    
    }
}
