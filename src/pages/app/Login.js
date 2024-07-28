import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import logo from "images/original/logo2.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useDispatch, useSelector } from "react-redux";
import initSqlJs from "sql.js";
import dataBase from "../../db/kanji_vocab_database.db";
import { setDatabase } from "store/app/databaseSlice";
import { loginSuccess, logout } from "store/app/authSlice";
import {
  setResponseStudyKanjiLessons,
  setResponseStudyVocabularyLessons,
} from "store/app/studySettingsSlice";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Container = styled.div`
  ${tw`w-screen h-screen flex flex-col items-center justify-center`}
`;
const Content = tw.div`max-w-screen-xl m-0 bg-white text-gray-900 shadow flex justify-center h-full w-full items-center
  sm:mx-20 sm:my-16 sm:rounded-lg
  sm:h-fit
  sm:w-fit
`;
const MainContainer = tw.div`
  p-6 h-fit
  sm:p-12
  lg:py-20 lg:px-56
  xl:py-32 xl:px-96 
  w-full
  `;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-20 sm:h-24 lg:h-32 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const Message = styled.div`
  ${tw`mt-6 text-center`}
  color: ${({ isVisible }) => (isVisible ? "red" : "transparent")};
`;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const database = useSelector((state) => state.database.database);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(logout());
    }
    if (!database) {
      const loadDataBase = async () => {
        const SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`,
        });
        const db = new SQL.Database(
          new Uint8Array(await (await fetch(dataBase)).arrayBuffer())
        );
        dispatch(setDatabase(db));
      };
      loadDataBase();
    }

    const user = localStorage.getItem("user");
    if (user) {
      const userObject = JSON.parse(user);
      setUsername(userObject.username);
      setPassword(userObject.password);
    }
  });

  const getKanjiLessons = async () => {
    try {
      const query = `
          WITH KanjiList AS (
            SELECT 
              kl.level,
              kl.id_lesson, 
              '[' || GROUP_CONCAT('{"id": ' || kl.id_kanji || ', "kanji": "' || k.kanji || '"}', ', ') || ']' as kanjis
            FROM (
              SELECT DISTINCT level, id_lesson, id_kanji 
              FROM kanji_lessons
            ) kl
            JOIN kanjis k ON kl.id_kanji = k.id
            GROUP BY kl.level, kl.id_lesson
          )
          SELECT 
            kl.level,
            kl.id_lesson,
            kl.kanjis
          FROM KanjiList kl
          ORDER BY kl.level DESC, kl.id_lesson ASC;
        `;
      const stmt = database.prepare(query);
      const lessons = {
        N5: [],
        N4: [],
        N3: [],
        N2: [],
        N1: [],
      };
      while (stmt.step()) {
        const row = stmt.getAsObject();
        const kanjis = JSON.parse(row.kanjis);
        const level = row.level;
        lessons[level].push({
          id: row.id_lesson,
          kanjis: kanjis,
        });
      }
      dispatch(setResponseStudyKanjiLessons(lessons));
      stmt.free();
    } catch (error) {
      console.error(
        `Failed to load kanji lessons from database`,
        error
      );
    }
  };

  const getVocabularyLessons = async () => {
    try {
      const query = `
          WITH VocabularyLessons AS (
            SELECT 
              vl.id_lesson,
              vl.level,
              '[' || GROUP_CONCAT('{"id": ' || vl.id_word || ', "word": "' || w.word || '"}', ', ') || ']' as words
            FROM (
              SELECT DISTINCT level, id_lesson, id_word 
              FROM vocab_lessons
            ) vl
            JOIN words w ON vl.id_word = w.id
            GROUP BY vl.level, vl.id_lesson
          )
          SELECT 
            vl.level,
            vl.id_lesson,
            vl.words
          FROM VocabularyLessons vl
          ORDER BY vl.level DESC, vl.id_lesson ASC;
        `;
      const stmt = database.prepare(query);
      const lessons = {
        N5: [],
        N4: [],
        N3: [],
        N2: [],
        N1: [],
      };
      while (stmt.step()) {
        const row = stmt.getAsObject();
        const words = JSON.parse(row.words);
        const level = row.level;
        lessons[level].push({
          id: row.id_lesson,
          words: words,
        });
      }
      dispatch(setResponseStudyVocabularyLessons(lessons));
      stmt.free();
    } catch (error) {
      console.error(
        `Failed to load vocabulary lessons from database`,
        error
      );
    }
  };

  useEffect(() => {
    if (database) {
      const setKanjiLessons = async () => {
        await getKanjiLessons();
      };
      setKanjiLessons();
      const setVocabularyLessons = async () => {
        await getVocabularyLessons();
      };
      setVocabularyLessons();
    }
  }, [database]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!database) {
      setDisplayMessage(true);
      setMessage("Could not login");
      return;
    }

    try {
      const query = `SELECT * FROM users WHERE user = ?`;
      const stmt = database.prepare(query);
      stmt.bind([username]);
      if (stmt.step()) {
        const user = stmt.getAsObject();
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (passwordIsValid) {
          const userObject = {
            id: user.id,
            username: user.user,
            password: password,
          };

          localStorage.setItem("user", JSON.stringify(userObject));

          dispatch(loginSuccess(userObject));
          setDisplayMessage(false);
          setMessage("");
          navigate("/app");
        } else {
          localStorage.removeItem("user");
          setDisplayMessage(true);
          setMessage("Incorrect username or password");
        }
      } else {
        setDisplayMessage(true);
        setMessage("Incorrect username or password");
      }
      stmt.free();
    } catch (error) {
      setDisplayMessage(true);
      setMessage("Could not login");
    }
  };

  const logoLinkUrl = "#";
  const headingText = "Login";
  const submitButtonText = "Login";
  const SubmitButtonIcon = LoginIcon;

  return (
    <Container>
      <Content>
        <MainContainer>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <Form>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Message isVisible={displayMessage}>{message}</Message>
                <SubmitButton type="submit" onClick={handleLogin}>
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
              </Form>
            </FormContainer>
          </MainContent>
        </MainContainer>
      </Content>
    </Container>
  );
};

export default LoginPage;
