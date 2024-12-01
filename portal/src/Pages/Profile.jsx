import React, { useState, useEffect } from "react";
import Title from "../Components/Title";

const UserProfile = () => {
  // Retrieve user data from local storage or set default values
  const savedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "example",
    email: "example@example.com",
  };

  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState(savedUser);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handle form submission to update user details and save to local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(userDetails)); // Save updated details to local storage
    setEditMode(false);
    console.log("Updated User Details:", userDetails);
  };

  return (
    <div className="container mx-auto my-10 p-5 border rounded shadow">
      <Title text1={"User"} text2={"Profile"} />
      <div className="my-5">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        {editMode ? (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="ml-2 bg-gray-300 text-black px-4 py-2 rounded">
              Cancel
            </button>
          </form>
        ) : (
          <div className="mt-4">
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
