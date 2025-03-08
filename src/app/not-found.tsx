import React from 'react';

type Props = {};

const NotFound: React.FC<Props> = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1 style={{ fontSize: '3rem', color: '#ff0000' }}>404 - Page Not Found</h1>
            <p style={{ fontSize: '1.5rem' }}>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;