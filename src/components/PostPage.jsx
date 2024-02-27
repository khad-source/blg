//import CommentList from './CommentList'
import jsonpAdapter from 'axios-jsonp'
import { useEffect, useState } from 'react';
import axios from 'axios';


export const PostPage = (props) => {
  const [post, setPost] = useState(null)
  const [postId, setPostID] = useState('1099604592838902147')
  const [isFetch, setIsFetch] = useState(false);
const [state,setState]=useState({   commentList: [],
  commentReplyList: [],isFetchComment: false})

  useEffect(() => {
   
    //q dynamiq= doc.title
    /*  axios({
      url: `${process.env.NODE_ENV === "development" ? "//usereact.blogspot.com" : ""}/feeds/posts/default?q=the-best-ways-to-utilize-high&alt=json-in-script`, 
      adapter: jsonpAdapter
   
  }).then(res => {
   
    if (!res.data.feed.entry) console.log('article not found')
    if (res.data.feed.entry) {
      props.updateLabel(res.data.feed.category)
       // (res.data.feed.entry)==post psk un seul post[{un seul obj=post}]
          const post = res.data.feed.entry.filter(el => el.link.filter(item=>item.rel === "alternate")[0].href.includes(document.location.pathname) )
          //A mettre dynamiq document.title => && arr.title.$t === document.title)
          setPostID(post[0].id.$t.split("-")[2]);
     //  post&& console.log(post);
         setPost( post)   
    }
  }).catch(error => {
    console.log('Error fetching JSONP data:', error);
  }) */
 
  function fetchCommentList() {
    axios({
        url: `${process.env.NODE_ENV === "development" ? "//usereact.blogspot.com" : ""}/feeds/${postId}/comments/default?alt=json-in-script&reverse=false&orderby=published&start-index=1`,
        adapter: jsonpAdapter,
      }).then(res => {
        if (res.data.feed.entry) {
          console.log(res.data.feed.entry)
            const processMap = res.data.feed.entry.map((arr) => {
              let id = arr.id.$t.split("-").pop()
              let related = arr.link.filter((arr) => arr.rel === "related")
              related = Boolean(related.length) && related[0].href.split("/").pop()
              arr.related = related
              arr.id = id
              console.log(related)
              console.log(id)
              console.log(arr)
              return arr
          })
          const commentList = processMap.filter(arr => arr.related === !1)
                const commentReplyList = processMap.filter(arr => typeof arr.related === "string")
               setState({ commentList, commentReplyList, isFetchComment: true })
            }
        })
    }
  
  })
  

  return (
    <>
    <div>PostPage</div>
 
    </>
  )
}
