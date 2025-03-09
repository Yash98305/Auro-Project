import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../context/auth';

// Define styled components
const SearchStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "50px",
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: "white",
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Search = () => {
  const [query, setQuery] = useState('');
const {data,setFiltered} = useAuth();
  useEffect(() => {
    setFiltered(
      data?.filter(d => 
        d?.title?(d?.title?.toLowerCase().includes(query.toLowerCase())):(d?.name?.toLowerCase().includes(query.toLowerCase()))
      )
    );
  }, [query, data]);

  return (
    <>
      <SearchStyle>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchStyle>
    </>
  );
}

export default Search;
