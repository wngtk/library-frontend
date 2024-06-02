import { useQuery } from "@apollo/client"
import { ALL_BOOKS, FIND_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const useGenres = (books) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (books) {
      setGenres([...new Set(books.map(b => b.genres).flat())])
    }
  }, [books])

  return genres
}

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const genres = useGenres(props.books)
  const result = useQuery(FIND_BOOKS, {
    variables: { genre: filter }
  })

  // When new genre selection is not done, the view does not have to be updated.
  useEffect(() => {
    if (!result.loading) {
      result.refetch()
      props.refetchAllBooks()
    }
  }, [filter])

  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      {filter
        ? <p>in genre <span style={{fontWeight: "bold"}}>{filter}</span></p>
        : <p>in all genres</p>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre, idx) => {
          return <button key={idx} onClick={() => setFilter(genre)}>{genre}</button>
        })}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
