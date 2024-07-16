// import React, { useState, useEffect } from "react";
// import tw from "twin.macro";
// import styled from "styled-components";
// import { css } from "styled-components/macro"; //eslint-disable-line
// import logo from "images/original/logo2.png";
// import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
// import initSqlJs from "sql.js";
// import dataBase from "../db/kanji_vocab_database.db";

// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginSuccess } from "store/authSlice";
// import bcrypt from "bcryptjs";

// const Container = styled.div`
//   ${tw`w-screen h-screen flex flex-col items-center justify-center`}
// `;
// const Content = tw.div`max-w-screen-xl m-0 bg-white text-gray-900 shadow flex justify-center h-full w-full items-center
//   sm:mx-20 sm:my-16 sm:rounded-lg
//   sm:h-fit
//   sm:w-fit
// `;
// const MainContainer = tw.div`
//   p-6 h-fit
//   sm:p-12
//   lg:py-20 lg:px-56
//   xl:py-32 xl:px-96 
//   w-full
//   `;
// const LogoLink = tw.a``;
// const LogoImage = tw.img`h-20 sm:h-24 lg:h-32 mx-auto`;
// const MainContent = tw.div`mt-12 flex flex-col items-center`;
// const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
// const FormContainer = tw.div`w-full flex-1 mt-8`;

// const Form = tw.form`mx-auto max-w-xs`;
// const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
// const SubmitButton = styled.button`
//   ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
//   .icon {
//     ${tw`w-6 h-6 -ml-2`}
//   }
//   .text {
//     ${tw`ml-3`}
//   }
// `;

// const Message = styled.div`
//   ${tw`mt-6 text-center`}
//   color: ${({ isVisible }) => (isVisible ? "red" : "transparent")};
// `;

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [db, setDb] = useState(null);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [displayMessage, setDisplayMessage] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const loadDataBase = async () => {
//       const SQL = await initSqlJs({
//         locateFile: (file) => `https://sql.js.org/dist/${file}`,
//       });
//       const db = new SQL.Database(
//         new Uint8Array(await (await fetch(dataBase)).arrayBuffer())
//       );
//       setDb(db);
//     };
//     loadDataBase();
//   }, []);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     if (!db) {
//       setDisplayMessage(true);
//       setMessage("Could not login");
//       return;
//     }

//     try {
//       const query = `SELECT * FROM users WHERE user = ?`;
//       const stmt = db.prepare(query);
//       stmt.bind([username]);
//       if (stmt.step()) {
//         const user = stmt.getAsObject();
//         const passwordIsValid = bcrypt.compareSync(password, user.password);
//         if (passwordIsValid) {
//           dispatch(
//             loginSuccess({
//               id: user.id,
//               username: user.user,
//             })
//           );
//           setDisplayMessage(false);
//           setMessage("");
//           navigate("/app");
//         } else {
//           setDisplayMessage(true);
//           setMessage("Incorrect username or password");
//         }
//       } else {
//         setDisplayMessage(true);
//         setMessage("Incorrect username or password");
//       }
//       stmt.free();
//     } catch (error) {
//       setDisplayMessage(true);
//       setMessage("Could not login");
//     }
//   };

//   const logoLinkUrl = "#";
//   const headingText = "Login";
//   const submitButtonText = "Login";
//   const SubmitButtonIcon = LoginIcon;

//   return (
//     <Container>
//       <Content>
//         <MainContainer>
//           <LogoLink href={logoLinkUrl}>
//             <LogoImage src={logo} />
//           </LogoLink>
//           <MainContent>
//             <Heading>{headingText}</Heading>
//             <FormContainer>
//               <Form>
//                 <Input
//                   type="text"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <Message isVisible={displayMessage}>{message}</Message>
//                 <SubmitButton type="submit" onClick={handleLogin}>
//                   <SubmitButtonIcon className="icon" />
//                   <span className="text">{submitButtonText}</span>
//                 </SubmitButton>
//               </Form>
//             </FormContainer>
//           </MainContent>
//         </MainContainer>
//       </Content>
//     </Container>
//   );
// };

// export default LoginPage;
