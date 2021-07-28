// import { useState, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';

import logo from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'
import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
import closeImg from "../assets/images/close.svg";

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { Questions } from '../components/Questions';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date,
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });

  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Logo do App" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala: {title}</h1>
          { questions.length > 0 && <span>{questions.length} Perunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Questions
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                
                {!question.isAnswered && (
                  <>
                    <button
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>

                    <button
                      onClick={() => handleHighLightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à Perunta" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover Perunta" />
                </button>
              </Questions>
            )
          })}
        </div>
      </main>
    </div>
  );
}