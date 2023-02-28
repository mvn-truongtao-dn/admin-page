import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions = {
    secret: process.env.NEXTAUTH_URL,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: {
                    label: "password",
                    type: "password"
                }
            },
            async authorize(credentials,req) {
                const {email,password} = credentials as {email:string, password:string};
                const res = await fetch(`https://example-service-nodejs.onrender.com/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });
                const user = await res.json();
                if(res.ok && user) {
                    return user;
                }else
                    return null;
            }
        })
    ],
    callbacks: {
      async jwt({ token, user }:{token: JWT; user?: any | AdapterUser | undefined}) {

        if (user) {
          token.accessToken = user.access_token;
        }

        return {...token,...user};
      },
      async session({session,token,user}:{session:any, token:any,user:any}) {
        
        session.user = token;

        return session;
      }
    },
    pages: {
        signIn:"/auth/login"
    }
}
export default NextAuth(authOptions);
