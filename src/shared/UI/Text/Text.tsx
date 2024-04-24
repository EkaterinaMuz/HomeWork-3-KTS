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

const Text: React.FC<TextProps> = ({
    className,
    tag: Tag = 'p',
    color,
    weight = 'normal',
    view = 'p-14',
    maxLines,
    children
}) => {
    return (
        <Tag className={cn(
            className,
            s[`view_${view}`],
            s[`text_color_${color}`],
            s[`text_weight_${weight}`],
            { [s.text_clamp]: maxLines }
        )}
            style={{ WebkitLineClamp: maxLines }}>
            {children}
        </Tag>
    )
}

export default Text;
