
import { Wine } from './wine.model';

export class Label {
    public name: string;
    public img: string;
    public description: string;
    public wines: Wine[];

    constructor(name: string, description: string, img: string, wines: Wine[]) {
        this.name = name;
        this.description = description;
        this.img = img;
        this.wines = wines;
    }
}
