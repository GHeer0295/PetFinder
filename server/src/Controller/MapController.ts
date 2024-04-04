import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import axios from 'axios'

const API_KEY: string  = process.env.MAP_API_KEY || ""
const AUTOCOMPLETE_API = "https://places.googleapis.com/v1/places:searchText"
export const getLocationAutocomplete = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const headers = {
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-Field-Mask": "places.formattedAddress"
        }

    }
    catch(e) {
         return res.status(400).send(e)
    } 
}