"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiFrontend from "@/libs/apiFrontend";
import { useRouter } from "next/navigation";
import axios from "axios";

const Admin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const planName = useSelector(
    (state) => state?.entities?.credentials?.selectedPlan
  );

  async function upgradePlan() {
    const response = await ApiFrontend({
      url: "/payment/create-customer-portal-session",
      method: "post",
      dispatch,
      fieldId: "managesub",
    });
    const url = response?.success?.url;
    // Redirect to the Stripe Checkout page
    window.location.href = url;
  }

  const isFreePlanActivated = planName === "free";

  const list = [
    {
      heading: "Plan Name",
      text: `Your current plan is: ${planName}`,
      icon: "bi-person",
      link: isFreePlanActivated ? "Update" : "Manage Subscription",
      to: isFreePlanActivated ? null : upgradePlan,
      path: isFreePlanActivated ? "/pricing" : "",
    },
    {
      heading: "Password",
      text: `Change your password`,
      icon: "bi-lock",
      link: "Change",
      path: "/change-password",
    },
  ];

  //=========================================================================================================================================

  const user_id = useSelector((state) => state?.entities?.credentials?.user_id);

  const openGoogleAuthPopup = async () => {
    try {
      const body = {
        user_id,
        app_id: "1",
      };

      const response = await axios.post(
        "http://localhost:30007/auth/token",
        body
      );

      const token = response.data.success;

      if (token === null) {
        const width = 500;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const app_id = "1";

        const state = JSON.stringify({ user_id, app_id });
        const url = `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/auth/google?state=${encodeURIComponent(state)}`;

        window.open(
          url,
          "Google Login",
          `width=${width},height=${height},top=${top},left=${left}`
        );
      } else {
        callback(token);
        createPicker(token);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const callback = async (token) => {
    const webhookBody = {
      token, // Fixed the variable name here
    };

    const webHook = await axios.post(
      "http://localhost:30007/auth/webHook",
      webhookBody
    );

    console.log("webHook", webHook.data);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const receiveMessage = (event) => {
      if (event.origin !== "http://localhost:30007") return;

      console.log({ event });
      const { accessToken } = event.data;
      if (accessToken) {
        callback(accessToken);
        createPicker(accessToken);
      }
    };

    window.addEventListener("message", receiveMessage, false);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  //====================== UI ==================================================================

  const createPicker = (accessToken) => {
    window.gapi.load("picker", {
      callback: () => {
        const view = new window.google.picker.DocsView().setIncludeFolders(
          true
        );
        const picker = new window.google.picker.PickerBuilder()
          .addView(view)
          .setOAuthToken(accessToken)
          .setDeveloperKey("AIzaSyDW9LY4iR7XS2y_fhDjGMpxCLxC2pGVIGE")
          .setCallback((data) => {
            if (data.action === window.google.picker.Action.PICKED) {
              console.log("Picked file:", data.docs[0]);
            }
          })
          .build();
        picker.setVisible(true);
      },
    });
  };

  return (
    <>
      <div className="p-4 d-sm-flex d-block">
        {list.map((l) => {
          return (
            <div className="section-box card mx-2 my-sm-0 my-3">
              <i className={`bi ${l.icon} icon`} />
              <p className="heading">{l.heading}</p>
              <p className="text">{l.text}</p>
              <div
                onClick={l?.to ? l?.to : () => router.push(l.path)}
                className="link"
              >
                {l.link}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={openGoogleAuthPopup}>Sign In with Google Drive</button>
      </div>
    </>
  );
};

export default Admin;
