import cn from 'classnames';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import arrowBack from './arrowBack.svg'
import styles from './ButtonBack.module.scss';

// export type CardProps = {
//     /** Дополнительный classname */
//     className?: string,
//     /** URL изображения */
//     image: string;
//     /** Слот над заголовком */
//     captionSlot?: React.ReactNode;
//     /** Заголовок карточки */
//     title: React.ReactNode;
//     /** Описание карточки */
//     subtitle: React.ReactNode;
//     /** Содержимое карточки (футер/боковая часть), может быть пустым */
//     contentSlot?: React.ReactNode;
//     /** Клик на карточку */
//     onClick?: React.MouseEventHandler;
//     /** Слот для действия */
//     actionSlot?: React.ReactNode;
// };

const ButtonBack: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.buttonBack} onClick={() => navigate(-1)}>
            <img src={arrowBack} alt="" />
            <span>Назад</span>
        </div>
    )
};

export default ButtonBack;
