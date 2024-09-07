import React, {useState, useEffect} from 'react';
import { getUserProfile, updateProfile } from '../api/auth';

const ProfilePage = () => {
    const [nickname, setNickname] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async() => {
            try {
                const profile = await getUserProfile();
                setNickname(profile.nickname);
            }catch(error){
                console.error('프로필 가져오는데 실패했습니다.', error);
            }
        }

        fetchUserProfile();
    }, []);

    const handleEditClick  = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNickname(user.nickname);
    }

    const handleChange = (e) => {
        setNickname(e.target.value);
    }
}

export default ProfilePage;