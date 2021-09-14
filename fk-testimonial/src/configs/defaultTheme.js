import { StaticAssets } from '../assets'

const {
  ImageCaptureIcon,
  ImageUploadIcon,
  AudioCaptureIcon,
  audioTestimonialIcon,
  VideoCaptureIcon,
  videoTestimonialIcon,
} = StaticAssets

const defaultConfigs = {
  topic: 'demostories',
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
  layout: {
    header: {
      enabled: true,
      heading: 'Demo Content Creation',
      logo: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_5e317c0b2adce12b3d9782717441342c/fankave.png',
    },
    footer: {
      enabled: true,
      heading: 'Powered By Fankave',
      logo: 'data:image/png;base64,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',
    },
  },
  widgets: {
    enableDownload: true,
    form: {
      user: {
        enabled: true,
        name: true,
        username: true,
        email: true,
      },
      text: {
        enabled: true,
        limit: 280,
        placeholder: 'Your Story...',
      },
      hastages: {
        enabled: true,
        limit: 5,
        options: ['CiscoFuture', 'CiscoImpact', 'MyImpact'],
      },
    },
    sharing: {
      enabled: true,
      twitter: true,
      linkedIn: true,
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
      processing: {
        pre: false,
        post: {
          enabled: true,
          filters: [],
          backgrounds: [],
        },
      },
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
