const questionDetails = [
  "What's your name, title, and company name?",
  // "What pain point did you look for HoneyBook to solve?",
  // "Why did you choose HoneyBook over a competitor?",
  // "How are you using HoneyBook today?",
  // "How are you measuring success today?",
  // "How does HoneyBook help you achieve your goals?",
];

let pathName = window.location.pathname.replaceAll("/", "");
pathName = pathName ? `/${pathName}` : "";

const honeyBookConfigs = {
  default: {
    topic: "honeybookcustomer",
    customClass: "honeybook-layout",
    onPageLoad: {
      video: {
        url: `${pathName}/honeybook/honeybook.mp4`,
        display: false,
      },
    },
    background: {
      type: "image", //image|video
      url: `${pathName}/honeybook/background.png`,
    },

    pageLayout: {
      header: {
        position: "center",
        mainLogoUrl: "/honeybook/logo.png",
        subLogoUrl: "",
        subLogoText: "Everything your business needs to get it done.",
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
      background: `${pathName}/honeybook/widget-bg.png`,
      borderRadius: "12px",
      widgetGif: {
        url: ``,
        gif: false,
      },
      logo: {
        position: "",
        url: ``,
        height: "40px",
      },
      mainHeadingText: "",
      fontSize: "",
      fontColor: "",

      homeScreen: {
        cardStyle: "rows", // columns | rows
        videoBox: {
          display: true,
          icon: `${pathName}/honeybook/camera.png`,
          text: "RECORD VIDEO",
          borderRadius: "18px",
          background: "transparent",
          border: "solid 2px transparent",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        audioBox: {
          display: true,
          icon: `${pathName}/honeybook/mic.png`,
          text: "RECORD AUDIO",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },

        imageCaptureBox: {
          display: false,
          type: "imageCapture",
          icon: `${pathName}/demo/upload.png`,
          text: "CAPTURE IMAGE",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        imageUploadBox: {
          display: false,
          type: "imageUpload",
          icon: `${pathName}/demo/upload.png`,
          text: "UPLOAD IMAGE",
          borderRadius: "18px",
          background: "",
          border: "solid 2px transparent",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
      },

      previewScreen: {
        video: {
          height: "350",
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
            icon: "default/mic-icon-white.png",
          },
        },
      },

      recordingScreen: {
        video: {
          height: "550",
          questionDetails,
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
          questionDetails,
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
            canvasPrimaryColor: "#88abf0",
            canvasSecondaryColor: "#88abf0",
          },
        },
      },

      thankyouScreen: {
        shareIcon: {
          borderRadius: "none",
          url: `${pathName}/honeybook/share-icon.png`,
          bgColor: "transparent",
          height: "95px",
          display: false,
        },
        tweetIcon: {
          borderRadius: "none",
          url: `${pathName}/honeybook/tweet-icon.png`,
          bgColor: "transparent",
          height: "61px",
        },
        twitterButton: {
          bgColor: "#5089ed",
          borderRadius: "22px",
          display: false,
          placement: "center",
        },
        linkedinButton: {
          bgColor: "#5089ed",
          borderRadius: "22px",
          display: false,
        },
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

export default honeyBookConfigs;
