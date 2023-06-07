import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
// connect our AWS backend to the frontend
import { AuthStack } from '../../../space-finder/outputs.json';

const awsRegion = 'us-east-2';

// configured our Amplify object
Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: awsRegion,
        userPoolId: AuthStack.SpaceUserPoolId,
        userPoolWebClientId: AuthStack.SpaceUserPoolClientId,
        identityPoolId: AuthStack.SpaceIdentityPoolId,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})

// authentication service 
export class AuthService {

    private user: CognitoUser | undefined;

    // If login is successful, the method returns an object containing the credentials that can later be used inside the application or undefined if login fails
    public async login(userName: string, password: string):Promise<object | undefined> {
        try {
            this.user = await Auth.signIn(userName, password) as CognitoUser;
            return this.user;
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    // return our username
    public getUserName(){
        return this.user?.getUsername();
    }
}