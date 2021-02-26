declare const path: ({ pathname }: {
    pathname: any;
}, rel: string) => string;
declare const appBase: () => string;
export { path, appBase };