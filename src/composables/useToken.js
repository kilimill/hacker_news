export default function useToken() {
  let currentToken = null,
    token = null

  const setNewToken = () => {
    token = Symbol('fetchDataToken')
    currentToken = token
  }

  const resetToken = () => (currentToken = Symbol('fetchDataToken'))

  const isTokenValid = () => currentToken == token

  const hasCurrentToken = () => currentToken !== null

  return {
    tokenHandler: {
      set: setNewToken,
      reset: resetToken,
      isValid: isTokenValid,
      has: hasCurrentToken,
    },
  }
}
