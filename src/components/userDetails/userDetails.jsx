import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from './redux/userDetailsActions';
import './userDetails.css';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userDetails);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    const filteredList = users.filter((user) => {
      const name = user.firstName + user.lastName;
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filteredList);
  }, [searchTerm, users]);

  const openModal = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  if(filteredUsers.length==0) return (
      <div className="container">
        <h1>User Details List</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        <h1>No Users to display</h1>
      </div>
    )

  return (
    <div className="container">
      <h1>User Details List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="user-list">
        {filteredUsers.map((user) => (
          <div
            data-testid="user-card"
            key={user.id}
            className="user-card"
            onClick={() => openModal(user)}
          >
           {window.innerWidth >=460 && (<div className="user-avatar">
           <img className="user-avatar" src={user.profile_pic} alt="Image" />
            </div>)}
            <div className="user-details">
              <h3 className="user-name">
                {user.firstName} {user.lastName}
              </h3>
              {window.innerWidth >=460 && (<p className="user-info">UUID: {user.uuid}</p>)}
              {window.innerWidth >=460 && (<p className="user-info">Phone: {user.phone}</p>)}
              <p className="user-info">Email: {user.email}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div data-testid="overlay" className="overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-content">
            {window.innerWidth >=460 && (<div className="user-avatar">
           <img className="user-avatar" src={selectedUser.profile_pic} alt="Image" />
            </div>)}
              <h2 className="user-name">
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>
              {window.innerWidth >=460 && (<p className="user-info">UUID: {selectedUser.uuid}</p>)}
              {window.innerWidth >=460 && (<p className="user-info">Phone: {selectedUser.phone}</p>)}
              <p className="user-info">Email: {selectedUser.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
