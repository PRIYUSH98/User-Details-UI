import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import UserList from './components/userDetails/userDetails';
import { fetchUserDetails } from './components/userDetails/redux/userDetailsActions';
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter } from "react-router-dom";

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./components/userDetails/redux/userDetailsActions', () => ({
  fetchUserDetails: jest.fn(),
}));

describe('UserList', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render UserList component', () => {
    render(<UserList />);
    
    const userListElement = screen.getByText('User Details List');
    expect(userListElement).toBeInTheDocument();
  });

  it('should call fetchUserDetails on component mount', () => {
    render(<UserList />);
    
    expect(fetchUserDetails).toHaveBeenCalled();
  });

  it('should update searchTerm state on input change', () => {
    render(<UserList />);
    
    const searchInput = screen.getByPlaceholderText('Search users');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(searchInput.value).toBe('John');
  });

  it('should display "No Users to display" message when filteredUsers is empty', () => {
    useSelector.mockReturnValue([]);
    render(<UserList />);
    const noUsersMessage = screen.getByText('No Users to display');
    expect(noUsersMessage).toBeInTheDocument();
  });

  it('displays filtered users when filteredUsers is not empty', () => {
    useSelector.mockReturnValue([
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    ]);
    render(<UserList />);
    const userElements = screen.getAllByTestId('user-card');
    expect(userElements).toHaveLength(2);
  });

});
