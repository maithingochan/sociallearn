import React from 'react'
import { useParams } from 'react-router-dom'
import Notfound from '../components/Notfound'
import { useSelector } from 'react-redux'


const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default
  try {
    return React.createElement(component())
  } catch (err) {
    return <Notfound />
  }
}


const PageRender = () => {
  const {page, id} = useParams()
  console.log({page, id})
  const { auth } = useSelector(state => state)

  let pageName = ""

  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`
    } else {
      pageName = `${page}`
    }
  }
  
  const pageNameU = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return generatePage(pageNameU)
} 

export default PageRender