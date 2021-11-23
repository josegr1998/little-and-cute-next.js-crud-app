import React from "react";
import Link from "next/link";
import styled from "styled-components";
//LAS CLASES NO SE LE APLICAN A LOS LINKS

const Navbar = () => {
  return (
    <Wrapper>
      <div className='navbar'>
        <Link href='/'>
          <span className='navbar-brand'>Note App</span>
        </Link>
        <Link href='/new'>
          <span className='create'>Create Note</span>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .create {
    color: #fff;
    font-size: 1.5rem;
  }
  .navbar-brand {
    color: #fff;
    font-size: 2rem;
  }

  .navbar-brand:hover .create:hover {
    color: #fff;
  }
`;
export default Navbar;
