import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="container my-10 p-5 text-lg text-primary-dark max-xl:w-96">
      &copy; 2024 All rights reserved.
      <nav className="flex flex-col gap-5 py-5 sm:flex-row sm:gap-10">
        <ul className="mr-5 flex flex-col">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <ul className="mr-5 flex flex-col">
          <li>
            <a href="#">Electronics</a>
          </li>
          <li>
            <a href="#">Jewelery</a>
          </li>
          <li>
            <a href="#">Men&apos;s Clothing</a>
          </li>
          <li>
            <a href="#">Women&apos;s Clothing</a>
          </li>
        </ul>
        <ul className="flex gap-2">
          <li>
            <BsFacebook size={24} />
          </li>
          <li>
            <BsInstagram size={24} />
          </li>
          <li>
            <BsTwitter size={24} />
          </li>
          <li>
            <BsLinkedin size={24} />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
