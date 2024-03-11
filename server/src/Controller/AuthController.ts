import { Request, Response, NextFunction } from 'express';
import  session from 'express-session'
import { Database } from "../../Database/Database";

interface SessionRequest extends Request {
    session: any;
  }

export const login = async (req: SessionRequest, res: Response, next: NextFunction) => {
    const {username, password} = req.body
    let user = {username: username, password: password}
    if (username === 'user' && password === 'password'){
        req.session.user = user
    }
    else {
        res.redirect('/login')
    }
}

export const register = async (req: SessionRequest, res: Response, next: NextFunction) => {

}

export const logout = async (req: SessionRequest, res: Response, next: NextFunction) => {
    req.session.destroy()
    res.redirect('/login')
}