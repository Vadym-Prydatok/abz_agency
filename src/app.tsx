import * as React from "react";
import { useState } from "react";
import { UserType } from "./types/UserType";
import { ResponseType } from "./types/ResponeType";
import { fetchData } from "./api/fetchClient";
import { Message } from "./modules/Message";
import { Header } from "./components/Header";
import { TopSection } from "./components/TopSection";
import { SectionGetRequest } from "./components/SectionGetRequest";
import { SectionPostRequest } from "./components/SectionPostRequest";
import { BASE_URL } from "./api/URLs";
import gsap from "gsap";

function App() {
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [message, setMessage] = useState("New user successfully registered");
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData(BASE_URL);
      setResponse(data);
      setUsers(data.users);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetUsers = async (dataFromServer: ResponseType) => {
    if (!dataFromServer.links.next_url) return;

    try {
      setIsLoading(true);
      const data = await fetchData(dataFromServer.links.next_url);
      setResponse(data);
      setUsers(data.users);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 6000);

    return () => clearTimeout(timer);
  }, [message]);

  React.useEffect(() => {
    gsap.fromTo(
      ".message",
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
      }
    );
  }, [message]);

  return (
    <>
      <Header />
      <TopSection />
      <SectionGetRequest
        isLoading={isLoading}
        users={users}
        response={response}
        handleGetUsers={handleGetUsers}
      />
      <SectionPostRequest getData={getData} setMessage={setMessage} />

      {message && <Message>{message}</Message>}
    </>
  );
}
export default App;
