
// authentication service 
export class AuthService {

    // If login is successful, the method returns an object containing the credentials that can later be used inside the application or undefined if login fails
    public async login(userName: string, password: string):Promise<object | undefined> {
        return {
            user: 'abc'
        }
    }

    public getUserName(){
        return 'some user'
    }
}