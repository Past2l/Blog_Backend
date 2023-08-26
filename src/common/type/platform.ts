export enum Platform {
  ANDROID = 'android',
  IOS = 'ios',
  IPADOS = 'ipados',
  WINDOWS = 'windows',
  MACOS = 'macos',
  LINUX = 'linux',
  OTHER = 'other',
}

export function CheckPlatform(userAgent: string): Platform {
  return userAgent.match(/Android/g)
    ? Platform.ANDROID
    : userAgent.match(/iP(home|od)/g)
    ? Platform.IOS
    : userAgent.match(/iPad/g)
    ? Platform.IPADOS
    : userAgent.match(/Windows/g)
    ? Platform.WINDOWS
    : userAgent.match(/Macintosh/g)
    ? Platform.MACOS
    : userAgent.match(/Linux/g)
    ? Platform.LINUX
    : Platform.OTHER;
}
