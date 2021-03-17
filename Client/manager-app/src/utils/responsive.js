export const size = {
    smallPhone: 320,
    tablet: 768,
    desktop: 1024,
    largeDesktop: 1440,
};

export const device = {
    smallPhone: `(max-width: ${size.smallPhone}px)`,
    smallTablet: `(max-width: ${size.tablet}px)`,
    tablet: `(max-width: ${size.desktop}px)`,
    largeDesktop: `(min-width: ${size.largeDesktop}px)`,
};

export const onSmallPhoneMediaQuery = () => `
  @media ${device.smallPhone}
`;
export const onSmallTabletMediaQuery = () => `
  @media ${device.smallTablet}
`;
export const onTabletMediaQuery = () => `
  @media ${device.tablet}
`;
export const onLargeDesktopMediaQuery = () => `
  @media ${device.largeDesktop}
`;