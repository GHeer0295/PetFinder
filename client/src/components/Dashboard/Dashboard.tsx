import React from 'react';
import Search from './Search/Search';
import './Dashboard.css'

const Dashboard: React.FC = () => {
    return (
        <div className='dashboard-container'>
            <Search />
        </div>
    );
}

export default Dashboard;
