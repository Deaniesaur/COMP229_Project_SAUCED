import express, { Request, Response, NextFunction } from "express";
import Survey from "../models/survey";
import User from "../models/user";
import passport from "passport";

//import Util Function
import { GetDisplayName } from '../util';

export function DisplayHomePage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | Homepage",
    page: "home",
    display: GetDisplayName(req),
  });
}

export function DisplayAboutPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | About Us",
    page: "about",
    display: GetDisplayName(req),
  });
}

export function DisplayLoginPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | Login",
    page: "login",
    display: GetDisplayName(req),
    messages: req.flash('loginMessage'),
  });
}

export function DisplaySignUpPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | Login",
    page: "signup",
    display: GetDisplayName(req),
    messages: req.flash('registerMessage'),
  });
}

export function ProcessSignUp(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  //instantiate a new User object
    let newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
    })

    User.register(newUser, req.body.password, (err) => {
        if(err){
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError"){
                console.error('Error: User already exists');
            }
            req.flash('registerMessage', 'Registration Error');

            return res.redirect('/signup');
        }

        //after successful registration - login the user
        return passport.authenticate('local')(req, req, () => {
            return res.redirect('/survey/private');
        })
    });
}

export function ProcessLogin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  passport.authenticate('local', (err, user, info) => {
    //server errors
    if(err){
        console.error(err);
        return next(err);
    }

    //login errors
    if(!user){
      req.flash('loginMessage', 'Incorrect Username or Password!');
        console.error('login error', err);
        return res.redirect('/login');
    }

    req.login(user, (err) => {
        if(err){
            console.error(err);
            return next(err);
        }
        console.error('sucess login', err);

        return res.redirect('/survey/private');
    })
  })(req, res, next);
}

export function Logout(
  req: Request,
  res: Response,
  next: NextFunction
): void {
    req.logout();
    res.redirect('/login');
}