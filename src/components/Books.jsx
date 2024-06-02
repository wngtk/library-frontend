import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)
  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.map(b => b.genres).flat())]

  const booksToShow = filter ? books.filter(b => b.genres.includes(filter)) : books

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
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => {
          return <button onClick={() => setFilter(genre)}>{genre}</button>
        })}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
