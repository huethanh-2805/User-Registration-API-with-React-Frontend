import React from "react";

function Home() {
    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center text-center vh-100"
            style={{
                background: "linear-gradient(135deg, #f8f9fa, #e3f2fd, #fce4ec)",
                color: "black",
            }}
        >
            <div>
                <h2 className="display-4">Welcome to the Home Page</h2>
                <p className="lead">
                    This is the home page of the User Registration application.
                </p>
                <button className="btn btn-primary btn-lg mt-4">Learn More</button>
            </div>
        </div>
    );
}

export default Home;
