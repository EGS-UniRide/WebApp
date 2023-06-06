import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationIcon = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    const apiUrl = "http://notificationsapi-svc:8010/v2/email";
    const payload = {
      address: "tahd99@gmail.com",
      subject: "UniRide Payments",
      description: "You owe 3.20eur for your last ride",
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Handle the API response here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

};

export default NotificationIcon;
