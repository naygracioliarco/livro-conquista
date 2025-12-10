function Footer() {
    return (
        <footer style={{
            backgroundColor: '#EEE6D4', display: 'flex',
            // width: '939px',
            height: '150px',
            paddingBottom: '10px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
        }}>
            <img src="images/conquistaLogo.png" alt="Logo" style={{ width: '110.27px', height: '62.81px' }} />
            <p style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Ubuntu, sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
                textTransform: 'uppercase',
            }}>
                É um Selo Editorial da Companhia Brasileira de Educação e
                Sistemas de Ensino S.A
            </p>
        </footer>
    );
}

export default Footer;

