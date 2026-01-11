import React from 'react'
import { Outlet } from 'react-router';

import Header from './Header';

const Template = () => {
  return (
    <>
        <Header/>
        <section>
            <Outlet/>
        </section>
    </>
  )
}

export default Template