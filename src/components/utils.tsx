export const PROD_HOST = "https://be-sharetimewithme-7gjrwponva-uc.a.run.app"
export const HOST = process.env.NEXT_PUBLIC_API_HOST ? process.env.NEXT_PUBLIC_API_HOST : PROD_HOST
export const isServerOff = async (): Promise<boolean> => {
    try {
        await fetch(PROD_HOST, { signal: AbortSignal.timeout(1000) });

        return false;
    } catch (e: any) {
        return true;
    }
}

export enum ALERT {
    WARNING,
    ERROR
}