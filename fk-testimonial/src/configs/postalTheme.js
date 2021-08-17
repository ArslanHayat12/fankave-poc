const questionsList = [
  "What's your name, title, and company name?",
  "What pain point did you look for Postal to solve?",
  "Why did you choose Postal over a competitor?",
  "How are you using Postal today?",
  "How are you measuring success today?",
  "How does Postal help you achieve your goals?",
];
let pathName = window.location.pathname.replace("/", "");
pathName = pathName ? `/${pathName}` : "";

const postalConfigs = {
  default: {
    topic: "postalcustomer",
    customClass: "postal-layout",
    background: {
      type: "image", //image|video
      url: `${pathName}/postal/postal-bg.svg`,
    },

    pageLayout: {
      header: {
        position: "center",
        mainLogoUrl: `${pathName}/postal/postal-logo-white.png`,
        subLogoUrl: "",
        mainLogoHeight: "40px",
        subLogoHeight: "",
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
      // background: ``,
      borderRadius: "12px",
      widgetGif: {
        url: "",
        gif: false,
      },
      logo: {
        position: "bottom-right",
        url: "",
        height: "",
      },
      mainHeadingText: "",
      fontSize: "",
      fontColor: "",

      homeScreen: {
        videoBox: {
          icon: `${pathName}/postal/camera.png`,
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
          icon: `${pathName}/postal/mic.png`,
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
              name: "Name (optional)",
              fontSize: "12px",
              fontWeight: "500",
              fontColor: "#000",
              boxShadow: "",
              borderRadius: "20px",
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
            text: "Approve",
            fontSize: "14px",
            fontWeight: "500",
            color: "#fff",
            textTransform: "uppercase",
            borderRadius: "40px",
            height: "33px",
            width: "110px",
            placement: "center",
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
              name: "Name (optional)",
              fontSize: "12px",
              fontColor: "#2d2d2d",
              boxShadow: "",
              borderRadius: "20px",
            },
            button: {
              backgroundColor: "#4dbbe5",
              text: "Approve",
              fontSize: "14px",
              fontWeight: "500",
              color: "#fff",
              textTransform: "uppercase",
              borderRadius: "40px",
              height: "33px",
              width: "110px",
              placement: "center",
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
            text: "Approve",
            fontSize: "14px",
            fontWeight: "500",
            color: "#fff",
            textTransform: "uppercase",
            borderRadius: "40px",
            height: "33px",
            width: "110px",
            placement: "center",
          },
          card: {
            icon: `${pathName}/postal/mic-icon-white.png`,
          },
        },
      },

      recordingScreen: {
        video: {
          height: "550",
          questionsList,
          button: {
            display: false,
            startRecording: {
              text: "Record",
            },
            stopRecording: {
              text: "Stop",
            },
          },
          icon: {
            display: true,
          },
        },
        audio: {
          questionsList,
          button: {
            display: false,
            startRecording: {
              text: "Record",
            },
            stopRecording: {
              text: "Stop",
            },
          },
          icon: {
            display: true,
          },
          micIcon: {
            stroke: "#86a6e3",
            background: "#5e91f3",
            canvasPrimaryColor: "#5e91f3",
            canvasSecondaryColor: "#88abf0",
          },
        },
      },

      thankyouScreen: {
        heading: "",
        subHeading: "",
        shareIcon: {
          borderRadius: "none",
          url: `${pathName}/postal/share-icon.png`,
          bgColor: "transparent",
          height: "95px",
          display: false,
        },
        tweetIcon: {
          borderRadius: "none",
          url: `${pathName}/postal/tweet-icon.png`,
          bgColor: "transparent",
          height: "61px",
        },
        twitterButton: {
          bgColor: "#5089ed",
          borderRadius: "22px",
          display: true,
          placement: "center",
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

export default postalConfigs;
