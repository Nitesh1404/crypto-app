import React, { useEffect, useState } from 'react';
import Search from './Search';

const CryptoTable = () => {
	const [coins, setCoins] = useState([]);
	const [filteredCoins, setFilteredCoins] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=200&page=1&sparkline=false&locale=en";
				const response = await fetch(url);
				const data = await response.json();
				setCoins(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Function to format market cap
	const formatMarketCap = (marketCap) => {
		if (marketCap >= 1e9) {
			return (marketCap / 1e9).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + 'B'; // Convert to billions
		} else if (marketCap >= 1e6) {
			return (marketCap / 1e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + 'M'; // Convert to millions
		} else {
			return marketCap.toLocaleString(); // No conversion needed
		}
	};

	// Function to apply color to 24h change
	const format24hChange = (change) => {
		const changeColor = change >= 0 ? 'green' : 'red'; // Green for gain, red for loss
		const formattedChange = Math.abs(change).toFixed(1); // Format to one decimal place
		return <span style={{ color: changeColor }}>{formattedChange}%</span>;
	};


	useEffect(() => {
		const searchedResult = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
		setFilteredCoins(searchedResult);
	}, [search, coins]);

	const handleSearch = (search) => {

		setSearch(search);
	}

	return (
		<div className='container'>
			<h2 className='text-center my-3'>Cryptocurrency Prices by Market Cap</h2>
			<Search handleSearch={handleSearch} />
			<div className="table-responsive">
				<table className="table table-dark table-hover table-bordered">
					<thead className='table-warning'>
						<tr>
							<th scope="col">Market Cap Rank</th>
							<th scope="col">Coin</th>
							<th scope="col">Price (INR)</th>
							<th scope="col">24h Change</th> {/* New column for 24h change */}
							<th scope="col">Market Cap (INR)</th>
						</tr>
					</thead>
					<tbody>
						{filteredCoins.map((coin, index) => (
							<tr key={index}>
								<td>{coin.market_cap_rank}</td>
								<td>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<img src={coin.image} alt={coin.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
										<span>{coin.name}</span>
									</div>
								</td>
								<td>₹ {coin.current_price.toLocaleString()}</td>
								<td>{format24hChange(coin.price_change_percentage_24h)}</td> {/* Display 24h change */}
								<td>₹ {formatMarketCap(coin.market_cap)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default CryptoTable;
