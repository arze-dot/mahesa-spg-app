import { useLocation, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();

    const pathParts = location.pathname.split("/");

    const currentPage = pathParts[pathParts.length - 1];
    const breadcrumbs = pathParts.slice(1).map((part, index) => (
        <li key={index}>
            <Link to={`/${pathParts.slice(0, index + 2).join('/')}`}>
                {part}
            </Link>
            {index < pathParts.length - 2 && (
                <span className="mx-2">/</span>
            )}
        </li>
    ));

    return (
        <div>
            <ul className="flex items-center text-gray-400 font-medium">
                <li className="cursor-pointer">
                    <Link to="/">
                        <Icon icon="material-symbols:chevron-left" />
                    </Link>
                </li>
                {breadcrumbs}
            </ul>
            <h2 className="text-sm font-bold text-gray-600">{currentPage}</h2>
        </div>
    );
};


export default Breadcrumbs;
