import React, { useState } from 'react';
import axios from 'axios';

function ProductSearch() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.post('/api/products/search', { keySearch: searchQuery });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for products:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default ProductSearch;
