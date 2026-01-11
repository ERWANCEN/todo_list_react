import React, { useState } from 'react'
import { Link } from 'react-router'

const Header = () => {

    return (
        <header>
            <nav>
                <Link to="/" >Home</Link>
                <Link to="/todo" >Todo</Link>
            </nav>
        </header>
    )
}

export default Header