// NAVIGATION
function showSection(sectionId, el) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");

  document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active-link"));
  el.classList.add("active-link");

  // 🔥 UPDATE HEADER TITLE
  document.getElementById("sectionTitle").textContent =
    sectionId === "quiz" ? "Quiz" : "Jokes";
}

/* QUIZ DATA (same as before) */
const quizzes = {
  java: [
    {q:"Java is?", o:["Language","OS","Browser"], a:0},
    {q:"JVM stands for?", o:["Java Virtual Machine","Java Variable Method","None"], a:0},
    {q:"Java is platform?", o:["Dependent","Independent","None"], a:1},
    {q:"Keyword for inheritance?", o:["extends","inherit","super"], a:0},
    {q:"Java file extension?", o:[".js",".java",".py"], a:1},
    {q:"Loop keyword?", o:["for","repeat","loop"], a:0},
    {q:"OOP concept?", o:["Encapsulation","Loop","None"], a:0},
    {q:"Java uses?", o:["Compiler","Interpreter","Both"], a:2},
    {q:"Main method?", o:["start()","main()","run()"], a:1},
    {q:"Class keyword?", o:["class","define","struct"], a:0}
  ],
  // (keep other languages same as before)
  c: [
    {q:"C is?", o:["Language","OS","Browser"], a:0},
    {q:"Creator?", o:["Dennis Ritchie","James","Mark"], a:0},
    {q:"Extension?", o:[".c",".java",".py"], a:0},
    {q:"Loop?", o:["for","repeat","loop"], a:0},
    {q:"Header?", o:["stdio.h","iostream","None"], a:0},
    {q:"Printf?", o:["Output","Input","None"], a:0},
    {q:"Main?", o:["Yes","No","Optional"], a:0},
    {q:"Array?", o:["Yes","No","None"], a:0},
    {q:"Pointer?", o:["Yes","No","None"], a:0},
    {q:"Compiled?", o:["Yes","No","None"], a:0}
  ],

  python: [
    {q:"Python is?", o:["Compiled","Interpreted","None"], a:1},
    {q:"File ext?", o:[".py",".java",".c"], a:0},
    {q:"Indentation?", o:["Important","Not","Optional"], a:0},
    {q:"Keyword function?", o:["def","fun","function"], a:0},
    {q:"List type?", o:["Mutable","Immutable","None"], a:0},
    {q:"Loop?", o:["for","loop","iterate"], a:0},
    {q:"Print?", o:["echo","print()","display"], a:1},
    {q:"Library?", o:["numpy","node","react"], a:0},
    {q:"OOP?", o:["Yes","No","Partial"], a:0},
    {q:"Dynamic?", o:["Yes","No","None"], a:0}
  ],

  cpp: [
    {q:"C++ is?", o:["Language","OS","Browser"], a:0},
    {q:"Extension?", o:[".cpp",".c",".py"], a:0},
    {q:"OOP?", o:["Yes","No","None"], a:0},
    {q:"Creator?", o:["Bjarne","Dennis","Mark"], a:0},
    {q:"Header?", o:["iostream","stdio","None"], a:0},
    {q:"Namespace?", o:["std","name","space"], a:0},
    {q:"Loop?", o:["for","loop","iterate"], a:0},
    {q:"Compiled?", o:["Yes","No","None"], a:0},
    {q:"Class?", o:["Yes","No","None"], a:0},
    {q:"Object?", o:["Yes","No","None"], a:0}
  ],

  html: [
    {q:"HTML stands for?", o:["Hyper Text Markup Language","Hyper Tool","None"], a:0},
    {q:"Tag?", o:["<p>","print","def"], a:0},
    {q:"Image tag?", o:["<img>","<image>","<pic>"], a:0},
    {q:"Link tag?", o:["<a>","<link>","<href>"], a:0},
    {q:"List tag?", o:["<ul>","<list>","<lii>"], a:0},
    {q:"Heading?", o:["<h1>","<head>","<title>"], a:0},
    {q:"Table?", o:["<table>","<tb>","<trr>"], a:0},
    {q:"Form?", o:["<form>","<input>","<data>"], a:0},
    {q:"Break?", o:["<br>","<break>","<b>"], a:0},
    {q:"Div?", o:["<div>","<d>","<block>"], a:0}
  ],

  js: [
    {q:"JS used for?", o:["Logic","Style","Structure"], a:0},
    {q:"Variable?", o:["let","var","Both"], a:2},
    {q:"Function?", o:["function","def","fun"], a:0},
    {q:"DOM?", o:["Yes","No","None"], a:0},
    {q:"Event?", o:["click","press","Both"], a:2},
    {q:"Array?", o:["Yes","No","None"], a:0},
    {q:"Object?", o:["Yes","No","None"], a:0},
    {q:"Fetch?", o:["API","CSS","HTML"], a:0},
    {q:"Async?", o:["Yes","No","None"], a:0},
    {q:"Console?", o:["console.log","print","echo"], a:0}
  ]
};

let currentQuiz = [];
let index = 0;
let score = 0;
let answered = false;

function startQuiz(lang) {
  currentQuiz = quizzes[lang];
  index = 0;
  score = 0;

  document.getElementById("quizArea").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  answered = false;

  let q = currentQuiz[index];
  document.getElementById("question").textContent = q.q;

  let answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.o.forEach((opt,i)=>{
    let btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => {
      if (answered) return;
      answered = true;

      if (i === q.a) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
      }

      // highlight correct answer
      Array.from(answers.children).forEach((b, idx) => {
        if (idx === q.a) {
          b.classList.add("correct");
        }
      });
    };

    answers.appendChild(btn);
  });
}

function nextQuestion() {
  index++;

  if(index < currentQuiz.length){
    loadQuestion();
  } else {
    document.getElementById("quizArea").innerHTML =
      `<h3>Score: ${score}/${currentQuiz.length}</h3>
       <button onclick="restartQuiz()">Try Again</button>`;
  }
}

function restartQuiz() {
  document.getElementById("quizArea").innerHTML = `
    <p id="question"></p>
    <div id="answers"></div>
    <button onclick="nextQuestion()">Next</button>
  `;
  index = 0;
  score = 0;
  loadQuestion();
}

/* API */
async function getJoke(){
  let joke = document.getElementById("joke");
  joke.textContent = "Loading...";
  try{
    let res = await fetch("https://official-joke-api.appspot.com/random_joke");
    let data = await res.json();
    joke.textContent = data.setup + " 😂 " + data.punchline;
  }catch{
    joke.textContent = "Failed to fetch joke!";
  }
}