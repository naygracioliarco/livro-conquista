import { ChevronDown } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
}

function Pagination({ currentPage }: PaginationProps) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        display: 'flex',
        width: '100%',
        padding: '4px 360px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#F8B9CB',
      }}
    >
      <span>Página - {currentPage}</span>
      <ChevronDown size={20} />
    </div>
  );
}

export default Pagination;

