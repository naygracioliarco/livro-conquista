function Header() {
  return (
    <header
      className="relative text-white py-8 px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/Capa-1.png)',
      }}
    >
      {/* Conteúdo do header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <img
            src="/images/icon.png"
            alt="Ícone"
            className="w-23 h-29 object-contain"
          />
          <div className="flex flex-col">
            <h1
              className="font-hwtArtz font-bold"
              style={{
                WebkitTextStroke: '1.5px #000000',
                fontWeight: 800,
                fontSize: '48px',
              }}
            >
              PRODUÇÃO DE TEXTOS
            </h1>
            <p
              className="text-white font-hwtArtz rounded-[20px] px-4 py-2 inline-block w-fit mt-4"
              style={{
                backgroundColor: '#9C2F4B',
                fontWeight: 700,
                fontSize: '24px',

              }}
            >
              6º ANO - VOLUMES 1 E 2
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

