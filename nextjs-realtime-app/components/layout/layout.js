import stylesLayout from './layout.module.css';

export default function Layout({ children }) {
    return <div className={stylesLayout.container}>{children}</div>;
}