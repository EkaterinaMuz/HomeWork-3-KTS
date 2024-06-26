import * as React from 'react';

type IconProps = {
  className: string;
  onClick: () => void;
};

const DeleteIcon: React.FC<IconProps> = (props) => {
  const { onClick, className } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.05"
        d="M11.8096 22.0319C18.3318 22.0319 23.6191 17.1071 23.6191 11.0319C23.6191 4.95679 18.3318 0.0319214 11.8096 0.0319214C5.28732 0.0319214 0 4.95679 0 11.0319C0 17.1071 5.28732 22.0319 11.8096 22.0319Z"
        fill="#FF6875"
      />
      <path d="M16.6244 7.73903L15.8652 7.03192L7.51462 14.8101L8.27377 15.5172L16.6244 7.73903Z" fill="#518581" />
      <path d="M15.8649 15.517L16.624 14.8099L8.27341 7.03173L7.51426 7.73884L15.8649 15.517Z" fill="#518581" />
    </svg>
  );
};

export default DeleteIcon;
