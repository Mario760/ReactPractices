import { useState, useEffect } from 'react'
import { UserProvider } from './components/UserContext';
import Header from './components/Header';
import Question from "./components/Question";
import Results from "./components/Results";
import UserForm from './components/UserForm';
import {Routes, Route} from "react-router-dom";
import "./style.css";

function App() {
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },{
      question: "What's your favorite hobby?",
      options: ["Reading 📚", "Sports 🏈", "Gaming 🕹️", "Traveling 🚀"],
    },{
      question: "What's your favorite season?",
      options: ["Summer 🌞", "Winter ☃️", "Spring 🌷", "Autumn 🍂"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Reading 📚": "Water", 
    "Sports 🏈": "Fire", 
    "Gaming 🕹️": "Earth", 
    "Traveling 🚀": "Air",
    "Summer 🌞": "Fire",
    "Winter ☃️": "Water", 
    "Spring 🌷": "Earth", 
    "Autumn 🍂": "Air",
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };
  
  async function fetchArtwork(elementKeyword){
    try{
      const searchResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${elementKeyword}`,{mode:"cors"});
      const searchData = await searchResponse.json();
      if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
        setArtwork(null);
        return;
      }

      const randomObjectId = searchData.objectIDs[Math.floor(Math.random() * searchData.objectIDs.length)];

      const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`,{mode:"cors"});
      const objectData = await objectResponse.json();

      setArtwork(objectData);

    }catch(error){
      throw Error("Fetch Data Incorrectly!");
    }
  };

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <div>
      <UserProvider value={{name:userName, setName:setUserName}}>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App
