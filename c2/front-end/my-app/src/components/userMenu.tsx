import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router';
import { QAContext } from "../QAContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export default function UserMenu() {
    const history=useHistory()
    const { state } = useContext(QAContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickedMe=(e:any)=>{
      if(e.target.id==="logout")
      history.push("/logout")
      else if(e.target.id==="add-questions")
      history.push("/addQuestion")
      else if(e.target.id==="my-questions"){
        history.push("/",{
          flag:"my-questions"
        })
      }
      else if(e.target.id==="my-answers"){
        console.log("here in if")
        history.push("/myAnswers",{flag:"myAnswers"})
      }
      else if(e.target.id==="my-upvoted-questions"){
        history.push("/",{flag:"myUpVotedQuestions"})
      }
      else if(e.target.id==="my-upvoted-answers"){
        history.push("/myAnswers",{flag:"myUpVotedAnswers"})
      }
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div style={{display:"inline-block"}}>
      <Button aria-describedby={id} onClick={handleClick}>
        <Avatar>{state.activeUser.user.userName.split('')[0]}</Avatar>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography} id="add-questions"onClick={(e:any)=>clickedMe(e)}>Add Questions</Typography>
        <Typography className={classes.typography} id="my-questions" onClick={(e:any)=>clickedMe(e)}>My Questions</Typography>
        <Typography className={classes.typography} id="my-answers" onClick={(e:any)=>clickedMe(e)}>My Answers</Typography>
        <Typography className={classes.typography} id="my-upvoted-questions" onClick={(e:any)=>clickedMe(e)}>My Upvoted Questions</Typography>
        <Typography className={classes.typography} id="my-upvoted-answers" onClick={(e:any)=>clickedMe(e)}>My UpVoted Answers</Typography>
        <Typography className={classes.typography} id="logout" onClick={(e:any)=>clickedMe(e)}>Logout</Typography>

      </Popover>
    </div>
  );
}