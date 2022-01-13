import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";

const Header = ({ logout, name, img }) => {
  return (
    <div className="nav-bar">
      <h1>Wawe</h1>
      <div className="user-data">
        <span>
          <h3 className="p-name">{name}</h3>
          {img ? (
            <img className="p-img" src={img} alt="userprofileimg" />
          ) : (
            <Avatar
              className="p-avatar"
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "green",
                "blue",
              ])}
              size="50"
              name={name}
            />
          )}
        </span>
        <button className="logoutBtn" onClick={() => logout()}>
          <FontAwesomeIcon icon={faPowerOff} />
        </button>
      </div>
    </div>
  );
};

export default Header;
