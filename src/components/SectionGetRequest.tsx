import * as React from "react";
import { Button } from "../modules/Button";
import { UserCard } from "../modules/UserCard";
import { Loader } from "./Loader";
import { UserType } from "../types/UserType";
import { ResponseType } from "../types/ResponeType";

interface Props {
  isLoading: boolean;
  users: UserType[];
  response: ResponseType | null;
  handleGetUsers: (dataFromServer: ResponseType) => void;
}

export const SectionGetRequest: React.FC<Props> = ({
  isLoading,
  users,
  response,
  handleGetUsers,
}) => {
  
  return (
    <section id="users" className="py-[140px] bg-light_gray">
      <div className="container">
        <h1 className="text-center">Working with GET request</h1>
        <div>
          <ul className="grid grid-cols-1 justify-items-center gap-5 py-[50px] md:gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-[29px]">
            {users.map((user) => (
              <li key={user.id} className="w-full">
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        </div>

        {response && response.links.next_url !== null && (
          <div className="flex justify-center w-[130px] m-auto">
            {isLoading ? (
              <Loader />
            ) : (
              <Button onClick={() => handleGetUsers(response)}>
                Show more
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
