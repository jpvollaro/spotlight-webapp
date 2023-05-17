export const sideNavModel = {
    id: 'sideNavigation',
    useStripOnMobile: true,
    hideWhenLoggedOut: true,
    links: [
        { textTemplate: '<span class="hide-on-collapse">Dashboard</span>', url: '/', enableIcon: true, iconType: 'dashboard' },
        { textTemplate: '<span class="hide-on-collapse">About</span>', url: '/about', enableIcon: true, iconType: 'notification' },
        {
            textTemplate: '<span class="hide-on-collapse">Samples</span>',
            enableIcon: true, iconType: 'community' ,
            dropDown: {
                links: [
                    { textTemplate: '<span>Lazy Load</span>', url: '/app/lazyload' },
                    { textTemplate: '<span>Movies</span>', url: '/app/movies' },                    
                    { textTemplate: '<span>Weather Service</span>', url: '/app/weather' },
                    { textTemplate: '<span>JoyRide</span>', url: '/app/joyride' },
                    { textTemplate: '<span>Data Table Demo</span>', url: '/app/datatable' },
                    { textTemplate: '<span>Drawer</span>', url: '/app/examples/drawer'}
                ],
                menuVisible: false
            }
        },
        { textTemplate: '<span class="hide-on-collapse">Settings</span>', enableIcon: true, iconType: 'gears' },
        {
            textTemplate: '<span class="hide-on-collapse">Nested 1</span>',
            enableIcon: true,
            iconType: 'gears',
            dropDown: {
                links: [
                    { textTemplate: '<span>Option 1</span>' },
                    { textTemplate: '<span>Option 2</span>' },
                    {
                        textTemplate: '<span>Option 3</span>',
                        enableIcon: true,
                        iconType: 'gears',
                        dropDown: {
                            links: [
                                { textTemplate: '<span>Nested Sub 1</span>' },
                                { textTemplate: '<span>Nested Sub 2</span>' },
                                { textTemplate: '<span>Nested Sub 3</span>' },
                                { textTemplate: '<span>Nested Sub 4</span>' }
                            ],
                            menuVisible: false
                        }
                    },
                    { textTemplate: '<span>Option 4</span>' }
                ],
                menuVisible: false
            }
        },
    ],
};
