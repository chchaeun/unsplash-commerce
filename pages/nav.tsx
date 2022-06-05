import Link from "next/link";

const Nav = () => {
  return (
    <nav className="nav flex justify-around">
      <div className="flex-center">
        <Link href="/list">
          <h1 className="nav-title">CLEAN CODE SHOP</h1>
        </Link>
      </div>
      <div className="flex gap-15">
        <Link href="/likes" className="nav-button">
          <button>찜한 상품</button>
        </Link>
        <Link href="/cart" className="nav-button">
          <button>장바구니</button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
