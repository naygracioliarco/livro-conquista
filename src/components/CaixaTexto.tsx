import { ReactNode } from 'react';

interface CaixaTextoProps {
  title: string;
  children: ReactNode;
}

function CaixaTexto({ title, children }: CaixaTextoProps) {
  return (
    <div
      style={{
        border: '3px solid #0E3B5D',
      }}
      className="p-4 my-4"
    >
      <h4
        style={{
          color: '#BF3154',
          fontFamily: 'HWT Artz',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal',
        }}
        className="mb-4"
      >
        {title}
      </h4>
      <div className="texto-corrido">
        {children}
      </div>
    </div>
  );
}

export default CaixaTexto;

