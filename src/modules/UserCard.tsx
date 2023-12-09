import * as React from "react";
import { UserType } from "../types/UserType";
import noPhoto from "../assets/img/photo-cover.svg";

interface UserCardProps {
  user: UserType;

}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [photoError, setPhotoError] = React.useState(false);

  const handlePhotoError = () => {
    setPhotoError(true);
  };

  const userPhoto = !photoError ? user.photo : noPhoto;
  
  return (
    <div className="flex flex-col items-center p-5 gap-y-5 max-w-[370px] rounded-2xl bg-white text-center m-auto overflow-hidden">
      <img className="rounded-[50%]" src={userPhoto} alt="user photo"  onError={handlePhotoError}/>
      <p title={user.name} className="text-ellipsis">{user.name}</p>
      <div className="w-full">
        <p title={user.position} className="text-ellipsis">{user.position}</p>
        <p title={user.email} className="text-ellipsis">{user.email}</p>
        <p title={user.phone} className="text-ellipsis">{user.phone}</p>
      </div>
    </div>
  );
};