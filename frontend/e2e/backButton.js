export const pressBack = async () => {
  if (device.getPlatform() === 'android') {
    await device.pressBack(); 
  } else {
    await element(by.traits(['button']))
      .atIndex(0)
      .tap();
  }
};
