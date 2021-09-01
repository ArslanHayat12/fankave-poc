let pathName = window.location.pathname.replaceAll("/", "");
pathName = pathName ? `/${pathName}` : "";

const questionDetails = [
  {
    text: "What is your name and title?",
    chunkSize: "0.25",
  },
  {
    text: "What team do you report into?",
    chunkSize: "0.5",
  },
  {
    text: "How long have you been working at Bevi?",
    chunkSize: "",
  },
  {
    text: "What excites you most about working at Bevi every day?",
    chunkSize: "",
  },
  {
    text: "How would you describe the Bevi company culture?",
    chunkSize: "",
  },
  {
    text: "Why would you recommend Bevi as a great place to work?",
    chunkSize: "",
  },
];

const beviBookConfigs = {
  default: {
    topic: "beviemployee",
    customClass: "bevi-layout",
    onPageLoad: {
      video: {
        url: `${pathName}/honeybook/honeybook.mp4`,
        display: false,
      },
    },
    background: {
      type: "image", //image|video
      url: `${pathName}/bevi/background.png`,
    },

    pageLayout: {
      header: {
        position: "center",
        mainLogoUrl: `${pathName}/bevi/main-logo.png`,
        subLogoUrl: `${pathName}/bevi/sub-logo.png`,
        subLogoTex: "",
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
      background: `${pathName}/bevi/widget-bg.png`,
      borderRadius: "12px",
      widgetGif: {
        url: `${pathName}/bevi/bevi-gif.gif`,
        gif: true,
      },
      logo: {
        position: "bottom-right",
        url: `${pathName}/bevi/footer-logo.png`,
        height: "40px",
      },
      mainHeadingText: "",
      fontSize: "",
      fontColor: "",

      homeScreen: {
        cardStyle: "rows", // columns | rows
        videoBox: {
          display: true,
          icon: `${pathName}/bevi/camera-icon.png`,
          text: "RECORD VIDEO",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        audioBox: {
          display: true,
          icon: `${pathName}/bevi/mic-icon.png`,
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
          fontSize: "",
          fontColor: "",
          video: {},
          input: {
            placeholders: {
              name: "Name (optional)",
              // email: "Mail id",
              // company: "Company",
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
            text: "Approve",
            fontSize: "17px",
            fontWeight: "500",
            color: "#fff",
            textTransform: "uppercase",
            borderRadius: "50%",
            height: "30px",
            width: "30px",
            placement: "left",
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
              // email: "Mail id",
              // company: "Company",
              fontSize: "17px",
              fontColor: "#2d2d2d",
              boxShadow: "0px 1px 2px 0 rgba(0, 0, 0, 0.14)",
              borderRadius: "24.5px",
            },
            button: {
              backgroundColor: "#5089ed",
              text: "Approve",
              fontSize: "17px",
              fontWeight: "500",
              color: "#fff",
              textTransform: "uppercase",
              borderRadius: "40px",
              height: "130px",
              width: "20px",
              placement: "left",
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
            fontWeight: "",
            color: "",
            textTransform: "",
            borderRadius: "",
            height: "",
            width: "",
            placement: "",
          },
          card: {
            icon: `${pathName}/bevi/mic-icon-white.png`,
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
            canvasPrimaryColor: "#5e91f3",
            canvasSecondaryColor: "#88abf0",
          },
        },
      },

      thankyouScreen: {
        shareIcon: {
          borderRadius: "none",
          url: `${pathName}/bevi/share-icon.png`,
          bgColor: "transparent",
          height: "95px",
          display: false,
        },
        tweetIcon: {
          borderRadius: "none",
          url: `${pathName}/bevi/tweet-icon.png`,
          bgColor: "transparent",
          height: "61px",
        },
        twitterButton: {
          bgColor: "#5089ed",
          borderRadius: "22px",
          display: false,
          placement: "left",
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

export default beviBookConfigs;
