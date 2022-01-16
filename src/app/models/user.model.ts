export class User {
    public name: string;
    public sirname: string;
    public username: string;
    public email: string;
    public adress: string;
    public city: string;
    public country: string;
    public password: string;
    public admin: string;

    constructor(name: string,
                sirname: string,
                username: string,
                email: string,
                adress: string,
                city: string,
                country: string,
                password: string,
                admin: string
            ) {
        this.name = name;
        this.sirname = sirname;
        this.username = username;
        this.email = email;
        this.adress = adress;
        this.city = city;
        this.country = country;
        this.password = password;
        this.admin = admin;
    }

}
