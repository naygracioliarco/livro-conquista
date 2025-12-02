interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

function DownloadButton({ onClick, disabled = false }: DownloadButtonProps) {
  return (
    <div className="flex">
      <button
        onClick={onClick}
        style={{
          position: 'relative',
          padding: '10px 10px 10px 45px',
          backgroundColor: '#BF3154',
          boxShadow: '0px 4px 0px #9C2F4B',
          borderRadius: '0 30px 30px 0',
          color: 'white',
          fontFamily: 'Ubuntu',
          fontSize: '12px',
          fontWeight: 700,
          lineHeight: '1.4em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          margin: '1em 0.4em 1.4em 1.4em',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          opacity: disabled ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = '#9C2F4B';
            e.currentTarget.style.boxShadow = '0px 2px 0px #7A2440';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = '#BF3154';
            e.currentTarget.style.boxShadow = '0px 4px 0px #9C2F4B';
          }
        }}
        disabled={disabled}
      >
        <div
          style={{
            position: 'absolute',
            left: '-15px',
            top: '54%',
            transform: 'translateY(-50%)',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: '#BF3154',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            background: 'transparent url("/images/download.png") no-repeat center',
            backgroundSize: '100%',
          }}
        >
        </div>
        Download
      </button>
    </div>
  );
}

export default DownloadButton;

