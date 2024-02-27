import useState from 'react'
import {Box,Skeleton,Link,CardContent,MenuItem,Menu,IconButton,Typography,CardHeader,Card,Avatar} from '@mui/material'

import{MoreVert, Delete,Reply} from '@mui/icons-material';
import { indigo, grey } from '@mui/material/colors';


 
 

const CommentList = props => {

  
const styleAvatar = styled(Avatar)  ({
  
  backgroundColor: indigo[500]
  })
  const [anchorEl, setAnchorEl] = useState(null);
const [isReply, setIsReply] = useState(false);
const [replyID, setReplyID] = useState("");
const [showOn, setShowOn] = useState("");

const handleMenuClick = (event, isReply, replyID) => {
setAnchorEl(event.currentTarget);
setIsReply(isReply);
setReplyID(replyID);
};

const handleCloseMenu = () => {
setAnchorEl(null);
};

const handleReplyClick = () => {
setAnchorEl(null);
setShowOn(replyID);
props.newReply();
};


return (
<React.Fragment>
{!props.isFetchComment ? ([...new Array(parseInt(props.totalComment))].map((arr, i) => (
<Card key={i}>
<CardHeader
avatar={<Skeleton variant="circle"  />}
title={<Skeleton height={14}  />}
subheader={<Skeleton height={12} width="40%" />}
/>
<Box >
<Skeleton height={16} />
</Box>
</Card>
))) : (
<React.Fragment>
{props.commentList?.map((comment, i) => (
<React.Fragment key={i}>
<Card >
<CardHeader
    avatar={comment.author[0].gd$image.src === "https://img1.blogblog.com/img/b16-rounded.gif" ? (<Avatar aria-label="photos">{comment.author[0].name.$t[0]}</Avatar>) : (<Avatar aria-label="photos" src={comment.author[0].gd$image.src} ></Avatar>)}
    action={
        <IconButton aria-label="Comment Option" aria-controls="Comment-menu" aria-haspopup="true" onClick={(event) => handleMenuClick(event, true, comment.id)}>
            <MoreVert />
        </IconButton>
    }
    title={comment.author[0].name.$t}
   
/>
<Box >
    {comment.content.$t}
</Box>
</Card>
{!props.isComment && showOn === comment.id ? (
<Card className={classes.cardReply}>
    <CardContent>
        <iframe title="iframe-comment" frameBorder="0" src={"//www.blogger.com/comment-iframe.g?blogID=" + props.blogID + "&postID=" + props.postID + "&parentID=" + comment.id + "&skin=contempo"} width="100%" height={props.iFrameHeight}></iframe>
    </CardContent>
</Card>
) : null}
{props.commentReplyList?.filter(arr => arr.related === comment.id).map(reply => (
<Card className={classes.cardReply} key={reply.id}>
    <CardHeader
        avatar={reply.author[0].gd$image.src === "https://img1.blogblog.com/img/b16-rounded.gif" ? (<Avatar aria-label="photos" >{reply.author[0].name.$t[0]}</Avatar>) : (<Avatar aria-label="photos" src={reply.author[0].gd$image.src}></Avatar>)}
        title={reply.author[0].name.$t}
        
        action={
            <IconButton aria-label="Comment Option" aria-controls="Comment-menu" aria-haspopup="true" onClick={(event) => {
                handleMenuClick(event, false, reply.id);
            }}>                                            <MoreVert />
            </IconButton>
        }
    />
    <Box >
        {reply.content.$t}
    </Box>
</Card>
))}
</React.Fragment>
))}
<Menu
id="Comment-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleCloseMenu}
>
{isReply ? (
<Box onClick={handleReplyClick}>
<MenuItem>
    <Reply /> Reply
</MenuItem>
</Box>
) : null}
<Link
color="inherit"
component="a"
underline="none"
href={"//www.blogger.com/delete-comment.g?blogID=" + props.blogID + "&postID=" + replyID}
target="_blank"
rel="noreferrer"
>
<MenuItem>
<Delete /> Delete</MenuItem>
</Link>
</Menu>
</React.Fragment>
)}
</React.Fragment>
)}



export default CommentList