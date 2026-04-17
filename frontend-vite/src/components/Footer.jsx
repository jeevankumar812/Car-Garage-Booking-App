function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <div>
          <div className="footerBrand">GarageBook</div>
          <div className="footerTagline">Professional car service bookings, simplified.</div>
        </div>
        <div className="footerCopyright">© {new Date().getFullYear()} GarageBook. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
