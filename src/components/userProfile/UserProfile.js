import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './UserProfile.css';
import AppContext from "../../utils/context";

const emptyProfile = {
    name: 'No name'
};

const UserProfile = observer(() => {

    const { rootStore: { Auth } } = useContext(AppContext);

    const [userProfile, setUserProfile] = useState(null);

    const profileCallBack = (error, profile) => {
        if ( profile ) setUserProfile(profile);
        else setUserProfile(emptyProfile)
    };

    const fetchUserInfo = () => {
        Auth.getProfile(profileCallBack);
    };

    useEffect(fetchUserInfo, []);

    return (
        <div className="profileWrapper">
            <div className="userInfo">
                <span>{userProfile ? userProfile.name : ''}</span>
            </div>
            <div className="userAvatar">
                <img alt="" src={userProfile ? userProfile.picture : null} />
            </div>
        </div>
    )
});

export default UserProfile;
