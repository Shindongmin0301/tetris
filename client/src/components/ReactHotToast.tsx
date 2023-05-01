import toast, { Toaster } from 'react-hot-toast';
import { useFloating, useHover, useInteractions } from '@floating-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Routes } from 'react-router-dom';

const failNoti = () => toast.error('ㅠㅠㅠ');

const ReactHotToast = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toastRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    toastRef?.current?.classList.add('hello');
  };

  const notify = useCallback(
    () =>
      toast.success(
        <div style={{ width: '100%', padding: 24 }} onClick={() => console.log('clicked')}>
          <div style={{ textAlign: 'center' }}>결제 성공!</div>
          <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '4px' }}>
            {' '}
            클릭해서 확인하러 가기 👉
          </div>
          <div ref={toastRef} className="progress"></div>
        </div>,
        {
          duration: 4000,
          position: 'top-center',
          style: {
            width: '1000px',
            background: 'green',
            color: 'white',
            height: '60px',
            borderRadius: '4px',
            cursor: 'pointer',
          },
        }
      ),
    []
  );
  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      setIsOpen(false);
    }, 4000);

    toastRef.current?.classList.add('hello');
  }, [isOpen]);
  return (
    <Wrapper>
      Hello World
      <div>
        <button
          onClick={() => {
            setIsOpen(true);
            notify();
          }}
        >
          Success
        </button>
        <button onClick={failNoti}>Failed</button>
      </div>
      <Toaster />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  .progress {
    &:after {
      display: inline-block;
      content: '';
      width: 100%;
      height: 8px;
      background: beige;
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 0 0 0 4px;
      transform: scale(0, 1);
      transform-origin: left;
      transition: transform 4s linear;
    }

    &.hello:after {
      transform: scale(1, 1);
    }
  }
`;

export default ReactHotToast;
