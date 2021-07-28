import { useHistory } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import illustration from '../assets/images/illustration.svg';
import googleIcon from '../assets/images/google-icon.svg';
import logo from '../assets/images/logo.svg';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, SignInWithGoogle } = useAuth();
  const [ roomCode, setRoomCode ] = useState('');

  async function handleCreateRoom() {
    if(!user) {
      await SignInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      toast.error('Room does not exists.');
      return;
    }

    if(roomRef.val().endedAt) {
      toast('Room already closed.', {
        icon: '⏰',
        duration: 5000,
      })
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
    <aside>
      <img src={illustration} alt="ilustração simbolizando perguntas e respostas" />
      <strong>Crie salas de Q&amp;A ao vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo real</p>
    </aside>
    <main>
      <div className="main-content">
        <img src={logo} alt="Logo da aplicação Letmeask" />
        <button onClick={handleCreateRoom} className="create-room">
          <img src={googleIcon} alt="Logo do google" />
          Crie sua sala com o Google
        </button>
        <div className="separator">ou entre em uma sala</div>
        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            placeholder="digite o código da sala"
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
          />
          <Button type="submit">
            Entrar na sala
          </Button>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </form>
      </div>
    </main>
  </div>
  )
}