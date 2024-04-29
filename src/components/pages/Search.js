import React from 'react'

const Search = ({ handleSearch }) => {


	const onChange = (e) => {
		handleSearch(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
	}
	return (
		<form class="d-flex my-3" onSubmit={handleSubmit}>
			<input class="form-control me-2 " type="search" placeholder="Search  your fav coins !!" aria-label="Search" style={{ backgroundColor: "transparent", color: "white" }} onChange={onChange} />
			<button class="btn btn-warning" type="submit">Search</button>
		</form>
	)
}

export default Search