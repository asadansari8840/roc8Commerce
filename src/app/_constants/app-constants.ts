const CONST = {
    NAV: {
        TITLE: 'ECOMMERCE',
        LINKS: ['Categories', 'Sale', 'Clearance', 'New stock', 'Trending'],
    },
    BANNER: 'Get 10% off on business sign up',
    LOGIN: {
        TITLE: 'LOGIN',
        SUBTITLE: 'Welcome back to ECOMMERCE',
        PARA: 'The next gen business marketplace',
        INPUTS: ['email', 'password'],
    },
    SIGNUP: {
        TITLE: 'Create your account',
        INPUTS: ['name', 'email', 'password'],
    },
    VERIFY: {
        TITLE: 'Verify your email',
        PARA: {
            getParaWithEmail: (emailId?: string) => `Enter the 8 digit code you have received on ${emailId?.toLocaleLowerCase() ?? 'on your email'}`,
        },
        INPUTS: ['name', 'email', 'password'],
    },
    HOME: {
        TITLE: 'Please mark your interests!',
        PARA: 'We will keep you notified.',
        CAT_TITLE: 'My saved interests!',
    },
};

export default CONST;
