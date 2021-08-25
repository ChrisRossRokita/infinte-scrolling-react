import "./App.css";
import React, { useState, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setpageNumber] = useState(1)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setpageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setpageNumber(1)
  }
  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)
  return (
    <>
      <input type="text" value={query} onChange={handleSearch}></input>
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return <div ref={lastBookElementRef} key={book}>{book}</div>
        } else{
          <div key={book}>{book}</div>
        }
        return 
        
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>

  );
}

