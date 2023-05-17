export const primaryNavModel = {
  id: 'PrimaryNavigation',
  useStripOnMobile: true,
  hideWhenLoggedOut: true,
  links: [
      { textTemplate: 'Home', url: '/' },
      { textTemplate: 'About', url: '/about' },
      { textTemplate: 'Disabled', url: '/', disabled: true },
      {
        textTemplate: '<span>Samples</span>',
        dropDown: {
            links: [
                { textTemplate: '<span>Lazy Load</span>', url: '/app/lazyload' },
                { textTemplate: '<span>Weather Service</span>', url: '/app/weather' },
                { textTemplate: '<span>JoyRide</span>', url: '/app/joyride' },
                { textTemplate: '<span>Data Table Demo</span>', url: '/app/datatable' }
            ],
            menuVisible: false
        }}
    ],
};
