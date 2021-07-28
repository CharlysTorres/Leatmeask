import copy from '../assets/images/copy.svg';
import toast, { Toaster } from 'react-hot-toast';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClickboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button 
      className="room-code" 
      title="Código da sala"
      onClick={copyRoomCodeToClickboard}
    >
      <div>
        <img src={copy} alt="copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}