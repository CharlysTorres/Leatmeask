import { useContext, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { AuthContext } from '../contexts/AuthContext';

import '../styles/auth.scss';

export function NewRoom() {
  const [ newRoom, setNewRoom ] = useState('');
  const { user, SignInWithGoogle } = useContext(AuthContext);
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    console.log(newRoom);

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
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
        <h2>Criar um nova sala</h2>
        <form onSubmit={handleCreateRoom}>
          <input
            type="text"
            placeholder="Nome da sala"
            onChange={event => setNewRoom(event.target.value)}
            value={newRoom}
          />
          <Button type="submit">
            Criar sala
          </Button>
        </form>
        <p>
          Quer entrar em uma sala existente?
          <Link to="/">Clique aqui</Link>
        </p>
      </div>
    </main>
  </div>
  )
}