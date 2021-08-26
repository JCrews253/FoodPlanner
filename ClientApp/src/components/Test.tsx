import gql from "graphql-tag"


gql`
  query Users($id: ID!){
    user(id: $id){
      ... on User{
        id
      }
    }
  }
`


const Test = () => {

  return (
    <h1>test component</h1>
  )
}

export default Test