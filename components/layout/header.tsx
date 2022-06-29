import Link from "next/link";
import React from "react";

function Header() {
  return (
    <nav className="nav flex justify-around">
      <div className="flex-center">
        <Link href="/">
          <h1 className="nav-title">Get a Photo</h1>
        </Link>
      </div>
      <div className="flex gap-15">
        <Link href="/likes">
          <button className="nav-button">찜한 상품</button>
        </Link>
        <Link href="/cart">
          <button className="nav-button">장바구니</button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
