import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'));
const Navbar = dynamic(() => import('./Navbar'), {
  ssr: false,
});

export default function MyLayout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
