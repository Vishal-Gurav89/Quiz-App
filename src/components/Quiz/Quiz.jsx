import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { data } from '../../assets/data';

const Container = styled.div`
  width: 640px;
  margin: auto;
  margin-top: 150px;
  background: rgb(253, 252, 252);
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  padding: 40px 50px;
`;

const Hr = styled.hr`
  height: 2px;
  border: none;
  background: #707070;
`;

const Heading = styled.h2`
  font-size: 27px;
  font-weight: 500;
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  height: 70px;
  padding-left: 15px;
  border: 1px solid #686868;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 20px;
  cursor: pointer;
  &.correct {
    background: #dffff2;
    border-color: #06f8b3;
  }
  &.wrong {
    background: #ffebef;
    border-color: #f83940;
  }
`;

const Button = styled.button`
  margin: auto;
  width: 250px;
  height: 65px;
  background: #5bb5f1;
  color: #fff;
  font-size: 25px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
`;

const IndexText = styled.div`
  margin: auto;
  font-size: 18px;
`;

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        setLock(true);
        option_array[question.ans - 1].current.classList.add('correct');
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <Container>
      <h1>Quiz App</h1>
      <Hr />
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <Button onClick={reset}>Reset</Button>
        </>
      ) : (
        <>
          <Heading>
            {index + 1}. {question.question}
          </Heading>
          <OptionList>
            <OptionItem ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </OptionItem>
            <OptionItem ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </OptionItem>
            <OptionItem ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </OptionItem>
            <OptionItem ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </OptionItem>
          </OptionList>
          <Button onClick={next}>Next</Button>
          <IndexText>
            {index + 1} of {data.length} questions
          </IndexText>
        </>
      )}
    </Container>
  );
};

export default Quiz;
