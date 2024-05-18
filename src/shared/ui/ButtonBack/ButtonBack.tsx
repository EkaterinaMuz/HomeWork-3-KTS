import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBack from './arrowBack.svg';
import s from './ButtonBack.module.scss';

const ButtonBack: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={s.buttonBack} onClick={() => navigate(-1)}>
      <ArrowBack />
      <span>Назад</span>
    </div>
  );
};

export default ButtonBack;
