import React, { useState } from "react";

interface UserSearchBarProps {
  onSearch: (query: string) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query); // Trigger the search when form is submitted
  };

  
  return (
    <form onSubmit={handleSubmit} className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search users..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default UserSearchBar;
