import React, { useState } from 'react'
import Filter from './Filter'
import SearchResult from './SearchResult';
import { useSearchQueryQuery } from '@/features/api/courseApi';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
    // to get the query
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const [categories, setCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");

    const { data, isLoading } = useSearchQueryQuery(
        {
            query: query,
            categories: categories,
            sortByPrice: sortByPrice
        }
    );


    const isEmpty = !isLoading && data?.courses.length === 0;

    const handleFilterChange = (category, price) => {
        setCategories(category);
        setSortByPrice(price);
    }
    return (
        <div className='max-w-7xl mx-auto p-4 md:p-8 mt-5'>
            <div className="my-6">
                <h1 className='font-bold text-xl md:text-2xl'>result for "{query}"</h1>
                <p>Showing results for {""}
                    <span className='text-blue font-bold italic'>{query}</span>
                </p>
            </div>
            <div className='flex flex-col md:flex-row gap-10'>
                <Filter handleFilterChange={handleFilterChange} />

                <div className="flex-1">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <LoadingSkeleton key={idx} />
                        ))
                    ) : isEmpty ? (<CourseNotFound />) : (
                        data?.courses.map((course, _) => (
                            <SearchResult course={course} key={course._id} />
                        ))
                    )}
                </div>
            </div>
        </div>

    )
}

export default SearchPage


const LoadingSkeleton = () => {
    return (<p>Loading...</p>)
}

const CourseNotFound = () => {
    return (<p>Course not found</p>)
}