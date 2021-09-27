import { StaticAssets } from '../assets'

const {
  ImageCaptureIcon,
  ImageUploadIcon,
  AudioCaptureIcon,
  audioTestimonialIcon,
  VideoCaptureIcon,
  videoTestimonialIcon,
  TwitterIcon,
  LinkedInIcon,
  SlackIcon,
} = StaticAssets

const defaultConfigs = {
  topic: 'testimonialmvp',
  customClass: 'fk-demo',
  experience: 'demo',
  heading: 'Content Creation',
  logo: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_5e317c0b2adce12b3d9782717441342c/fankave.png',
  brand: {
    pallete: {
      primary: '#42c0fb',
      secondary: '#e5f3ff',
      text: 'black',
      subText: 'grey',
      success: 'green',
      info: 'blue',
      warning: 'orange',
      error: 'red',
    },
    background: {
      type: 'color', //image|color
      value: 'white',
    },
    widgetsBackground: {
      type: 'color', //image|color
      value: '#e5f3ff',
    },
    pageLoad: {
      type: 'video',
      url: '',
      enabled: false,
    },
  },
  widgets: {
    enableDownload: true,
    form: {
      user: {
        enabled: true,
        name: true,
        username: false,
        email: true,
      },
      text: {
        enabled: true,
        limit: 280,
        placeholder: 'Your Story...',
      },
      hashtags: {
        enabled: true,
        limit: 5,
        options: ['CiscoFuture', 'CiscoImpact', 'MyImpact'],
      },
    },
    sharing: {
      enabled: true,
      twitter: {
        enabled: true,
        icon: TwitterIcon,
      },
      slack: {
        enabled: true,
        icon: SlackIcon,
      },
      linkedIn: {
        enabled: true,
        icon: LinkedInIcon,
      },
    },
    processing: {
      post: {
        enabled: true,
      },
      pre: false,
    },
    imageCapture: {
      enabled: true,
      icon: ImageCaptureIcon,
      label: 'Capture Image',
    },
    videoCapture: {
      enabled: true,
      icon: VideoCaptureIcon,
      label: 'Capture Video',
    },
    imageUpload: {
      enabled: true,
      icon: ImageUploadIcon,
      label: 'Upload Image',
    },
    audioCapture: {
      enabled: true,
      icon: AudioCaptureIcon,
      label: 'Record Audio',
    },
    audioTestimonial: {
      enabled: true,
      icon: audioTestimonialIcon,
      label: 'Audio Testimonial',
    },
    videoTestimonial: {
      enabled: true,
      icon: videoTestimonialIcon,
      label: 'Video Testimonial',
    },
  },
}

export default defaultConfigs
