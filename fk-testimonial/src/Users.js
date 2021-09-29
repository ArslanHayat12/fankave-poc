import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function clearSession() {
  localStorage.removeItem('id')
  localStorage.removeItem('token')
  localStorage.removeItem('tokenSecret')
}

function setSession(id = '', token = '', tokenSecret = '') {
  localStorage.setItem('id', id)
  localStorage.setItem('token', token)
  localStorage.setItem('tokenSecret', tokenSecret)
}
function Users() {
  const query = useQuery()
  useEffect(() => {
    clearSession()
    setSession(query.get('id'), query.get('token'), query.get('tokenSecret'))
    window.location.search && window.open('', '_self').close()
  }, [window.location.search])

  return ''
}

export default Users
