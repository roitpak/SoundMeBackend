import { Router } from "express";

interface Controller {
    path: String;
    router: Router;
}

export default Controller;