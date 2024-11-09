import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma  } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
               try {
                let user = null 

                if (credentials && credentials.email && credentials.password) {
                    user = await prisma.user.findFirst({
                        where: {
                            email: credentials.email
                        }
                    })
                    let passwordMatch = user.password === credentials.password
                    if (user && passwordMatch) {
                        return user
                    }
                    return null
                }

               } catch (error) {
                   return null
               }
            }
        })

    ],
    pages: {
        signIn: "/signin",
        signOut: "/signout",
        // error: "/auth/error",
        // verifyRequest: "/auth/verify-request",
        // newUser: null
    }
    
})