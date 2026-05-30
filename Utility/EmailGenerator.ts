export class EmailGenerator {
    
    public useremail: string = '';
    public generateEmail() {
        const randomString = Math.random().toString(36).substring(2, 10);
        this.useremail = `${randomString}@example.com`;
    }

}