import React from "react";
import { SortingPreviewSquare, GraphPreviewSquare, ComingSoonSquare } from "./components";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {

    const navigate = useNavigate();

    const handleClick = (link) => {
        navigate(link);
    }
    return (
        <div className="home-page"> 
            <div className="full-width centered-row">
                <h1 className="text-white">
                    Home
                </h1>
            </div>

            <div className="full-width responsive-avsquare-grid">
                <SortingPreviewSquare 
                    handleClick={handleClick}
                />
                <GraphPreviewSquare
                    handleClick={handleClick}
                />

                <ComingSoonSquare 
                    title='Trees'
                />

                <ComingSoonSquare 
                    title='Linked Lists'
                />
            </div>
        </div>
    )
}

export default HomePage;