import cn from 'classnames';
import * as React from 'react';
import s from './Text.module.scss';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, tag, color, weight, view, maxLines, children }) => {
    const Tag = tag || 'p';
    return (
        <Tag className={cn(className, {
            [s.btn]: view === 'button',
            [s.title]: view === 'title',
            [s['p-20']]: view === 'p-20',
            [s['p-18']]: view === 'p-18',
            [s['p-16']]: view === 'p-16',
            [s['p-14']]: view === 'p-14',
        })}
            style={{ color, fontWeight: weight, WebkitLineClamp: maxLines }}>
            {children}
        </Tag>
    )
}

export default Text;
