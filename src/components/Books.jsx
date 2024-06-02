import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const useGenres = () => {
  const result = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks
      setGenres([...new Set(books.map(b => b.genres).flat())])
    }
  }, [result.data])

  return genres
}

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  })
  const genres = useGenres()

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
