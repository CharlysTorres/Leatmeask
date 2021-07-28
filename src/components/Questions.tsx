import { ReactNode } from 'react'
import classNames from 'classnames'

import '../styles/questions.scss';

type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Questions({content, author, children, isAnswered = false, isHighlighted = false  }: QuestionsProps) {
  return (
    <div className={classNames('question', 
      {answered: isAnswered},
      {highlighted: isHighlighted && !isAnswered}
    )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}