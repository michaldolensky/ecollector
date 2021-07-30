export interface UserStateInterface {
  role: string
  email: string
  username:string
  sitesIds:number[]
}

export interface AuthStateInterface {
  user:UserStateInterface|null;
  loggedIn: boolean;
}

function state(): AuthStateInterface {
  return {
    user: null,
    loggedIn: false,
  };
}

export default state;
