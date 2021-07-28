import express, {Request, Response, NextFunction} from 'express';

export function GetDisplayName(req: Request): string{
    if(req.user){
        let user = req.user as UserDocument;
        return user.firstName.toString();
    }

    return '';
}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void{
    console.log("Check Authentication");
    if(!req.isAuthenticated()){
        console.log("Not Authenticated");
        return res.redirect('/login');
    }
    
    next();
}