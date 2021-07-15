import express, { Request, Response, NextFunction } from "express";
import Survey from "../models/survey";

export function DisplayHomePage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | Homepage",
    page: "home",
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
  });
}
