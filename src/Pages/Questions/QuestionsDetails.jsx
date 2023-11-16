import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//This is used to calculate time from this specific date when ans is poested-future date or time
import moment from "moment";
import copy from "copy-to-clipboard";

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {postAnswer,deleteQuestion,voteQuestion,} from "../../actions/question";

const QuestionsDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);

  const [Answer, setAnswer] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  //we are using user value in several places i.e we put user value in redux 
  //So we can access it from anywhere in the application
  const User = useSelector((state) => state.currentUserReducer);
  const location = useLocation();
  const url = "http://localhost:3000";

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      //to navigate this is in authentication page
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } 
      else 
      {
        //dispatch the through the use dispatch
        dispatch
        (
          postAnswer
          ({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
          })
        );
        setAnswer("");
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, Navigate));
  };

  const handleUpVote = () => {
    if (User === null) {
      alert("Login or Signup to up vote a question");
      Navigate("/Auth");
    } else {
      //dispatch(voteQuestion(id, "upVote"),User.result_id);
      dispatch(voteQuestion(id, "upVote"));
    }
  };

  const handleDownVote = () => {
    if (User === null) {
      alert("Login or Signup to down vote a question");
      Navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "downVote"));
    }
  };

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      //parameter e=events
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={Answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;

// import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";

// import upvote from "../../assets/sort-up.svg";
// import downvote from "../../assets/sort-down.svg";
// import "./Questions.css";
// import Avatar from "../../components/Avatar/Avatar";
// import DisplayAnswer from "./DisplayAnswer";

// const QuestionsDetails = () =>{
//     const {id}=useParams();
//     const questionList = [
//         {
//           _id: 1,
//           upVotes: 3,
//           downVotes:2,
//           noOfAnswers: 2,
//           questionTitle: 'What is function?',
//           questionBody: 'It means to be',
//           questionTags: ['Java', 'node js', 'react js', 'mongoose'],
//           userPosted: 'mano',
//           askedOn: 'Jan 1',
//           answer:[{
//             answerBody:"Answer",
//             userAnswered:'Kumar',
//             answeredOn:"jan 2",
//             userId:2,
//           }]
//         },
//         {
//           _id: 2,
//           upVotes: 3,
//           downVotes:2,
//           noOfAnswers: 0,
//           questionTitle: 'What is function?',
//           questionBody: 'It means to be',
//           questionTags: ['javascript', 'R', 'python'],
//           userPosted: 'mano',
//           askedOn: 'Jan 1',
//           answer:[{
//             answerBody:"Answer",
//             userAnswered:'Kumar',
//             answeredOn:"jan 2",
//             userId:2,
//           }]
//         },
//         {
//           _id: 3,
//           upVotes: 3,
//           downVotes:2,
//           noOfAnswers: 0,
//           questionTitle: 'What is function?',
//           questionBody: 'It means to be',
//           questionTags: ['javascript', 'R', 'python'],
//           userPosted: 'mano',
//           askedOn: 'Jan 1',
//           userId:1,
//           answer:[{
//             answerBody:"Answer",
//             userAnswered:'Kumar',
//             answeredOn:"jan 2",
//             userId:2,
//           }]
//         },
//       ];
//       return (
//         <div className="question-details-page">
//           {questionList === null ? (
//             <h1>Loading...</h1>
//           ) : (
//             <>
//               {
//                 questionList
//                   .filter((question) => question._id === id)
//                   .map((question) => (
//                     <div key={question._id}>
//                       <section className="question-details-container">
//                         <h1>{question.questionTitle}</h1>
//                         <div className="question-details-container-2">
//                           <div className="question-votes">
//                             <img
//                               src={upvote}
//                               alt=""
//                               width="18"
//                               className="votes-icon"
//                             />
//                             <p>{question.upVotes - question.downVotes}</p>
//                             <img
//                               src={downvote}
//                               alt=""
//                               width="18"
//                               className="votes-icon"
//                             />
//                           </div>
//                           <div style={{ width: "100%" }}>
//                             <p className="question-body">{question.questionBody}</p>
//                             <div className="question-details-tags">
//                               {question.questionTags.map((tag) => (
//                                 <p key={tag}>{tag}</p>
//                               ))}
//                             </div>
//                             <div className="question-actions-user">
//                               <div>
//                                 <button type="button">Share </button>
//                                 <button type="button">Delete</button>
                                
//                               </div>
//                               <div>
//                                 <p>{question.askedOn}</p>
//                                 <Link
//                                   to={`/Users/${question.userId}`}
//                                   className="user-link"
//                                   style={{ color: "#0086d8" }}
//                                 >
//                                   <Avatar
//                                     backgroundColor="orange"
//                                     px="8px"
//                                     py="5px"
//                                     borderRadius="4px"
//                                   >
//                                     {question.userPosted.charAt(0).toUpperCase()}
//                                   </Avatar>
//                                   <div>{question.userPosted}</div>
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </section>
    
//                       {question.noOfAnswers !== 0 && (
//                         <section>
//                           <h3>{question.noOfAnswers} Answers</h3>
//                           <DisplayAnswer
//                             key={question._id}
//                             question={question}
//                           />
//                         </section>
//                       )}
    
//                       <section className="post-ans-container">
//                         <h3>Your Answer</h3>
//                         <form>
//                           <textarea
//                             name=""
//                             id=""
//                             cols="30"
//                             rows="10"

//                           ></textarea>
//                           <br />
//                           <input
//                             type="submit"
//                             className="post-ans-btn"
//                             value="Post Your Answer"
//                           />
//                         </form>
    
//                         <p>
//                           Browse other Questions tagged
//                           {question.questionTags.map((tag) => (
//                             <Link to="/Tags" key={tag} className="ans-tags">
//                               {" "}
//                               {tag}{" "}
//                             </Link>
//                           ))}{" "}
//                           or
//                           <Link
//                             to="/AskQuestion"
//                             style={{ textDecoration: "none", color: "#009dff" }}
//                           >
//                             {" "}
//                             ask your own question.
//                           </Link>
//                         </p>
//                       </section>
//                     </div>
//                   ))}
//             </>
//           )}
//         </div>
//       );
//     };
    
//     export default QuestionsDetails;