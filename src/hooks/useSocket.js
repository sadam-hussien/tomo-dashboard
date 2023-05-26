import socket from "socket";

import { useEffect } from "react";

import { useSelector } from "react-redux";

export default function useScoket() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.token) {
      // connect
      socket.connect();

      // event when connect
      socket.on("connected", (data) => console.log(data));
    }
    return () => {
      socket.off("connect");
    };
  }, [user.token]);
}
