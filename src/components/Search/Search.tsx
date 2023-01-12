import React from 'react';
import { ISearchProps } from 'core/interfaces/props';

const Search = ({ value, setValue }: ISearchProps) => {
  return (
    <div>
      <input
        placeholder="Search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default Search;
