import React from 'react';
import Nav2 from '@/components/Nav2';
import ProfileHeader from '@/components/ProfileHeader';

const Profile = () => {
  return (
    <>
      <div className="bg-[url('/bg-stars.png')] bg-repeat-y bg-center relative">
        <Nav2 />
      </div>
      <ProfileHeader />
    </>
  );
};

export default Profile;
