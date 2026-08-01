import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import './header.scss'

const Header = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        const result = await handleLogout()
        if (result && result.success) {
            navigate('/login')
        }
    }

    return (
        <header className="global-header">
            <div className="header-container">
                <div className="header-logo" onClick={() => navigate('/')}>
                    <span className="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </span>
                    <span className="logo-text">Interview<span className="highlight">IQ</span></span>
                </div>
                {user && (
                    <div className="header-user">
                        <span className="welcome-text">
                            Hello, <strong className="username">{user.username}</strong>
                        </span>
                        <button className="logout-btn" onClick={onLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
