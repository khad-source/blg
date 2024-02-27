import { NavLink } from "react-router-dom"



export const Navigation = () => {
  
  return (
   
    <nav>

<NavLink to="/" >home</NavLink>
<NavLink to="/p/register.html" >page</NavLink>
<NavLink to="/:year/:month/test-post.html" >test-post</NavLink>
<NavLink to="/:year/:month/:slug" >post</NavLink>
    </nav>
   
  )
}
