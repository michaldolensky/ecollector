export interface UserStateInterface {
  role: string
  email: string
  sitesIds:number[]
  firstName:string
  lastName:string
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
