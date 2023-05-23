import React from 'react'
import FbImageGrid from 'react-fb-image-grid'
import { useSelector } from 'react-redux'

const PostImage = ({images, id}) => {

  const { theme } = useSelector(state => state)
  const imagefb = images.map(item => item.url)
  return (
    <div style={{filter: theme ? 'invert(1)' : 'invert(0)'}}>
      <FbImageGrid images={imagefb}  hideOverlay={true} />
    </div>
  )
}

export default PostImage