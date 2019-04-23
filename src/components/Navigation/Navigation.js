import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {

  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="f3 link dim white-80 underline pa3 pointer" onClick={() => onRouteChange("signin")}>Sign Out</p>  {/*we define () => onRouteChange so that is only gets run onClick. this way we can pass it an argument without calling in immediately */}
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="f3 link dim white-80 underline pa3 pointer" onClick={() => onRouteChange("signin")}>Sign In</p>
        <p className="f3 link dim white-80 underline pa3 pointer" onClick={() => onRouteChange("register")}>Register</p>
      </nav>
    );
  }




}

export default Navigation;