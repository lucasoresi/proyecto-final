import 'express';
declare module 'express-serve-static-core' {
    interface RequestHandler {
        unless?: (opts: any) => RequestHandler;
    }
}
