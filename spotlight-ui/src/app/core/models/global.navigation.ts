export const globalNavModel = {
  loggedIn: {
    id: 'GlobalNavigation',
    useStripOnMobile: true,
    links: [
      {
        id: 'settings',
        textTemplate: '',
        enableIcon: true,
        iconType: 'settings',
        dropDown: {
          id: 'settings_links',
          links: [
            {
              id: 'feature_toggle',
              textTemplate: '<span>Feature Toggle</span>',
              url: '/feature-toggle'
            }
          ]
        }
      },
      {
        id: 'welcome',
        textTemplate: '',
        enableIcon: true,
        iconType: 'person',
        dropDown: {
          id: 'GlobalNavigation_Welcome',
          links: [
            {
              id: 'GlobalNav_Logout',
              category: 'welcome',
              textTemplate: '<span>Log Out</span>',
              url: '/logout'
            }
          ]
        }
      }
    ]
  },
  loggedOut: {
    id: 'GlobalNavigation',
    useStripOnMobile: true,
    links: [{ textTemplate: 'Login', url: '/login' }]
  }
};
