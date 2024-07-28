import React from "react";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";

const AlertNotifcation = () => (
  <Alert
    banner
    type="error"
    message={
      <Marquee pauseOnHover gradient={false}>
        MAYDAY MAYDAY MAYDAY! PANIC BUTTON PRESSED: Jasper National Park of
        Canada. Firefighter surrounded. All hands on deck required.
      </Marquee>
    }
  />
);

export default AlertNotifcation;
