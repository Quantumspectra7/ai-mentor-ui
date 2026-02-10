'use client';
import React, {
  createContext,
  useState,
  useRef,
} from 'react';

const MouseEnterContext = createContext<
  {
    x: number;
    y: number;
  } | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - left, y: e.clientY - top });
  };

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

  return (
    <MouseEnterContext.Provider value={mousePosition}>
      <div
        ref={contextRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`h-auto w-full group/container relative ${containerClassName}`}
      >
        <div
          className={`relative w-full h-full ${className}`}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative h-full w-full rounded-2xl p-4 dark:bg-black bg-white dark:border-white/[0.2] border-black/[0.1] border flex flex-col items-start justify-start ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';

export const CardItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    translateZ?: number | string;
    as?: React.ElementType;
  }
>(({ className, children, translateZ = 0, as: Tag = 'div', ...props }, ref) => {
  return (
    <Tag
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
});

CardItem.displayName = 'CardItem';
