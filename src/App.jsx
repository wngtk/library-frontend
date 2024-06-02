import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import Recommand from "./components/Recommand";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const allBooksQuery = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client}) => {
      const addedBook = data.data.bookAdded

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
      // console.log(addedBook)
    }
  })

  useEffect(() => {
    if (token) {
      setPage("authors")
    }
  }, [token])

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    setToken(userToken)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          token
          ? <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => setPage("recommand")}>recommand</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage("login")}>login</button>
        }
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} books={allBooksQuery.data?.allBooks} refetchAllBooks={() => allBooksQuery.refetch()} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setToken={setToken} />

      <Recommand show={page === "recommand"} books={allBooksQuery.data?.allBooks} />
    </div>
  );
};

export default App;
