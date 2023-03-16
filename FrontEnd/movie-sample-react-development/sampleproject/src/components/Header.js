import React from 'react';

function Header() {
  return (
    <header className='Navbar' >

      <nav style={{ backgroundColor: "#0a1024", color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <div style={{ display: "inline-block", margin: "0 0 0 10%"}}>
            <a className='links' href="/">Home  </a> 
            <a className='links' href="/about">About  </a>
          </div>
          <h1 style={{ display: "inline-block" }}>My App</h1>
          <div style={{ display: "inline-block", margin: "0 10% 0% 0%" }}>
          
            <a className='links'href="/login">Login </a> 
            <a className='links' href="/signup">Signup  </a>
          </div>
        </div>
      </nav>
    </header>


  );
}

export default Header;
