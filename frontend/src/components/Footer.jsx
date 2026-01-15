const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-white text-xl font-bold mb-4">AK DIGITAL HUB</h3>
          <p>Your premium gateway to digital education and trading resources.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-amber-500">Home</a></li>
            <li><a href="/courses" className="hover:text-amber-500">Courses</a></li>
            <li><a href="/trading" className="hover:text-amber-500">Trading Hub</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter email" className="bg-slate-800 p-2 rounded w-full border border-slate-700" />
            <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded font-bold">Join</button>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 border-t border-slate-800 pt-6">
        © 2024 AK DIGITAL HUB. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;