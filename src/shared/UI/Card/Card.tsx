import cn from 'classnames';
import * as React from 'react';
import Text from '@/shared/UI/Text';
import s from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <div onClick={props.onClick} className={cn(props.className, s.card)}>
      <img className={s.img} src={props.image} alt="" />
      <div className={s.info}>
        <div className={s.text}>
          {props.captionSlot && (
            <Text className={s.caption} weight="medium" view="p-14" color="secondary">
              {props.captionSlot}
            </Text>
          )}
          <Text maxLines={2} className={s.title} weight="bold" view="p-20" color="primary">
            {props.title}
          </Text>
          <Text maxLines={3} className={s.descr} view="p-16" color="secondary">
            {props.subtitle}
          </Text>
        </div>
        <div className={s['card-footer']}>
          {props.contentSlot && (
            <Text view="p-18" weight="bold">
              ${props.contentSlot}
            </Text>
          )}
          {props.actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
