import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './UserProfile.css';
import AppContext from '../../utils/context';

const UserProfile = observer(() => {
    const { rootStore: { Auth: { userProfile } } } = useContext(AppContext);

    return (
        <div className="profileWrapper">
            <div className="userInfo">
                <span>{userProfile ? userProfile.name : ''}</span>
            </div>
            <div className="userAvatar">
                <img alt="" src={userProfile ? userProfile.picture : null} />
            </div>
        </div>
    );
});

export default UserProfile;
