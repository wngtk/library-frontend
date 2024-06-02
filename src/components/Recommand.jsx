import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommand = (props) => {
  const result = useQuery(ALL_BOOKS)
  const queryMe = useQuery(ME, {
    onError: (error) => {
      console.error(error.graphQLErrors[0].message)
    }
  })

  if (result.loading || !props.show || queryMe.loading)
    return null

  const favoriteGenre = queryMe.data.me.favoriteGenre

  const books = result.data.allBooks
  const booksToShow = books.filter(b => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommandations</h2>
      <p>books in your favorite genre <span style={{fontWeight: "bold"}}>{favoriteGenre}</span></p>

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

    </div>
  )
}

export default Recommand
