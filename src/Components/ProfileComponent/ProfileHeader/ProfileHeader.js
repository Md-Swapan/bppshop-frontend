import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({children}) => {
    return (
        <div>
            <h4 className="profile_heading"> {children}</h4>
        </div>
    );
};

export default ProfileHeader;