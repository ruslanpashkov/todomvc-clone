import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

interface Props {
  error: string | null;
  closeError: () => void;
}

export const ErrorNotification: FC<Props> = ({ error, closeError }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setIsVisible(true);
    } else {
      setIsVisible(false);

      const timer = window.setTimeout(() => {
        setMessage(null);
      }, 1000);

      return () => window.clearTimeout(timer);
    }
  }, [error]);

  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isVisible,
      })}
    >
      <button
        type="button"
        className="delete"
        aria-label="close"
        onClick={closeError}
      />
      {message}
    </div>
  );
};
