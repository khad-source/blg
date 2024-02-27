import { Box, Container, Grid, styled } from "@mui/material"
import { PostList } from "./PostList"
import  {PostPage}  from "./PostPage"
import { Route, Routes,BrowserRouter as Router } from  "react-router-dom"


export const BodyList = (props) => {

const Styleddiv = styled('div')({
flexGrow: 1,
})

const Styledbox = styled(Box)(({ theme }) => ({
paddingBottom: theme.spacing(1.5),
paddingTop: theme.spacing(1.5),
background: "skyblue",

[theme.breakpoints.up('sm')]: {
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5)
}
}))
return (
<Box >
  <Container>  {/* maxWidth="lg" */}
    <Styledbox>
      <Styleddiv>
        <Grid container justify="center">
          <Router>
            <Routes>
              <Route path="/" exact element={<PostList {...props} updateLabel={props.updateLabel} />} />
        <Route path="/:year/:month/:slug" exact element={<PostPage {...props} updateLabel={props.updateLabel} />} />
        <Route path="/search/label/:label" exact element={<PostList {...props} updateLabel={props.updateLabel} isLabelPage={true} />} />
        <Route path="/search" exact element={<PostList {...props} updateLabel={props.updateLabel} isSearchPage={true} />} />
        <Route path="*" exact element={<h1>NOT FOUND</h1>} />
            </Routes>
          </Router>

        </Grid>


      </Styleddiv>


    </Styledbox>
  </Container>
</Box>
)
}
