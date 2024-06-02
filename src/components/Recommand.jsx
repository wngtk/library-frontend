import { useQuery } from "@apollo/client"
import { ME } from "../queries"

const Recommand = (props) => {
  const queryMe = useQuery(ME, {
    onError: (error) => {
      console.error(error.graphQLErrors[0].message)
    }
  })

  if (!props.show || queryMe.loading || !props.books)
    return null

  const books = props.books
  const favoriteGenre = queryMe.data.me.favoriteGenre
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
