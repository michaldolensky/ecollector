export interface UserStateInterface {
  role: string
  email: string
  username:string
}

export interface AuthStateInteface {
  user:UserStateInterface|null;
  loggedIn: boolean;
}

function state(): AuthStateInteface {
  return {
    user: null,
    loggedIn: false,
  };
}

export default state;
