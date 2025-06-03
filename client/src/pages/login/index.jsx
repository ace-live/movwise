import { useState } from 'react';
import { Box } from '@mui/material';
import AuthTabs from '@components/login/authtabs';
import LoginForm from '@components/login/loginform';
import RegistrationForm from '@components/login/registrationform';
import SocialSignIn from '@components/login/socialsignin';
import LoginImage from '@assets/login/LoginImage.jpg';
import './styles.scss';


const LoginPage = () => {
    const [tab, setTab] = useState(0);

    return (

        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: '100vh',
            height: 'auto',
            backgroundImage: { xs: `url(${LoginImage})`, md: 'none' },
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#269272',
        }}>
            <Box sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                // backgroundColor: {xs:'rgba(60, 157, 128, 0.9)', md: 'none'},
                flexDirection: 'column',                
                minHeight: '100vh',
                maxHeight: 'fit-content',
                color: 'white',
                p: { xs: 2, md: 4 },
            }}>
                <Box sx={{ maxWidth: 500, backgroundColor: {
              xs: 'rgba(60, 157, 128, 0.8)',
              md: 'transparent',
            },
            backdropFilter: { xs: 'blur(6px)', md: 'none' },
            borderRadius: 2,
            p: 3, mx: 'auto' }}>
                    <AuthTabs onTabChange={setTab} />
                    {tab === 0 ? (
                        <>
                            <LoginForm />
                            <SocialSignIn label="SIGN IN WITH" />
                        </>
                    ) : (
                        <>
                            <RegistrationForm />
                            <SocialSignIn label="SIGN UP WITH"/>
                        </>
                    )}
                </Box>
            </Box>

            <Box sx={{
                flex: 1,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
            }} >
            <img src={LoginImage} className='login-image' alt="Login" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                

            }} />
            </Box>
        </Box>


    );
};

export default LoginPage;
