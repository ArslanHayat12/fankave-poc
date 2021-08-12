import React from "react";

import { TickIcon } from "../assets";

const questionsList = [
  "What is your name and title?",
  "What team do you report into?",
  "How long have you been working at Bevi?",
  "What excites you most about working at Bevi every day?",
  "How would you describe the Bevi company culture?",
  "Why would you recommend Bevi as a great place to work?",
];

const beviBookConfigs = {
  default: {
    topic: "beviemployee",
    customClass: "bevi-layout",
    background: {
      type: "image", //image|video
      url: "/bevi/background.png",
    },

    pageLayout: {
      header: {
        position: "center",
        mainLogoUrl: "/bevi/main-logo.png",
        subLogoUrl: "/bevi/sub-logo.png",
        mainLogoHeight: "45px",
        subLogoHeight: "22px",
        mainLogoMargin: "0 0 27px 0",
        subLogoMargin: "",
      },
      footer: {
        position: "center",
        logoUrl: "",
      },
    },

    widget: {
      width: "298px",
      height: "729px",
      background: "/bevi/widget-bg.png",
      borderRadius: "12px",
      widgetGif: {
        url: "/bevi/bevi-gif.gif",
      },
      logo: {
        position: "bottom-right",
        url: "/bevi/footer-logo.png",
        height: "40px",
      },
      mainHeadingText: "",
      fontSize: "",
      fontColor: "",

      homeScreen: {
        videoBox: {
          icon: "/bevi/camera-icon.png",
          text: "",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        audioBox: {
          icon: "/bevi/mic-icon.png",
          text: "",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
      },

      previewScreen: {
        video: {
          height: "350",
          heading: "",
          fontSize: "",
          fontColor: "",
          video: {},
          input: {
            placeholders: {
              name: "Name",
              email: "Mail id",
              company: "Company",
              fontSize: "17px",
              fontWeight: "500",
              fontColor: "#2d2d2d",
              boxShadow: "0px 1px 2px 0 rgba(0, 0, 0, 0.14)",
              borderRadius: "24.5px",
              border: "solid 2px rgba(218, 218, 218, 0.21)",
            },

            icon: "",
            iconColor: "",
            borderRadius: "",
            borderColor: "",
            display: {
              name: true,
              mail: false,
              company: false,
            },
          },
          button: {
            backgroundColor: "#5089ed",
            text: <TickIcon />,
            fontSize: "17px",
            fontWeight: "500",
            color: "#fff",
            textTransform: "uppercase",
            borderRadius: "50%",
            height: "30px",
            width: "30px",
          },

          bgHeight: "100vh",
        },
        audio: {
          heading: "",
          fontSize: "",
          fontColor: "",
          audio: {
            displayWave: false,
          },
          input: {
            placeholders: {
              name: "Name",
              email: "Mail id",
              company: "Company",
              fontSize: "17px",
              fontColor: "#2d2d2d",
              boxShadow: "0px 1px 2px 0 rgba(0, 0, 0, 0.14)",
              borderRadius: "24.5px",
            },
            button: {
              backgroundColor: "#5089ed",
              text: <TickIcon />,
              fontSize: "17px",
              fontWeight: "500",
              color: "#fff",
              textTransform: "uppercase",
              borderRadius: "50%",
              height: "30px",
              width: "30px",
            },

            icon: "",
            iconColor: "",
            borderRadius: "",
            borderColor: "",
            display: {
              name: true,
              mail: false,
              company: false,
            },
          },
          button: {
            backgroundColor: "",
            text: "",
            fontSize: "",
            color: "",
          },
          card: {
            icon: "/bevi/mic-icon-white.png",
          },
        },
      },

      recordingScreen: {
        video: {
          height: "550",
          questionsList,
        },
        audio: {
          questionsList,
          micIcon: {
            background: "#266fff",
          },
        },
      },

      thankyouScreen: {
        heading: "",
        subHeading: "",
        shareIcon: {
          borderRadius: "none",
          url: "/bevi/share-icon.png",
          bgColor: "transparent",
          height: "95px",
        },
        tweetIcon: {
          borderRadius: "none",
          url: "/bevi/tweet-icon.png",
          bgColor: "transparent",
          height: "61px",
        },
        twitterButton: {
          bgColor: "#5089ed",
          borderRadius: "22px",
          display: false,
        },
        linkedinButton: {
          bgColor: "#5089ed",
          borderRadius: "22px",
          display: false,
        },
        goBackText: "",
        button: {
          backgroundColor: "#5089ed",
          text: "Share",
          display: false,
          fontSize: "",
          color: "",
          height: "60px",
          width: "180px",
        },
        input: {
          color: "",
          fontSize: "17px",
          placeholder: "",
          borderRadius: "22px",
          background: "",
          borderColor: "",
          height: "85px",
        },
      },
    },
  },
};

export default beviBookConfigs;